import { useContext, useEffect, useState } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import ExpensesContext from '../store/expenses-context';

export default function AllExpenses() {
  const expensesContext = useContext(ExpensesContext);
  const [list, setList] = useState([]);

  useEffect(() => {
    if (expensesContext.expenses) {
      const expenses = [...expensesContext.expenses];
      expenses.sort((a, b) => b.date - a.date);
      setList(expenses.map((expense) => ({ ...expense, date: expense.date.toLocaleDateString() })));
    }
  }, [expensesContext.expenses]);

  return <ExpensesOutput expenses={list} expensesPeriod='Total' />;
}

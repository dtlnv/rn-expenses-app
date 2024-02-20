import { useContext, useEffect, useState } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import ExpensesContext from '../store/expenses-context';

export default function AllExpenses() {
  const expensesContext = useContext(ExpensesContext);
  const [list, setList] = useState([]);

  useEffect(() => {
    if (expensesContext.expenses) {
      const expenses = [...expensesContext.expenses];
      expenses.sort((a, b) => new Date(b.date) - new Date(a.date));
      setList(
        expenses.map((expense) => {
          const date = new Date(expense.date);
          return { ...expense, date: date.toLocaleDateString() };
        })
      );
    }
  }, [expensesContext.expenses]);

  return <ExpensesOutput expenses={list} expensesPeriod='Total' />;
}

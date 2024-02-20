import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useContext, useEffect, useState } from 'react';
import ExpensesContext from '../store/expenses-context';

export default function RecentExpenses() {
  const expensesContext = useContext(ExpensesContext);
  const [list, setList] = useState([]);

  useEffect(() => {
    if (expensesContext.expenses) {
      const expenses = [...expensesContext.expenses];
      expenses.sort((a, b) => b.date - a.date);

      const recentExpenses = expenses.filter((expense) => {
        const today = new Date();
        const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
        return expense.date >= lastWeek;
      });

      setList(recentExpenses.map((expense) => ({ ...expense, date: expense.date.toLocaleDateString() })));
    }
  }, [expensesContext.expenses]);

  return <ExpensesOutput expenses={list} expensesPeriod='Recent' />;
}

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useContext, useEffect, useState } from 'react';
import ExpensesContext from '../store/expenses-context';

export default function RecentExpenses() {
  const expensesContext = useContext(ExpensesContext);
  const [list, setList] = useState([]);

  useEffect(() => {
    if (expensesContext.expenses) {
      const expenses = [...expensesContext.expenses];
      expenses.sort((a, b) => new Date(b.date) - new Date(a.date));

      const recentExpenses = expenses.filter((expense) => {
        const today = new Date();
        const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
        const expenseDate = new Date(expense.date);
        return expenseDate >= lastWeek;
      });

      setList(
        recentExpenses.map((expense) => {
          const date = new Date(expense.date);
          return { ...expense, date: date.toLocaleDateString() };
        })
      );
    }
  }, [expensesContext.expenses]);

  return <ExpensesOutput expenses={list} expensesPeriod='Recent' />;
}

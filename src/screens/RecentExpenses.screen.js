import { StyleSheet, View } from 'react-native';
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
      expenses.length = 10;
      setList(expenses.map((expense) => ({ ...expense, date: expense.date.toLocaleDateString() })));
    }
  }, [expensesContext.expenses]);

  return <ExpensesOutput expenses={list} expensesPeriod='Recent' />;
}

const styles = StyleSheet.create({});

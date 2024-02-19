import { FlatList, View } from 'react-native';
import ExpenseItem from './ExpensesItem';
import { useEffect, useState } from 'react';

export default function ExpensesList({ expenses }) {
  const [list, setList] = useState([]);
  useEffect(() => {
    if (expenses) {
      expenses.sort((a, b) => b.date - a.date);
      setList(expenses.map((expense) => ({ ...expense, date: expense.date.toLocaleDateString() })));
    }
  }, [expenses]);
  return (
    <View>
      <FlatList data={list} renderItem={({ item }) => <ExpenseItem expense={item} />} />
    </View>
  );
}

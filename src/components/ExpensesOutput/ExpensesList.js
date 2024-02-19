import { FlatList, View } from 'react-native';
import ExpenseItem from './ExpensesItem';

export default function ExpensesList({ expenses }) {
  return (
    <View>
      <FlatList data={expenses} renderItem={({ item }) => <ExpenseItem expense={item} />} />
    </View>
  );
}

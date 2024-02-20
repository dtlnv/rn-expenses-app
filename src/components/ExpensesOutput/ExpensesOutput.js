import { StyleSheet, Text, View } from 'react-native';
import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';

export default function ExpensesOutput({ expenses, expensesPeriod }) {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      {expenses.length === 0 ? (
        <Text style={styles.noExpensesText}>No expenses found 🤷</Text>
      ) : (
        <ExpensesList expenses={expenses} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 40,
  },
  noExpensesText: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 32,
  },
});

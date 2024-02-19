import { StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

export default function ExpensesSummary({ expenses, periodName }) {
  const expensesSum = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{periodName}</Text>
      <Text style={styles.sum}>${expensesSum.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: GlobalStyles.colors.primary50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
  },
  sum: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

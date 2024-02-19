import { StyleSheet, View } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { DUMMY_EXPENSES } from '../constants/dummy-data';

export default function RecentExpenses() {
  return (
    <View style={styles.container}>
      <ExpensesOutput expenses={DUMMY_EXPENSES} expensesPeriod='Recent' />
    </View>
  );
}

const styles = StyleSheet.create({});

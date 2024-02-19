import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { DUMMY_EXPENSES } from '../constants/dummy-data';

export default function AllExpenses() {
  return <ExpensesOutput expenses={DUMMY_EXPENSES} expensesPeriod='Total' />;
}

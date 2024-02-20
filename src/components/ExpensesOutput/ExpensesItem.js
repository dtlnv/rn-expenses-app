import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import { useNavigation } from '@react-navigation/native';
import { Swipeable } from 'react-native-gesture-handler';
import IconButton from '../UI/IconButton';
import { useContext } from 'react';
import ExpensesContext from '../../store/expenses-context';

export default function ExpenseItem({ expense }) {
  if (!expense) {
    return null;
  }

  const navigation = useNavigation();
  const expensesContext = useContext(ExpensesContext);

  function openExpenseItem() {
    navigation.navigate('ManageExpense', { expense });
  }

  function deleteAction() {
    function deleteExpense() {
      expensesContext.deleteExpense(expense.id);
    }

    Alert.alert('Delete Expense', 'Are you sure you want to delete this expense?', [
      { text: 'No', style: 'default' },
      { text: 'Yes', style: 'destructive', onPress: deleteExpense },
    ]);
  }

  function rightActions() {
    return <IconButton buttonStyles={styles.deleteSwipe} type='secondary' icon='trash' size={24} onPress={deleteAction} />;
  }

  return (
    <Pressable onPress={openExpenseItem}>
      <Swipeable renderRightActions={rightActions}>
        <View style={styles.item}>
          <View>
            <Text style={[styles.description, styles.text]}>{expense?.description}</Text>
            <Text style={styles.text}>{expense?.date}</Text>
          </View>
          <View style={styles.amountContainer}>
            <Text style={styles.amount}>{expense?.amount}</Text>
          </View>
        </View>
      </Swipeable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.5,
  },
  item: {
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 7,
  },
  text: {
    color: GlobalStyles.colors.primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: 'bold',
  },
  deleteSwipe: {
    backgroundColor: GlobalStyles.colors.error500,
    borderRadius: 7,
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    width: 75,
    justifyContent: 'center',
  },
});

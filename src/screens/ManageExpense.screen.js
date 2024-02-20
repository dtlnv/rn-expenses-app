import { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import IconButton from '../components/UI/IconButton';
import ExpensesContext from '../store/expenses-context';
import Input from '../components/UI/Input';

export default function ManageExpense({ navigation, route }) {
  const expense = route.params?.expense;
  const [isEditMode, setIsEditMode] = useState(false);
  const [description, setDescription] = useState(expense?.description || '');
  const [price, setPrice] = useState(expense?.price ? String(expense?.price) : '');
  const expensesContext = useContext(ExpensesContext);

  useEffect(() => {
    if (navigation) {
      navigation?.setOptions({
        headerTitle: expense ? expense.description : 'Add Expense',
        headerRight: () => (expense ? <IconButton icon='trash' onPress={deleteHandler} /> : null),
      });
    }
    setIsEditMode(!!expense);
  }, [expense, navigation]);

  function saveHandler() {
    if (!description || !price) {
      Alert.alert('Invalid input', 'Please enter a valid description and price.', [{ text: 'OK', style: 'destructive' }]);
      return;
    }
    if (isEditMode) {
      expensesContext.updateExpense(expense.id, { description, price, date: new Date() });
    } else {
      expensesContext.addExpense({ description, price });
    }
    navigation.goBack();
  }

  function deleteHandler() {
    function deleteExpense() {
      expensesContext.deleteExpense(expense.id);
      navigation.goBack();
    }

    Alert.alert('Delete Expense', 'Are you sure you want to delete this expense?', [
      { text: 'No', style: 'default' },
      { text: 'Yes', style: 'destructive', onPress: deleteExpense },
    ]);
  }

  function cancelHandler() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View>
        <Input
          label='Description'
          placeholder='Type description here...'
          value={description}
          onChangeText={setDescription}
          autoFocus
        />
        <Input
          label='Price'
          placeholder='Add an price here...'
          value={price}
          onChangeText={setPrice}
          keyboardType='numeric'
        />
      </View>
      <View style={styles.buttonRow}>
        <IconButton type='secondary' onPress={cancelHandler}>
          Cancel
        </IconButton>
        <IconButton onPress={saveHandler}>{isEditMode ? 'Update' : 'Add'}</IconButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  buttonRow: {
    borderTopWidth: 1,
    paddingVertical: 16,
    borderTopColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
});

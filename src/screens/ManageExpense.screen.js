import { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import IconButton from '../components/UI/IconButton';
import ExpensesContext from '../store/expenses-context';

export default function ManageExpense({ navigation, route }) {
  const expense = route.params?.expense;
  const [isEditMode, setIsEditMode] = useState(false);
  const [description, setDescription] = useState(expense?.description || '');
  const [amount, setAmount] = useState(expense?.amount ? String(expense?.amount) : '');
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
    if (!description || !amount) {
      Alert.alert('Invalid input', 'Please enter a valid description and amount.', [{ text: 'OK', style: 'destructive' }]);
      return;
    }
    if (isEditMode) {
      expensesContext.updateExpense(expense.id, { description, amount, date: new Date() });
    } else {
      expensesContext.addExpense({ description, amount });
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
        <View>
          <Text style={styles.textLabel}>Description</Text>
          <TextInput
            style={styles.textInput}
            placeholder='Type description here...'
            value={description}
            onChangeText={setDescription}
            autoFocus
          />
        </View>
        <View>
          <Text style={styles.textLabel}>Amount</Text>
          <TextInput
            style={styles.textInput}
            placeholder='Add an amount...'
            keyboardType='numeric'
            value={amount}
            onChangeText={setAmount}
          />
        </View>
      </View>
      <View style={styles.buttonRow}>
        <IconButton type='secondary' onPress={cancelHandler}>
          Cancel
        </IconButton>
        <IconButton onPress={saveHandler}>Save</IconButton>
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
  textLabel: {
    fontSize: 14,
    color: '#555444',
    marginBottom: 8,
  },
  textInput: {
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
    marginBottom: 16,
    marginTop: 8,
    // padding: 8,
    fontSize: 16,
  },
});

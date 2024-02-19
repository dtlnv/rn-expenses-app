import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import IconButton from '../components/UI/IconButton';

export default function ManageExpense({ navigation, route }) {
  const expense = route.params?.expense;
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (navigation) {
      navigation?.setOptions({ headerTitle: expense ? expense.description : 'Add Expense' });
    }
    setIsEditMode(!!expense);
  }, [expense, navigation]);

  function saveHandler() {
    console.log('save!');
    closeScreen();
  }

  function deleteHandler() {
    console.log('delete!');
    closeScreen();
  }

  function cancelHandler() {
    closeScreen();
  }

  function closeScreen() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <IconButton type='secondary' onPress={cancelHandler}>
          Cancel
        </IconButton>
        <IconButton onPress={saveHandler}>Save</IconButton>
      </View>
      {isEditMode && (
        <View style={styles.deleteContainer}>
          <IconButton icon='trash' onPress={deleteHandler}>
            Delete
          </IconButton>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  deleteContainer: {
    alignItems: 'center',
    marginVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
});

import { Pressable, StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

export default function ExpenseItem({ expense }) {
  return (
    <Pressable>
      <View style={styles.item}>
        <View>
          <Text style={[styles.description, styles.text]}>{expense.description}</Text>
          <Text style={styles.text}>{expense.date.toLocaleDateString()}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount }>{expense.amount}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
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
});

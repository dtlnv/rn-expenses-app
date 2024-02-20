import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function Input({ label = '', ...rest }) {
  return (
    <View>
      <Text style={styles.textLabel}>{label}</Text>
      <TextInput style={styles.textInput} {...rest} />
    </View>
  );
}

const styles = StyleSheet.create({
  textLabel: {
    fontSize: 14,
    color: '#555444',
    marginBottom: 8,
  },
  textInput: {
    marginBottom: 16,
    marginTop: 8,
    fontSize: 16,
  },
});

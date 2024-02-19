import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PlusButton({ tintColor, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.plusButton, pressed ? styles.pressed : null]}
      android_ripple={{ color: '#ccc' }}
      onPress={onPress}
    >
      <Ionicons name='add' size={24} color={tintColor} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  plusButton: {
    right: 16,
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.5,
  },
});

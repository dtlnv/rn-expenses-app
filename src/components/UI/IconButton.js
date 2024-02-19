import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function IconButton({ type = 'primary', icon, color = '#ffffff', onPress, children }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed, type === 'secondary' && styles.secondary]}
      android_ripple={{ color: '#ccc' }}
      onPress={onPress}
    >
      {icon && <Ionicons name={icon} size={16} color={color} />}
      {children && <Text style={[styles.text, type === 'secondary' && styles.secondaryText]}>{children}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#000000',
    padding: 10,
    borderRadius: 8,
    gap: 12,
  },
  secondary: {
    backgroundColor: 'transparent',
  },
  secondaryText: {
    color: '#000000',
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
  },
  pressed: {
    opacity: 0.5,
  },
});

import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyles } from '../../constants/styles';

export default function IconButton({ type = 'primary', size = 16, icon, color = '#ffffff', buttonStyles, onPress, children }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
        type === 'secondary' && styles.secondary,
        buttonStyles && buttonStyles,
      ]}
      android_ripple={{ color: '#ccc' }}
      onPress={onPress}
    >
      {icon && <Ionicons name={icon} size={size} color={color} />}
      {children && <Text style={[styles.text, type === 'secondary' && styles.secondaryText]}>{children}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#000000',
    padding: 16,
    borderRadius: 8,
    gap: 12,
  },
  secondary: {
    backgroundColor: 'transparent',
  },
  secondaryText: {
    color: GlobalStyles.colors.primary500,
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
  },
  pressed: {
    opacity: 0.5,
  },
});

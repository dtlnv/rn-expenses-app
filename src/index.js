import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// icons
import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

// screens
import ManageExpense from './screens/ManageExpense.screen';
import RecentExpenses from './screens/RecentExpenses.screen';
import AllExpenses from './screens/AllExpenses.screen';
import BarCodeScannerScreen from './screens/BarCodeScanner.screen';

import PlusButton from './components/UI/PlusButton';
import { GlobalStyles } from './constants/styles';

import { ExpensesContextProvider } from './store/expenses-context';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ExpensesOverview = () => (
  <Tab.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: GlobalStyles.colors.primary500,
      },
      headerTintColor: '#fff',
      tabBarStyle: {
        backgroundColor: GlobalStyles.colors.primary500,
      },
      tabBarActiveTintColor: GlobalStyles.colors.accent500,
    }}
  >
    <Tab.Screen
      name='RecentExpenses'
      component={RecentExpenses}
      options={({ navigation }) => ({
        title: 'Recent Expenses',
        tabBarLabel: 'Recent',
        tabBarIcon: ({ color, size }) => <Octicons name='history' color={color} size={size} />,
        headerRight: ({ tintColor }) => <PlusButton tintColor={tintColor} onPress={() => navigation.navigate('ManageExpense')} />,
      })}
    />
    <Tab.Screen
      name='AllExpenses'
      component={AllExpenses}
      options={({ navigation }) => ({
        title: 'All Expenses',
        tabBarIcon: ({ color, size }) => <Octicons name='list-unordered' color={color} size={size} />,
        headerRight: ({ tintColor }) => <PlusButton tintColor={tintColor} onPress={() => navigation.navigate('ManageExpense')} />,
      })}
    />
    <Tab.Screen
      name='BarcodeScanner'
      component={BarCodeScannerScreen}
      options={{
        title: 'Barcode Scanner',
        tabBarIcon: ({ color, size }) => <Ionicons name='barcode-outline' size={size} color={color} />,
      }}
    />
  </Tab.Navigator>
);

export default function App() {
  return (
    <>
      <StatusBar style='light' />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ExpensesContextProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: GlobalStyles.colors.primary500,
                },
                headerTintColor: '#fff',
                title: 'Expenses',
              }}
            >
              <Stack.Screen name='ExpensesOverview' component={ExpensesOverview} options={{ headerShown: false }} />
              <Stack.Screen
                name='ManageExpense'
                component={ManageExpense}
                options={{
                  presentation: 'modal',
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </ExpensesContextProvider>
      </GestureHandlerRootView>
    </>
  );
}

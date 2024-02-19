import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// icons
import { Octicons } from '@expo/vector-icons';

// screens
import ManageExpense from './screens/ManageExpense.screen';
import RecentExpenses from './screens/RecentExpenses.screen';
import AllExpenses from './screens/AllExpenses.screen';
import { GlobalStyles } from './constants/styles';
import PlusButton from './components/UI/PlusButton';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ExpensesOverview = () => (
  <Tab.Navigator
    screenOptions={({ navigation }) => ({
      headerStyle: {
        backgroundColor: GlobalStyles.colors.primary500,
      },
      headerTintColor: '#fff',
      tabBarStyle: {
        backgroundColor: GlobalStyles.colors.primary500,
      },
      tabBarActiveTintColor: GlobalStyles.colors.accent500,
      headerRight: ({ tintColor }) => <PlusButton tintColor={tintColor} onPress={() => navigation.navigate('ManageExpense')} />,
    })}
  >
    <Tab.Screen
      name='RecentExpenses'
      component={RecentExpenses}
      options={{
        title: 'Recent Expenses',
        tabBarLabel: 'Recent',
        tabBarIcon: ({ color, size }) => <Octicons name='history' color={color} size={size} />,
      }}
    />
    <Tab.Screen
      name='AllExpenses'
      component={AllExpenses}
      options={{
        title: 'All Expenses',
        tabBarIcon: ({ color, size }) => <Octicons name='list-unordered' color={color} size={size} />,
      }}
    />
  </Tab.Navigator>
);

export default function App() {
  return (
    <>
      <StatusBar style='light' />
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
    </>
  );
}

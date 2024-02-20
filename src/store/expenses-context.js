import { createContext, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, price, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, price, date }) => {},
});

function expensesReduser(state, action) {
  switch (action.type) {
    case 'ADD':
      return [
        ...state,
        {
          id: Math.random().toString(),
          description: action.payload.description,
          price: Number(action.payload.price),
          date: new Date(),
        },
      ];
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);
    case 'UPDATE':
      const expenseIndex = state.findIndex((expense) => expense.id === action.payload.id);
      const updatedExpense = {
        ...state[expenseIndex],
        description: action.payload.description,
        price: Number(action.payload.price),
      };
      const updatedExpenses = [...state];
      updatedExpenses[expenseIndex] = updatedExpense;
      return updatedExpenses;
    case 'SYNC':
      console.log('SYNC', action.payload);
      return [...action.payload];
    default:
      return state;
  }
}

export function ExpensesContextProvider({ children }) {
  const [state, dispatch] = useReducer(expensesReduser, []);

  useEffect(() => {
    (async () => {
      const expenses = await AsyncStorage.getItem('expenses');
      console.log('expenses', expenses);
      const parsedExpenses = JSON.parse(expenses);
      console.log('parsedExpenses', parsedExpenses);
      if (parsedExpenses.length > 0) {
        dispatch({ type: 'SYNC', payload: parsedExpenses });
      }
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('expenses', JSON.stringify(state));
  }, [state]);

  function addExpense(expense) {
    dispatch({ type: 'ADD', payload: expense });
  }

  function deleteExpense(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  function updateExpense(id, expense) {
    dispatch({ type: 'UPDATE', payload: { id, ...expense } });
  }

  const context = {
    expenses: state,
    addExpense,
    deleteExpense,
    updateExpense,
  };

  return <ExpensesContext.Provider value={context}>{children}</ExpensesContext.Provider>;
}

export default ExpensesContext;

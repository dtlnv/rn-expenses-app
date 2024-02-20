import { createContext, useReducer } from 'react';
import { DUMMY_EXPENSES } from '../constants/dummy-data';

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
        date: action.payload.date,
      };
      const updatedExpenses = [...state];
      updatedExpenses[expenseIndex] = updatedExpense;
      return updatedExpenses;
    default:
      return state;
  }
}

export function ExpensesContextProvider({ children }) {
  const [state, dispatch] = useReducer(expensesReduser, []);

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

import React, { createContext, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TimerContext = createContext();

const initialState = { timers: [], completedTimers: [] };

const timerReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TIMER':
      return { ...state, timers: [...state.timers, action.payload] };
    case 'UPDATE_TIMER':
      return { ...state, timers: state.timers.map(timer => timer.id === action.payload.id ? action.payload : timer) };
    case 'COMPLETE_TIMER':
      return {
        ...state,
        timers: state.timers.filter(timer => timer.id !== action.payload.id),
        completedTimers: [...state.completedTimers, action.payload]
      };
    default:
      return state;
  }
};

export const TimerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(timerReducer, initialState);

  return (
    <TimerContext.Provider value={{ state, dispatch }}>
      {children}
    </TimerContext.Provider>
  );
};

export default TimerContext;

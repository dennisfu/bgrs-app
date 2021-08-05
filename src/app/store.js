import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import UiReducer from '../reducers/Reducer';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    UiReducer: UiReducer
  },
});

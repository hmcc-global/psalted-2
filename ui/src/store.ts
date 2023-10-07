import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import userReducer from './reducers/userSlice';

export const store = configureStore({
  reducer: userReducer,
  devTools: { trace: true, traceLimit: 25 },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);

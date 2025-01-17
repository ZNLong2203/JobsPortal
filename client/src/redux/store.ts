import { configureStore } from '@reduxjs/toolkit';
import { safeStorage } from '@/utils/safeStorage';
import authReducer, { login } from './slice/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export const initializeAuth = () => {
  const userInfo = safeStorage.getItem('userInfo');
  const token = safeStorage.getItem('token');
  
  if (userInfo && token) {
    store.dispatch(login({
      userInfo: JSON.parse(userInfo),
      token
    }));
  }
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

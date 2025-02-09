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
  const expire = safeStorage.getItem('expire');
  
  if (userInfo && token) {
    store.dispatch(login({
      userInfo: JSON.parse(userInfo),
      token
    }));
  }

  if (expire && new Date(expire) < new Date()) {
    safeStorage.removeItem('userInfo');
    safeStorage.removeItem('token');
    safeStorage.removeItem('expire');
  }
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

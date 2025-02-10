import { createSlice } from '@reduxjs/toolkit';
import { safeStorage } from '@/utils/safeStorage';

interface AuthState {
  userInfo: {
    _id: string;
    name: string;
    email: string;
    role: string;
    company: string;
    avatar?: string;
  } | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  userInfo: null,
  token: null,
  isAuthenticated: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.userInfo = action.payload.userInfo;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      safeStorage.setItem('userInfo', JSON.stringify(action.payload.userInfo));
      safeStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.userInfo = null;
      state.token = null;
      state.isAuthenticated = false;
      safeStorage.removeItem('userInfo');
      safeStorage.removeItem('token');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

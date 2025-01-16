import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  userInfo: {
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
  userInfo: JSON.parse(localStorage.getItem('userInfo') || 'null'),
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.userInfo = action.payload.userInfo;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem('userInfo', JSON.stringify(action.payload.userInfo));
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.userInfo = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('userInfo');
      localStorage.removeItem('token');
    },
    setAuthStateFromStorage: (state) => {
      const storedUserInfo = localStorage.getItem('userInfo');
      const storedToken = localStorage.getItem('token');
      if (storedUserInfo && storedToken) {
        state.userInfo = JSON.parse(storedUserInfo);
        state.token = storedToken;
        state.isAuthenticated = true;
      }
    },
  },
});

export const { 
  login, 
  logout,
  setAuthStateFromStorage
} = authSlice.actions;

export default authSlice.reducer;

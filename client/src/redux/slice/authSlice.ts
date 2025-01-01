import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  userInfo: {
    name: string;
    email: string;
    avatar?: string;
  } | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState  = {
  userInfo: null, 
  token: null,    
  isAuthenticated: false, 
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
  },
});

export const { 
  login, 
  logout 
} = authSlice.actions;
export default authSlice.reducer;

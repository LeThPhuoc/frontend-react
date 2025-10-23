import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  role: null,
  token: null,
  type: null,
  user: null,
};

const authSlide = createSlice({
  name: 'auth', 
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.role = action.payload.role; 
      state.token = action.payload.token; 
      state.type = action.payload.type; 
      state.user = action.payload.user; 
    },
  },
});

export const { loginSuccess } = authSlide.actions;

export default authSlide.reducer;
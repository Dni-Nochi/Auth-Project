import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
  },
  reducers: {
    getFetch(e, action) {
      console.log(e);
      console.log(action);
    },
  },
});

export const { getFetch } = authSlice.actions;

export default authSlice.reducer;

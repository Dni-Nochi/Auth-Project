import { createSlice } from '@reduxjs/toolkit';

const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    tokenValue: '',
    isLoading: true,
  },
  reducers: {
    setToken(state, action) {
      state.tokenValue = action.payload;
      state.isLoading = false;
    },
    clearToken(state) {
      state.tokenValue = null;
      state.isLoading = false;
    },
  },
});

export const { setToken } = tokenSlice.actions;

export default tokenSlice.reducer;

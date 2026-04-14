import { createSlice } from '@reduxjs/toolkit';

const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    tokenValue: '',
  },
  reducers: {
    async getToken(state, action) {
      try {
        console.log(action, 'asdasd', state);
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/auth/login', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }
        console.log(data);
        state.tokenValue = data.token;
      } catch (err) {
        localStorage.removeItem('token');
        console.log(err.message);
      }
    },
  },
});

export const { getToken } = tokenSlice.actions;

export default tokenSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import getFetch from './authSlice';

export default configureStore({
  reducer: {
    auth: getFetch,
  },
});

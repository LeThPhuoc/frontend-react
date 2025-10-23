import { configureStore } from '@reduxjs/toolkit';
import authSlide from '../features/redux/authSlide';

export const storeRedux = configureStore({
  reducer: {
    auth: authSlide,
  },
});
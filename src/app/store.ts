import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// ストア自体の型をエクスポート
export type RootState = ReturnType<typeof store.getState>;
// dispatch関数の型をエクスポート
export type AppDispatch = typeof store.dispatch; 
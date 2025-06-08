import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

// 状態の型を定義
interface UserState {
  isLoggedIn: boolean;
  username: string;
}

// 初期状態に型を適用
const initialState: UserState = {
  isLoggedIn: false,
  username: 'ゲスト',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // loginアクションのpayloadの型をstringと定義
    login: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = true;
      state.username = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.username = 'ゲスト';
    },
    // updateUsernameアクションのpayloadの型をstringと定義
    updateUsername: (state, action: PayloadAction<string>) => {
      if (state.isLoggedIn) {
        state.username = action.payload;
      }
    },
  },
});

export const { login, logout, updateUsername } = userSlice.actions;

// セレクターにRootState型を適用
export const selectUsername = (state: RootState) => state.user.username;
export const selectIsLoggedIn = (state: RootState) => state.user.isLoggedIn;

export default userSlice.reducer; 
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../../features/user/userSlice';
import LoginPage from '../LoginPage';

// モックストアの作成
const createMockStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
    },
  });
};

// テスト用のラッパーコンポーネント
const renderWithProviders = (component: React.ReactElement) => {
  const store = createMockStore();
  return render(
    <Provider store={store}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </Provider>
  );
};

// fetchのモック
global.fetch = jest.fn();

describe('LoginPage', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('ログインフォームが正しく表示されること', () => {
    renderWithProviders(<LoginPage />);
    
    expect(screen.getByLabelText(/メールアドレス/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/パスワード/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ログイン/i })).toBeInTheDocument();
  });

  it('入力フィールドに値を入力できること', async () => {
    renderWithProviders(<LoginPage />);
    
    const emailInput = screen.getByLabelText(/メールアドレス/i);
    const passwordInput = screen.getByLabelText(/パスワード/i);

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password');

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password');
  });

  it('ログイン成功時にホームページにリダイレクトされること', async () => {
    const mockResponse = {
      token: 'test-token',
      user: {
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
      },
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    renderWithProviders(<LoginPage />);

    const emailInput = screen.getByLabelText(/メールアドレス/i);
    const passwordInput = screen.getByLabelText(/パスワード/i);
    const loginButton = screen.getByRole('button', { name: /ログイン/i });

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password');
    await userEvent.click(loginButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'password',
        }),
      });
    });
  });

  it('ログイン失敗時にエラーメッセージが表示されること', async () => {
    const errorMessage = 'メールアドレスまたはパスワードが間違っています。';
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: errorMessage }),
    });

    renderWithProviders(<LoginPage />);

    const emailInput = screen.getByLabelText(/メールアドレス/i);
    const passwordInput = screen.getByLabelText(/パスワード/i);
    const loginButton = screen.getByRole('button', { name: /ログイン/i });

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'wrongpassword');
    await userEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it('必須フィールドが空の場合にエラーが表示されること', async () => {
    renderWithProviders(<LoginPage />);

    const loginButton = screen.getByRole('button', { name: /ログイン/i });
    await userEvent.click(loginButton);

    expect(screen.getByLabelText(/メールアドレス/i)).toBeInvalid();
    expect(screen.getByLabelText(/パスワード/i)).toBeInvalid();
  });
}); 
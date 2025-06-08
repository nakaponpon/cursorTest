import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectIsLoggedIn } from '../features/user/userSlice';
import { RootState } from '../app/store';

const PrivateRoute: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => selectIsLoggedIn(state));

  // Outletは、このルートが持つ子ルートをレンダリングするためのプレースホルダーです
  // ログインしていれば子ルート（ダッシュボードなど）を表示し、
  // していなければ /login にリダイレクトします
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute; 
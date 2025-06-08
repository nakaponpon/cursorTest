import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, selectUsername } from '../features/user/userSlice';
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [usernameInput, setUsernameInput] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const loggedInUsername = useSelector(selectUsername);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // バックエンドがないため、ここでダミーの認証を行います
    // ユーザー名: admin, パスワード: password
    // ユーザー名: user, パスワード: password
    if ((usernameInput === 'admin' || usernameInput === 'user') && password === 'password') {
      dispatch(login(usernameInput));
      navigate('/');
    } else {
      setError('ユーザー名またはパスワードが間違っています。');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ mt: 8, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          ログイン
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="ユーザー名"
            name="username"
            autoComplete="username"
            autoFocus
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="パスワード"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" variant="body2" align="center" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            ログイン
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage; 
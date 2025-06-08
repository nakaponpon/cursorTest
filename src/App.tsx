import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  Paper,
  Button,
  ListItemButton,
} from '@mui/material';
import { Inbox as InboxIcon, Mail as MailIcon } from '@mui/icons-material';
import InvoicePage from 'components/InvoicePage';
import DeliveryNotePage from 'components/DeliveryNotePage';
import QuotationPage from 'components/QuotationPage';
import ReceiptPage from 'components/ReceiptPage';
import PurchaseOrderPage from 'components/PurchaseOrderPage';
import LoginPage from 'components/LoginPage';
import PrivateRoute from 'components/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectIsLoggedIn, selectUsername } from 'features/user/userSlice';

const drawerWidth = 240;

const theme = createTheme();

const MainContent: React.FC = () => {
  const openPrintWindow = (path: string) => {
    window.open(path, '_blank', 'width=800,height=600');
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector(selectUsername);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            業務アプリ
          </Typography>
          <Typography sx={{ mr: 2 }}>
            ようこそ、{username}さん
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            ログアウト
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {['受信トレイ', 'スター付き', '下書き', 'ゴミ箱'].map((text, index) => (
              <ListItemButton key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
        <Toolbar />
        <Container maxWidth="lg">
          <Paper sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>
              ダッシュボード
            </Typography>
            <Typography paragraph>
              ここにメインコンテンツが表示されます。
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              <Button variant="contained" onClick={() => openPrintWindow('/invoice')}>
                請求書
              </Button>
              <Button variant="contained" color="secondary" onClick={() => openPrintWindow('/delivery-note')}>
                納品書
              </Button>
              <Button variant="contained" onClick={() => openPrintWindow('/quotation')}>
                見積書
              </Button>
              <Button variant="contained" color="secondary" onClick={() => openPrintWindow('/receipt')}>
                領収書
              </Button>
              <Button variant="contained" onClick={() => openPrintWindow('/purchase-order')}>
                注文書
              </Button>
            </Box>
          </Paper>
        </Container>
        <Box component="footer" sx={{ textAlign: 'center', mt: 5, py: 2, backgroundColor: 'grey.200' }}>
          <Typography variant="body2" color="text.secondary">
            © 2024 会社名. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<MainContent />} />
        </Route>
        <Route path="/invoice" element={<InvoicePage />} />
        <Route path="/delivery-note" element={<DeliveryNotePage />} />
        <Route path="/quotation" element={<QuotationPage />} />
        <Route path="/receipt" element={<ReceiptPage />} />
        <Route path="/purchase-order" element={<PurchaseOrderPage />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App; 
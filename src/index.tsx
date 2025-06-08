import React from 'react';
import { createRoot } from 'react-dom/client'; // createRootをインポート
import { BrowserRouter } from 'react-router-dom'; // BrowserRouterをインポート
import './index.css';
import App from './App'; // 拡張子を削除
import { store } from './app/store'; // 拡張子を削除
import { Provider } from 'react-redux';

const container = document.getElementById('root');

// createRoot を使用してルートを作成
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter> {/* BrowserRouterでラップ */}
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
} 
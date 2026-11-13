import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router';
import CartProvider from './cart/CartProvider.tsx';
import App from './App.tsx';
import './index.css';

// 📖 ① 最外层：两个「放出来」的东西包住整个 app
//   BrowserRouter（第 15 课）：盯着网址
//   CartProvider（第 16 课）：放出购物车，任何一页都拿得到
//
// document.getElementById 可能找不到（返回 null），TS 会提醒。
// 结尾的 ! 是告诉 TS「我确定它存在」。只在你真的确定时才用。
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
);

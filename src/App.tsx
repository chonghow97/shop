// 第 20 课：毕业小项目，小商店（只看讲解）
//
// 🔧 怎么运行：
//   cd lesson-20-shop
//   npm run dev       开发
//   npm run check     TypeScript 类型检查
//   npm run lint      ESLint
//   npm run build     先检查类型，再打包（类型有错就不会打包）
//
// 这个项目没有新的大概念，全部是第 11～19 课学过的东西，组合起来做成一个真的 app。
// 每个文件开头都写了「这里用到第几课的什么」。
//
// ---------- 阅读顺序（跟着 📖 编号看）----------
//   ① main.tsx                    最外层的 Provider
//   ② types.ts                    资料长什么样（先看类型，后面就容易读）
//   ③ cart/                       购物车 = context + useReducer + localStorage
//   ④ hooks/useFetch.ts           第 13 课的 useFetch + 泛型
//   ⑤ App.tsx（这个文件，往下看）   网址 → 页面
//   ⑥ components/Layout.tsx       导航栏 + 购物车数量
//   ⑦ pages/Products.tsx          列表 + 搜索（useSearchParams、useRef）
//   ⑧ components/ProductCard.tsx  props 的类型
//   ⑨ pages/ProductDetail.tsx     useParams + 加入购物车
//   ⑩ pages/Cart.tsx              购物车页面
//
// 🖱️ 读完以后去用一用：
//   - 搜索 "phone"：网址变成 /products?q=phone。复制网址开新分页，搜索结果还在
//   - 加几样东西到购物车，导航栏的数字跟着变
//   - 重新整理页面：购物车还在（localStorage）
//   - 在购物车页面按 + / −，减到 0 自动移除
//   - 网址输入 /products/9999（API 404）和 /abc（没有这一页），比较两种「找不到」

import {Route, Routes} from 'react-router';
import Layout from './components/Layout.tsx';
import Home from './pages/Home.tsx';
import Products from './pages/Products.tsx';
import ProductDetail from './pages/ProductDetail.tsx';
import Cart from './pages/Cart.tsx';
import NotFound from './pages/NotFound.tsx';

// 📖 ⑤ 网址 → 页面（第 15 课）
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;

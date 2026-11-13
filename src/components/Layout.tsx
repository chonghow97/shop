import {NavLink, Outlet} from 'react-router';
import {useCart} from '../cart/cart-context.ts';

// 📖 ⑥ 每页共用的外框（第 15 课）+ 购物车数量（第 16 课）
//
// Layout 没有收到任何 props，却拿得到购物车数量：它在 CartProvider 里面。
// 任何一页加了东西，这里的数字都会跟着变。

const linkStyle = ({isActive}: {isActive: boolean}) => ({
  fontWeight: isActive ? 'bold' : 'normal',
  marginRight: 16,
});

function Layout() {
  const {count} = useCart();

  return (
    <main>
      <nav>
        <NavLink to="/" end style={linkStyle}>
          🏪 小商店
        </NavLink>
        <NavLink to="/products" style={linkStyle}>
          商品
        </NavLink>
        <NavLink to="/cart" style={linkStyle}>
          🛒 购物车（{count}）
        </NavLink>
      </nav>
      <hr />
      <Outlet />
    </main>
  );
}

export default Layout;

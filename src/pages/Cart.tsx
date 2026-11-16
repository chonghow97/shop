import {Link} from 'react-router';
import {useCart} from '../cart/cart-context.ts';

// 📖 ⑩ 购物车页面
//
// 资料全部来自 useCart()：items 是 reducer 管的 state，count 和 total 是算出来的。
// 这一页只负责「显示」和「dispatch」，怎么改都写在 cartReducer 里（第 14 课的分工）。
//
// toFixed(2)：价格是小数，0.1 + 0.2 在 JS 里会变成 0.30000000000000004，
// 显示前固定成两位小数。

function Cart() {
  const {items, dispatch, count, total} = useCart();

  if (items.length == 0) {
    return (
      <section>
        <h1>🛒 购物车</h1>
        <p>
          空的。<Link to="/products">去逛逛 →</Link>
        </p>
      </section>
    );
  }

  return (
    <section>
      <h1>🛒 购物车（{count} 件）</h1>
      <ul style={{listStyle: 'none', padding: 0}}>
        {items.map(i => (
          <li key={i.id} style={{marginBottom: 8}}>
            <Link to={`/products/${i.id}`}>{i.title}</Link> · ${i.price} ×{' '}
            <button onClick={() => dispatch({type: 'decrease', id: i.id})}>
              −
            </button>
            {i.qty}
            <button onClick={() => dispatch({type: 'increase', id: i.id})}>
              +
            </button>
            = ${(i.price * i.qty).toFixed(2)}{' '}
            <button onClick={() => dispatch({type: 'remove', id: i.id})}>
              移除
            </button>
          </li>
        ))}
      </ul>
      <p>
        <strong>合计：${total.toFixed(2)}</strong>
      </p>
      <button onClick={() => dispatch({type: 'clear'})}>清空购物车</button>
    </section>
  );
}

export default Cart;

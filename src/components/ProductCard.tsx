import {Link} from 'react-router';
import {useCart} from '../cart/cart-context.ts';
import type {Product} from '../types.ts';

// 📖 ⑧ props 的类型
//
//   type Props = {product: Product};
//   function ProductCard({product}: Props)
//
// 写了类型以后：
//   - 用的人忘了传 product、或传错东西 → 红线
//   - 在这个组件里打 product. → VS Code 列出 title、price……，不用记
//
// 这个卡片自己 dispatch 加入购物车。父组件 Products 完全不用管购物车，
// 不用把 onAdd 一层一层传下来（第 16 课的 prop drilling 问题，用 context 解决了）。

type Props = {product: Product};

function ProductCard({product}: Props) {
  const {dispatch} = useCart();

  return (
    <div style={{border: '1px solid #ddd', borderRadius: 8, padding: 8}}>
      <Link to={`/products/${product.id}`}>
        <img
          src={product.thumbnail}
          alt={product.title}
          style={{width: '100%', aspectRatio: '1', objectFit: 'contain'}}
        />
        <div>{product.title}</div>
      </Link>
      <div>${product.price}</div>
      <button onClick={() => dispatch({type: 'add', product})}>加入</button>
    </div>
  );
}

export default ProductCard;

import {Link, useNavigate, useParams} from 'react-router';
import {useFetch} from '../hooks/useFetch.ts';
import {useCart} from '../cart/cart-context.ts';
import type {Product} from '../types.ts';

// 📖 ⑨ 商品详情
//
// useParams（第 15 课）读出网址里的 id，交给 useFetch 拿这一个商品。
// TS 知道 useParams 读出来的可能是 undefined（万一 Route 没写 :id），
// 不过这里只用来组网址，放进模板字符串没问题。
//
// 「加入并去结账」：先 dispatch，再用 navigate 换页（第 15 课：程序自己换页用 useNavigate）。

function ProductDetail() {
  const {id} = useParams();
  const navigate = useNavigate();
  const {dispatch} = useCart();
  const {
    data: product,
    error,
    loading,
  } = useFetch<Product>(`https://dummyjson.com/products/${id}`);

  if (loading) return <p>加载中…</p>;
  if (error) return <p>{error}（这个商品不存在？）</p>;
  if (!product) return null; // 让 TS 知道下面的 product 一定不是 null

  return (
    <section>
      <Link to="/products">← 回商品列表</Link>
      <h1>{product.title}</h1>
      <img src={product.thumbnail} alt={product.title} style={{width: 200}} />
      <p>{product.description}</p>
      <p>
        分类：{product.category} · 价格：<strong>${product.price}</strong>
      </p>
      <button onClick={() => dispatch({type: 'add', product})}>
        加入购物车
      </button>
      <button
        onClick={() => {
          dispatch({type: 'add', product});
          navigate('/cart');
        }}>
        加入并去结账
      </button>
    </section>
  );
}

export default ProductDetail;

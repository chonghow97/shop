import {useEffect, useRef} from 'react';
import {useSearchParams} from 'react-router';
import {useFetch} from '../hooks/useFetch.ts';
import type {Product} from '../types.ts';
import ProductCard from '../components/ProductCard.tsx';

// 📖 ⑦ 商品列表 + 搜索
//
// ---------- 新东西：useSearchParams，把搜索字放进网址 ----------
// 网址 /products?q=phone 里，? 后面的叫「查询参数」。
//   const [searchParams, setSearchParams] = useSearchParams();
//   searchParams.get('q')        → 'phone'（没有就是 null）
//   setSearchParams({q: 'abc'})  → 网址变成 /products?q=abc
//
// 用法和 useState 很像，只是值存在网址里，而不是 React 里。
// 第 15 课说过「网址就是 state 的一种」：搜索结果可以复制网址分享，重新整理也还在。
//
// ---------- 搜索怎么做 ----------
// 网址的 q 一变 → url 字符串变了 → useFetch 的 effect 重新执行（第 13 课的依赖数组）
// → 快速打字时，旧的请求会被 ignore 挡掉（第 13 课的竞态）
// encodeURIComponent：把空格、中文这些字符转成网址能放的格式
//
// ---------- useRef：一进来就 focus 搜索框（第 18 课）----------

const API = 'https://dummyjson.com/products';

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get('q') ?? ''; // ?? ：左边是 null 或 undefined 就用右边
  const inputRef = useRef<HTMLInputElement>(null); // <> 告诉 TS 这个盒子会放 <input>

  useEffect(() => {
    inputRef.current?.focus(); // ?. ：万一还没放进去（null）就不做
  }, []);

  const url = q
    ? `${API}/search?q=${encodeURIComponent(q)}&limit=12`
    : `${API}?limit=12`;
  // dummyjson 回来的是 {products: [...], total: 194, ...}，我们只用到 products
  const {data, error, loading} = useFetch<{products: Product[]}>(url);

  return (
    <section>
      <h1>商品</h1>
      <input
        ref={inputRef}
        value={q}
        onChange={e => {
          const value = e.target.value;
          // 空的就把 q 从网址拿掉，不要留一个 ?q=
          setSearchParams(value ? {q: value} : {});
        }}
        placeholder="搜索商品，例如 phone"
      />

      {loading && <p>加载中…</p>}
      {error && <p>{error}</p>}
      {data && data.products.length === 0 && <p>找不到「{q}」😢</p>}
      {data && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: 12,
            marginTop: 12,
          }}>
          {data.products.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Products;

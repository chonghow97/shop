import {useEffect, useState} from 'react';

// 📖 ④ 你在第 13 课写的 useFetch，加上 TypeScript
//
// ---------- 新东西：泛型 <T> ----------
// useFetch 不知道你要拿的是商品列表还是单一商品，所以用 T 当「先空着的类型」：
//
//   function useFetch<T>(url: string)
//
// 用的人在 <> 里填上真正的类型：
//
//   useFetch<Product>(url)       → data 的类型是 Product | null
//   useFetch<{products: Product[]}>(url) → data 是 {products: Product[]} | null
//
// 就像函数参数一样，只是传进去的是「类型」而不是「值」。
// 你其实已经用过：useState<User | null>(null)、Array<number> 都是泛型。
//
// 其他部分和第 13 课一模一样：ignore 挡掉旧请求、loading 用算的。

type FetchResult<T> = {
  url: string | null;
  data: T | null;
  error: string | null;
};

export function useFetch<T>(url: string) {
  const [result, setResult] = useState<FetchResult<T>>({
    url: null,
    data: null,
    error: null,
  });

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`请求失败：${res.status}`);
        // res.json() 不知道资料长什么样，用 as T 告诉 TS「相信我，它是 T」
        const data = (await res.json()) as T;
        if (!ignore) setResult({url, data, error: null});
      } catch (err) {
        // catch 到的 err 类型是 unknown（什么都有可能被 throw），要先确认是 Error
        const message = err instanceof Error ? err.message : '未知错误';
        if (!ignore) setResult({url, data: null, error: message});
      }
    }
    load();

    return () => {
      ignore = true;
    };
  }, [url]);

  const isCurrent = result.url === url;

  return {
    data: isCurrent ? result.data : null,
    error: isCurrent ? result.error : null,
    loading: !isCurrent,
  };
}

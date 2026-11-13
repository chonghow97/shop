// 📖 ② 先把「资料长什么样」写成类型（第 17 课）
//
// 整个项目都会 import 这些类型。先看这里，后面的文件就容易读了。
// 用 `import type {...}` 引入：告诉工具「这只是类型」，打包时整行会被删掉。

// API 回来的商品（只列出我们用到的属性，其他的 TS 会当作不存在）
export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnail: string;
};

// 购物车里的一项 = 商品 + 数量（& 把两个类型合起来）
export type CartItem = Product & {qty: number};

// 购物车的所有动作（第 17 课 04 的可辨识联合）
export type CartAction =
  | {type: 'add'; product: Product}
  | {type: 'increase'; id: number}
  | {type: 'decrease'; id: number}
  | {type: 'remove'; id: number}
  | {type: 'clear'};

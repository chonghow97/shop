import {createContext, useContext, type ActionDispatch} from 'react';
import type {CartAction, CartItem} from '../types.ts';

// 📖 ③ 购物车：context + useReducer + TypeScript（第 14、16、17 课合体）
//
// 和第 16 课的购物车几乎一样，多了：
//   - increase / decrease：在购物车页面调整数量，减到 0 就移除
//   - 每个参数、返回值都有类型。打错 action 的 type，写的时候就会画红线

export type CartContextValue = {
  items: CartItem[];
  dispatch: ActionDispatch<[action: CartAction]>; // dispatch 的类型，React 提供的
};

export const CartContext = createContext<CartContextValue | null>(null);

export function cartReducer(items: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case 'add': {
      const {product} = action;
      const found = items.find(i => i.id === product.id);
      if (found) {
        return items.map(i =>
          i.id === product.id ? {...i, qty: i.qty + 1} : i,
        );
      }
      return [...items, {...product, qty: 1}];
    }
    case 'increase':
      return items.map(i => (i.id === action.id ? {...i, qty: i.qty + 1} : i));
    case 'decrease':
      return items
        .map(i => (i.id === action.id ? {...i, qty: i.qty - 1} : i))
        .filter(i => i.qty > 0); // 链式调用（第 9 课）：先减，再把 0 的拿掉
    case 'remove':
      return items.filter(i => i.id !== action.id);
    case 'clear':
      return [];
  }
}

export function useCart() {
  const value = useContext(CartContext);
  if (value === null) {
    throw new Error('useCart() 必须用在 <CartProvider> 里面');
  }
  // 方便用的「算出来的值」，放在这里，每个用到购物车的组件都不用自己再算
  const count = value.items.reduce((sum, i) => sum + i.qty, 0);
  const total = value.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  return {...value, count, total};
}

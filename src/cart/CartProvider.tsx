import {useEffect, useReducer, type ReactNode} from 'react';
import type {CartItem} from '../types.ts';
import {CartContext, cartReducer} from './cart-context.ts';

// 📖 ③（续）CartProvider，多了一个新功能：重新整理页面，购物车还在
//
// ---------- localStorage：浏览器里的小仓库 ----------
//   localStorage.setItem('cart', 字符串)   存
//   localStorage.getItem('cart')            读（没有就是 null）
// 只能存字符串，所以对象要先 JSON.stringify 转成字符串，读出来再 JSON.parse 转回来。
//
// ---------- 怎么接上 useReducer ----------
// 1. 读：useReducer 的第三个参数是「初始化函数」，只在第一次渲染执行一次，
//    用它从 localStorage 读出上次的购物车
// 2. 写：items 一变，就用 useEffect 存回去（effect = 画完之后，和外面同步。这里的「外面」是 localStorage）

const STORAGE_KEY = 'lesson-20-cart';

function loadCart(): CartItem[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as CartItem[]) : [];
  } catch {
    return []; // 存的东西坏掉了、或浏览器不给读 → 当作空的
  }
}

function CartProvider({children}: {children: ReactNode}) {
  // ReactNode = 「任何 React 画得出来的东西」，children 的类型就写这个
  const [items, dispatch] = useReducer(cartReducer, undefined, loadCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  return <CartContext value={{items, dispatch}}>{children}</CartContext>;
}

export default CartProvider;

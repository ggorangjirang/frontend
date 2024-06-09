import { CartItem } from "@/apis/cart";
import { atom } from "recoil";

export type CartStateType = { totalCount: number; cartItems: CartItem[] };

export const cartState = atom<CartStateType>({
  key: "cartState",
  default: {
    totalCount: 0,
    cartItems: [],
  },
});

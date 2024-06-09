import { selector } from "recoil";
import { authState } from "../atoms/authState";
import { getCartItems } from "@/apis/cart";
import { cartState } from "../atoms/cartState";

export const authLoginState = selector({
  key: "authLoginState",
  get: ({ get }) => {
    const auth = get(authState);

    return auth.length;
  },
});

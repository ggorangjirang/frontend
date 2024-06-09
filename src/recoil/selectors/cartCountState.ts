import { DefaultValue, selector } from "recoil";
import { cartState } from "../atoms/cartState";

//TODO 에러 및 방어로직 짜기 loading 표시도
export const cartItemSelector = selector({
  key: "cartItemsSelector",
  //todo 비회원 장바구니 기능 어떻게 ..?
  get: async ({ get }) => {
    //데이터 패칭 처리
    const data = get(cartState);
    return data;
  },
  set: ({ get, set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      // DefaultValue인 경우 아무 작업도 하지 않음
      return;
    }

    // newValue에 totalCount가 포함되어 있을 때만 업데이트
    if (newValue && newValue.totalCount !== undefined) {
      // newValue에 totalCount를 제외한 나머지 속성들은 그대로 가져와서 업데이트
      const { totalCount, ...rest } = newValue;
      set(cartState, { ...rest, totalCount: totalCount });
    }

    // newValue에 cartItems가 포함되어 있을 때 업데이트
    if (newValue && newValue.cartItems !== undefined) {
      // newValue에 totalCount를 제외한 나머지 속성들은 그대로 가져와서 업데이트
      const { cartItems, ...rest } = newValue;
      set(cartState, { ...rest, cartItems: cartItems });
    }
  },
});

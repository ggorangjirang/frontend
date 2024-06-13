import { selector } from "recoil";
import { authState } from "../atoms/authState";

export const authLoginState = selector({
  key: "authLoginState",
  get: ({ get }) => {
    const auth = get(authState);

    return auth.length;
  },
});

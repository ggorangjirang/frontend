import { selector } from "recoil";
import { tokenState } from "../atoms/authState";
import { getUserInfoByEmail } from "@/apis/users";

export const userInfoSelector = selector({
  key: "userInfoSelector",
  get: async ({ get }) => {
    const token = get(tokenState);
    if (!token) {
      throw new Error("No token provided");
    }
    try {
      const userInfo = await getUserInfoByEmail(token);
      console.log(token);
      return userInfo;
    } catch (error) {
      throw error;
    }
  },
});

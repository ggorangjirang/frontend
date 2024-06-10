import { atom } from "recoil";

export const authState = atom({
  key: "auth",
  default: "",
});

export const tokenState = atom({
  key: "tokenState",
  default: null, // 토큰의 기본값
});

export const userState = atom({
  key: "userState",
  default: null,
});

export const isWriteState = atom({ key: "isWriteState", default: false });

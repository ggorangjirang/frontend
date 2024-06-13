import { atom } from "recoil";

export const authState = atom({
  key: "auth",
  default: "",
});

export const tokenState = atom({
  key: "tokenState",
  default: "", // 토큰의 기본값
});

export const userState = atom({
  key: "userState",
  default: ".",
});

export const isWriteState = atom({ key: "isWriteState", default: false });

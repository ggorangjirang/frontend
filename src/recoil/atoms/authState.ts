import { atom } from "recoil";

export const authState = atom({
  key: "auth",
  default: "",
});

export const isWriteState = atom({ key: "isWriteState", default: false });

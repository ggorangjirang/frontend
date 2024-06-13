"use client";
import { getAccessToken } from "@/utils/token";
import { AtomEffect, DefaultValue, atom } from "recoil";

export const authState = atom({
  key: "auth",
  default: "",
});

// const localStorageEffect =
//   <T>(key: string | null): AtomEffect<T> =>
//   ({ setSelf, onSet }) => {
//     if (typeof window !== "undefined" && T !== null) {
//       const savedValue = window.localStorage.getItem(key);
//       if (savedValue !== null) {
//         setSelf(JSON.parse(savedValue));
//       }
//     }
//     //onSet => atom의 변화를 감지하고 구독한다.
//     onSet((newValue: T, _: T | DefaultValue, isReset: boolean) => {
//       isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue));
//     });
//   };

export const tokenState = atom({
  key: "accessToken",
  default: "",
  // effects_UNSTABLE: [localStorageEffect<string | null>("accessToken")],
});

export const userState = atom({
  key: "userState",
  default: ".",
});

export const isWriteState = atom({ key: "isWriteState", default: false });

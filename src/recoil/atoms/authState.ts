"use client";
import { getAccessToken } from "@/utils/token";
import { AtomEffect, DefaultValue, atom } from "recoil";

export const authState = atom({
  key: "auth",
  default: "",
});

const localStorageEffect =
  (key: string): AtomEffect<string> =>
  ({ setSelf, onSet }) => {
    if (typeof window !== "undefined") {
      const savedValue = window.localStorage.getItem(key);
      if (savedValue !== null) {
        try {
          const parsedValue = JSON.parse(savedValue);
          if (typeof parsedValue === "string") {
            setSelf(parsedValue);
          } else {
            console.error(`Expected a string value for ${key} in localStorage, but got:`, parsedValue);
          }
        } catch (e) {
          console.error(`Error parsing localStorage value for ${key}:`, e);
        }
      }
    }
    //onSet => atom의 변화를 감지하고 구독한다.
    onSet((newValue: string, _: string | DefaultValue, isReset: boolean) => {
      isReset ? window.localStorage.removeItem(key) : window.localStorage.setItem(key, newValue);
    });
  };

export const tokenState = atom({
  key: "accessToken",
  default: "",
  effects_UNSTABLE: [localStorageEffect("accessToken")],
});

export const userState = atom({
  key: "userState",
  default: ".",
});

export const isWriteState = atom({ key: "isWriteState", default: false });

"use client";

export const getAccessToken = () => {
  //클라이언트 side에서만 돌아가도록 명시
  if (typeof window !== "undefined") return window.localStorage.getItem("accessToken") || null;
  return null;
};

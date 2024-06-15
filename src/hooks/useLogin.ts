"use client";

import { tokenState } from "@/recoil/atoms/authState";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";

type Props = {};
const defaultValue = "";

export default function useLogin({}: Props) {
  const [isInitial, setIsInitial] = useState(true);
  const [value, setValue] = useRecoilState(tokenState);

  useEffect(() => {
    const storedToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
    if (storedToken) {
      setValue(storedToken);
    }
    setIsInitial(false);
  }, [setValue]);
  useEffect(() => {
    if (!isInitial) {
      if (value) {
        localStorage.setItem("accessToken", value);
      } else {
        localStorage.removeItem("accessToken");
      }
    }
  }, [value, isInitial]);

  return [isInitial ? defaultValue : value, setValue] as const;
}

"use client";
import ViewComponent from "@/components/mypage/view";
import { useRecoilState } from "recoil";
import { isWriteState } from "@/recoil/atoms/authState";
import { useEffect } from "react";
export default function ReviewView() {
  const [isEdit, setIsWrite] = useRecoilState(isWriteState);
  useEffect(() => {
    setIsWrite(false);
  }, []);
  return <ViewComponent />;
}

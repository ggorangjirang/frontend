"use client";
import { tokenState } from "@/recoil/atoms/authState";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

const Redirection = () => {
  const router = useRouter();
  const [, setToken] = useRecoilState(tokenState);

  return <div>로그인 중입니다.</div>;
};

export default Redirection;

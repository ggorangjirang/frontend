"use client";
import { Login } from "@/apis/users";
import { tokenState } from "@/recoil/atoms/authState";
import axios from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";

const Redirection = () => {
  const { register, handleSubmit } = useForm<Login>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        // 현재 URL의 쿼리 파라미터에서 인가 코드를 추출
        const authorizationCode = searchParams.get("code");

        if (authorizationCode) {
          // 인가 코드를 사용하여 백엔드에서 토큰을 요청
          const response = await axios.get(
            `https://ggorangjirang.duckdns.org/login/oauth2/code/kakao?code=${authorizationCode}`
          );

          const { accessToken, refreshToken, message } = await response.data;

          // 토큰을 로컬 스토리지에 저장
          window.localStorage.setItem("accessToken", accessToken);
          window.localStorage.setItem("refreshToken", refreshToken);

          // 인증 성공 메시지 처리
          setToken(accessToken);

          // 원하는 페이지로 리다이렉트
          router.push("/desired-page"); // 원하는 페이지로 변경
        } else {
          console.error("Authorization code not found");
        }
      } catch (error) {
        console.error("Error fetching tokens:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
  }, [searchParams, router]);
  useEffect(() => {}, [searchParams, loading]);
  useEffect(() => {
    setLoading(true);
  }, []);
  if (loading) {
    return <div>로그인 중입니다.</div>;
  }
  return <div>로그인 됐슴</div>;
};

export default Redirection;

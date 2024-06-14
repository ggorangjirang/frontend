"use client";
<<<<<<< HEAD
import { tokenState } from "@/recoil/atoms/authState";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useSearchParams } from "next/navigation";

const Redirection = () => {
  const router = useRouter();
  const [, setToken] = useRecoilState(tokenState);

  const getAccessToken = async (authorizationCode: string | null) => {
    try {
      const response = await axios.get(
        `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_SECRET_KEY_ADMIN}`
      );
      console.log(response);
      const accessToken = response.data.accessToken;
      console.log("accessToken:", accessToken);
      setToken(accessToken);
      localStorage.setItem("token", accessToken);
      // router.push("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const authorizationCode = new URL(window.location.href).searchParams.get("code");
  useEffect(() => {
    if (authorizationCode) {
      getAccessToken(authorizationCode);
    } else {
      console.error("No authorization code found.");
    }
  }, []);
  return <div></div>;
};

export default Redirection;

/*
const kakaoOpt: KakaoOpt = {
  clientId: import.meta.env.VITE_KAKAO_REST_API_KEY || '',
  redirectUri: import.meta.env.VITE_REDIRECT_URI || '',
  clientSecret: import.meta.env.VITE_SECRET_KEY || '',
};
const LoginPage: React.FC = () => {
  const generateKakaoLoginURL = () => {
    console.log('여기??');
    return `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoOpt.clientId}&redirect_uri=${kakaoOpt.redirectUri}&response_type=code`; // 오타 수정: respose_type -> response_type
  };

  const handleKakaoLogin = () => {
    const kakaoLoginURL = generateKakaoLoginURL();
    window.location.href = kakaoLoginURL;
  };

*/
=======
import { Login } from "@/apis/users";
import { tokenState } from "@/recoil/atoms/authState";
import axios from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";

const Page = () => {
  const { register, handleSubmit } = useForm<Login>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  console.log("redirect");
  useEffect(() => {
    const fetchTokens = async () => {
      try {
        // 현재 URL의 쿼리 파라미터에서 인가 코드를 추출
        const authorizationCode = searchParams.get("code");
        console.log(`Authorization code: ${authorizationCode}`);

        if (authorizationCode) {
          // 인가 코드를 사용하여 백엔드에서 토큰을 요청
          const response = await axios.post(
            `https://ggorangjirang.duckdns.org/login/oauth2/code/kakao?code=${authorizationCode}`,
            null, // POST 요청에서 body는 필요 없음
            {
              params: { code: authorizationCode },
            }
          );

          console.log(response);
          const { accessToken, refreshToken, message } = await response.data;

          // 토큰을 로컬 스토리지에 저장
          window.localStorage.setItem("accessToken", accessToken);
          window.localStorage.setItem("refreshToken", refreshToken);

          // 인증 성공 메시지 처리
          console.log(message);

          // 원하는 페이지로 리다이렉트
          router.push("/"); // 원하는 페이지로 변경
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
  useEffect(() => {
    console.log(searchParams.get("code"));
  }, [searchParams, loading]);

  if (loading) {
    return (
      <Suspense>
        <div>로그인 중입니다.</div>
      </Suspense>
    );
  }
  return (
    <Suspense>
      <div>로그인 됐슴</div>
    </Suspense>
  );
};

export default Page;
>>>>>>> 372ee88e6d407f75598dbe923bfefdfec25bea72

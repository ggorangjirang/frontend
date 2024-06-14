"use client";
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
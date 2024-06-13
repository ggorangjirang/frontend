"use client";
import { tokenState } from "@/recoil/atoms/authState";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

const Redirection = () => {
  const router = useRouter();
  const [, setToken] = useRecoilState(tokenState);

  const getAccessToken = async (authorizationCode: string | null) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/oauth2/authorization/kakao`,
        {
          code: authorizationCode,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      const accessToken = response.data.accessToken;
      console.log("accessToken:", accessToken);
      setToken(accessToken);
      localStorage.setItem("token", accessToken);
      router.push("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    const authorizationCode = new URL(window.location.href).searchParams.get("code");
    if (authorizationCode) {
      getAccessToken(authorizationCode);
    } else {
      console.error("No authorization code found.");
    }
  }, []);

  return <div>로그인 중입니다.</div>;
};

export default Redirection;

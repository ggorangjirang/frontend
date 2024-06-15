"use client";
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
  useEffect(() => {
    const fetchTokens = async () => {
      try {
        // 현재 URL의 쿼리 파라미터에서 인가 코드를 추출
        const authorizationCode = searchParams.get("code");

        if (authorizationCode) {
          // 인가 코드를 사용하여 백엔드에서 토큰을 요청
          const response = await axios.post(
            `https://ggorangjirang.duckdns.org/login/oauth2/code/kakao?code=${authorizationCode}`,
            null, // POST 요청에서 body는 필요 없음
            {
              params: { code: authorizationCode },
            }
          );

          const { accessToken, refreshToken, message } = await response.data;

          // 토큰을 로컬 스토리지에 저장
          window.localStorage.setItem("accessToken", accessToken);
          window.localStorage.setItem("refreshToken", refreshToken);

          // 인증 성공 메시지 처리

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

"use client";
import Wrapper from "@/layout/Wrapper/Wrapper";
import Input from "@/components/common/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { ButtonPrimary, KakaoButton } from "@/components/common/Buttons/ButtonIcon";
import { wrapFormAsync } from "@/utils/asyncFunc";
import UserWrapper from "@/layout/Wrapper/UserWrapper";
import { loginUser, Login } from "@/apis/users";
import { tokenState } from "@/recoil/atoms/authState";
import { useSetRecoilState } from "recoil";
import axios from "axios";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLocation } from "react-router-dom";
export const baseApiUrl = "https://ggorangjirang.duckdns.org/";

// const onNaverLogin = () => {
//   openPopup(`https://ggorangjirang.duckdns.org/oauth2/authorization/kakao`);
// };

// export default function SignIn() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleMessage = (event) => {
//       if (event.origin !== "https://ggorangjirang.duckdns.org") {
//         console.error("invalid origin:", event.origin);
//         return; // 보안 체크
//       }
//       console.log(event);

//       const {
//         AccessToken,
//         accessTokenExpired,
//         RefreshToken,
//         refreshTokenExpired,
//       } = event.data;

//       console.log(AccessToken);
//       console.log(accessTokenExpired);
//       console.log(RefreshToken);
//       console.log(refreshTokenExpired);

//       // 토큰을 로컬 스토리지에 저장
//       localStorage.setItem("access_token", AccessToken);
//       localStorage.setItem("refresh_token", RefreshToken);

//       // 메인 페이지로 리디렉트
//       console.log("hello");
//       navigate("/");
//     };

//     window.addEventListener("message", handleMessage);

//     return () => {
//       window.removeEventListener("message", handleMessage);
//     };
//   }, [navigate]);

const LoginComponent = () => {
  const setRecoilToken = useSetRecoilState(tokenState);
  const { register, handleSubmit } = useForm<Login>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    console.log("dasdasd");
  }, [pathname, searchParams]);
  const onSubmitLogin: SubmitHandler<Login> = async (data: Login): Promise<void> => {
    const response = await loginUser({
      email: data.email,
      password: data.password ?? "",
    });

    if (response.status === 200) {
      const accessToken = response?.data.accessToken!.split(" ")[1];
      const refreshToken = response?.data.refreshToken!.split(" ")[1];

      window.localStorage.setItem("accessToken", accessToken);
      window.localStorage.setItem("refreshToken", refreshToken);
      console.log(accessToken);
      setRecoilToken(accessToken);
      router.push("/");
    }
  };
  const getAccessToken = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent the form from submitting
    e.stopPropagation();
    console.log("adsasdaaaaa");

    window.location.href = "https://ggorangjirang.duckdns.org/oauth2/authorization/kakao";

    console.log("adsasdaaaaa");
    setLoading(true);
  };

  useEffect(() => {
    const fetchTokens = async () => {
      console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
      // 현재 URL의 쿼리 파라미터에서 인가 코드를 추출
      const authorizationCode = searchParams.get("code");
      console.log(authorizationCode);
      // 인가 코드를 사용하여 백엔드에서 토큰을 요청
      const response = await axios.get(
        `https://ggorangjirang.duckdns.org/login/oauth2/code/kakao?code=${authorizationCode}`
      );
      const { accessToken, refreshToken, message } = response.data;

      // 토큰을 로컬 스토리지에 저장
      window.localStorage.setItem("accessToken", accessToken);
      window.localStorage.setItem("refreshToken", refreshToken);

      // 인증 성공 메시지 처리
      console.log(message);

      // 원하는 페이지로 리다이렉트
    };

    fetchTokens();
  }, [searchParams, loading]);
  useEffect(() => {
    console.log(searchParams.get("code"));
  }, [searchParams]);

  const fields: { label: string; name: keyof Login; type: string; placeholder: string }[] = [
    { label: "아이디", name: "email", type: "text", placeholder: "아이디(이메일)를 입력해주세요." },
    { label: "비밀번호", name: "password", type: "password", placeholder: "비밀번호를 입력해주세요." },
  ];

  return (
    <Wrapper>
      <UserWrapper>
        {/* <form onSubmit={wrapFormAsync(handleSubmit(getAccessToken))} className="block"> */}
        <p className="mb-[24px] mt-[24px] text-center text-textbig font-bold text-secondary">로그인</p>
        {fields.map((field) => (
          <div key={field.name} className="flex h-auto w-[468px] justify-between">
            <p className="text-texttitle font-semibold leading-[46px] text-primary">{field.label}</p>
            <Input
              required={true}
              type={field.type}
              placeholder={field.placeholder}
              register={register(field.name)}
              className="mb-[12px] h-[46px] w-[327px] pl-[24px]"
            />
          </div>
        ))}
        <div className="flex w-full flex-col items-center justify-center">
          <ButtonPrimary value={"로그인"} className="text-white" type="submit" size="users" />
          <KakaoButton onClickHandler={getAccessToken} />
        </div>
        {/* </form> */}
      </UserWrapper>
    </Wrapper>
  );
};

export default LoginComponent;

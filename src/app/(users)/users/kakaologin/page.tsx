"use client";
import { KakaoButton } from "@/components/common/Buttons/ButtonIcon";
import UserWrapper from "@/layout/Wrapper/UserWrapper";
import Wrapper from "@/layout/Wrapper/Wrapper";
import { useRouter } from "next/navigation";

const kakaoOpt = {
  clientId: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY || "",
  redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI || "",
};
export default function KakaoLogin() {
  const router = useRouter();
  const handleKakaoLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoOpt.clientId}&redirect_uri=${kakaoOpt.redirectUri}&response_type=code`;
  };

  return (
    <Wrapper>
      <UserWrapper>
        <KakaoButton onClickHandler={handleKakaoLogin} />
      </UserWrapper>
    </Wrapper>
  );
}

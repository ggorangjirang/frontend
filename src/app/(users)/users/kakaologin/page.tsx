"use client";
import { KakaoButton } from "@/components/common/Buttons/ButtonIcon";
import UserWrapper from "@/layout/Wrapper/UserWrapper";
import Wrapper from "@/layout/Wrapper/Wrapper";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
const kakaoOpt = {
  clientId: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY || "",
  redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI || "",
};
export default function KakaoLogin() {
  const router = useRouter();
  const handleKakaoLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoOpt.clientId}&redirect_uri=${kakaoOpt.redirectUri}&response_type=code`;
  };
  useEffect(() => {
    const { code } = router.query;

    if (code) {

      // axios.post('/api/kakao/token', { code })
      //   .then(response => {
      //     console.log('Access token:', response.data.access_token);
      //     // Handle further actions after getting access token
      //   })
      //   .catch(error => {
      //     console.error('Failed to exchange Kakao code for token:', error);
      //   });
    }
  }, [router.query]);
  return (
    <Wrapper>
      <UserWrapper>
        <KakaoButton onClickHandler={handleKakaoLogin} />
      </UserWrapper>
    </Wrapper>
  );
}

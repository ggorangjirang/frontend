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
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
export const baseApiUrl = "https://ggorangjirang.duckdns.org/";

const Page = () => {
  const setRecoilToken = useSetRecoilState(tokenState);
  const { register, handleSubmit } = useForm<Login>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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

  const fields: { label: string; name: keyof Login; type: string; placeholder: string }[] = [
    { label: "아이디", name: "email", type: "text", placeholder: "아이디(이메일)를 입력해주세요." },
    { label: "비밀번호", name: "password", type: "password", placeholder: "비밀번호를 입력해주세요." },
  ];

  return (
    <Wrapper>
      <UserWrapper>
        <form onSubmit={wrapFormAsync(handleSubmit(onSubmitLogin))} className="block">
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
        </form>
      </UserWrapper>
    </Wrapper>
  );
};

export default Page;

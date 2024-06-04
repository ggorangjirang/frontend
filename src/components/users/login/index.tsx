"use client";
import Wrapper from "@/layout/Wrapper/Wrapper";
import Input from "@/components/common/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { ButtonPrimary, KakaoButton } from "@/components/common/Buttons/ButtonIcon";
import { wrapFormAsync } from "@/utils/asyncFunc";
import UserWrapper from "@/layout/Wrapper/UserWrapper";

interface LoginData {
  id: string;
  password: string;
}

const LoginComponent = () => {
  const { register, handleSubmit } = useForm<LoginData>();

  const onSubmitLogin: SubmitHandler<LoginData> = async (data: LoginData): Promise<void> => {
    await new Promise((r) => setTimeout(r, 1000));

    const response = await fetch("로그인 서버 주소", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.id,
        password: data.password,
      }),
    });
    const result = await response.json();

    // if (response.status === 200) {
    //   setLoginCheck(false);
    //   // Store token in local storage
    //   sessionStorage.setItem("token", result.token);
    //   sessionStorage.setItem("email", result.email); // 여기서 userid를 저장합니다.
    //   sessionStorage.setItem("role", result.role); // 여기서 role를 저장합니다.
    //   sessionStorage.setItem("storeid", result.storeId); // 여기서 role를 저장합니다.
    //   console.log("로그인성공, 이메일주소:" + result.email);
    //   navigate("/"); // 로그인 성공시 홈으로 이동합니다.
    // } else {
    //   setLoginCheck(true);
    // }
  };

  const fields: { label: string; name: keyof LoginData; type: string; placeholder: string }[] = [
    { label: "아이디", name: "id", type: "text", placeholder: "아이디(이메일)를 입력해주세요." },
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
            <KakaoButton />
          </div>
        </form>
      </UserWrapper>
    </Wrapper>
  );
};

export default LoginComponent;

"use client";
import Wrapper from "@/layout/Wrapper/Wrapper";
import Input from "@/components/common/input";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, KakaoButton } from "@/components/common/button";
import { wrapFormAsync } from "@/utils/asyncFunc";

interface Props {
  signup: boolean;
}

interface SignUpData {
  name: string;
  id: string;
  password: string;
  passwordAgain: string;
  phone: string;
}

interface LoginData {
  id: string;
  password: string;
}

const UserComponent: React.FC<Props> = ({ signup }) => {
  const { register: registerSignUp, handleSubmit: handleSignUpSubmit } = useForm<SignUpData>();

  const { register: registerLogin, handleSubmit: handleLoginSubmit } = useForm<LoginData>();

  const onSubmitSignUp: SubmitHandler<SignUpData> = async (data: SignUpData): Promise<void> => {
    console.log(data);
    // 아이디 중복 검사
    // 비밀번호 일치 검사
    if (data.password !== data.passwordAgain) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    // 전화번호 형식 확인
    const phoneNumberPattern = /^(010-\d{4}-\d{4}|0\d{1,2}-\d{3,4}-\d{4})$/;
    if (!phoneNumberPattern.test(data.phone)) {
      alert("전화번호 형식이 올바르지 않습니다. 올바른 형식: 010-1234-5678 또는 02-123-4567");
      return;
    }
    // try {
    //   const response = await axios.post('주소', data);
    //   console.log('Server Response:', response.data);
    //   alert('회원가입이 완료되었습니다.');
    // } catch (error) {
    //   console.error('Error during signup:', error);
    //   alert('회원가입 중 오류가 발생했습니다.');
    // }
  };

  const onSubmitLogin: SubmitHandler<LoginData> = async (data: LoginData): Promise<void> => {
    console.log(data);
    // 로그인 처리
  };

  const fieldsSignUp: { label: string; name: keyof SignUpData; type: string; placeholder: string }[] = [
    { label: "이름", name: "name", type: "text", placeholder: "이름을 입력해주세요." },
    { label: "아이디", name: "id", type: "text", placeholder: "아이디(이메일)를 입력해주세요." },
    { label: "비밀번호", name: "password", type: "password", placeholder: "비밀번호를 입력해주세요." },
    { label: "비밀번호 확인", name: "passwordAgain", type: "password", placeholder: "비밀번호를 다시 입력해주세요." },
    { label: "전화번호", name: "phone", type: "text", placeholder: "전화번호를 입력해주세요." },
  ];

  const fieldsLogin: { label: string; name: keyof LoginData; type: string; placeholder: string }[] = [
    { label: "아이디", name: "id", type: "text", placeholder: "아이디(이메일)를 입력해주세요." },
    { label: "비밀번호", name: "password", type: "password", placeholder: "비밀번호를 입력해주세요." },
  ];

  return (
    <Wrapper>
      <div className="flex flex-col">
        <div className="relative mt-[100px] flex h-auto w-[468px] flex-col items-center">
          <Image src="/logo3.png" width={259} height={81} alt={""} />
          {signup ? (
            <form onSubmit={wrapFormAsync(handleSignUpSubmit(onSubmitSignUp))} className="block">
              <p className="mb-[24px] mt-[24px] text-center text-textbig font-bold text-secondary">회원가입</p>
              {fieldsSignUp.map((field) => (
                <div key={field.name} className="flex h-auto w-[468px] justify-between">
                  <p className="text-texttitle font-semibold leading-[46px] text-primary">{field.label}</p>
                  <Input type={field.type} placeholder={field.placeholder} register={registerSignUp(field.name)} />
                </div>
              ))}
              <div className="flex w-full flex-col items-center justify-center">
                <Button value={"회원가입"} width={327} height={46} className="text-center" type="submit" />
                <KakaoButton />
              </div>
            </form>
          ) : (
            <form onSubmit={wrapFormAsync(handleLoginSubmit(onSubmitLogin))} className="block">
              <p className="mb-[24px] mt-[24px] text-center text-textbig font-bold text-secondary">로그인</p>
              {fieldsLogin.map((field) => (
                <div key={field.name} className="flex h-auto w-[468px] justify-between">
                  <p className="text-texttitle font-semibold leading-[46px] text-primary">{field.label}</p>
                  <Input type={field.type} placeholder={field.placeholder} register={registerLogin(field.name)} />
                </div>
              ))}
              <div className="flex w-full flex-col items-center justify-center">
                <Button value={"로그인"} width={327} height={46} className="text-center" type="submit" />
                <KakaoButton />
              </div>
            </form>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default UserComponent;

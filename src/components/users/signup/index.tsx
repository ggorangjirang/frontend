"use client";
import Wrapper from "@/layout/Wrapper/Wrapper";
import Input from "@/components/common/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { ButtonPrimary } from "@/components/common/Buttons/ButtonIcon";
import { wrapFormAsync } from "@/utils/asyncFunc";
import UserWrapper from "@/layout/Wrapper/UserWrapper";
import { getDuplicate, postUser } from "@/apis/users";
import { useRouter } from "next/navigation";
interface SignUpData {
  name: string;
  email: string;
  password: string;
  passwordAgain: string;
}

const SignUpComponent = () => {
  const { register, handleSubmit } = useForm<SignUpData>();
  const router = useRouter();
  const onSubmitSignUp: SubmitHandler<SignUpData> = async (data: SignUpData): Promise<void> => {
    try {
      const duplicateResponse = await getDuplicate(data.email);
      if (duplicateResponse.isDuplicate) {
        alert("중복된 아이디입니다.");
        return;
      }

      // 비밀번호 일치 검사
      if (data.password !== data.passwordAgain) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }
      const { name, email, password } = data;
      await postUser({ name, email, password });

      router.push("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fields: { label: string; name: keyof SignUpData; type: string; placeholder: string }[] = [
    { label: "이름", name: "name", type: "text", placeholder: "이름을 입력해주세요." },
    { label: "아이디", name: "email", type: "text", placeholder: "아이디(이메일)를 입력해주세요." },
    { label: "비밀번호", name: "password", type: "password", placeholder: "비밀번호를 입력해주세요." },
    { label: "비밀번호 확인", name: "passwordAgain", type: "password", placeholder: "비밀번호를 다시 입력해주세요." },
  ];

  return (
    <Wrapper>
      <UserWrapper>
        <form onSubmit={wrapFormAsync(handleSubmit(onSubmitSignUp))} className="block">
          <p className="mb-[24px] mt-[24px] text-center text-textbig font-bold text-secondary">회원가입</p>
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
            <ButtonPrimary value={"회원가입"} className="text-center text-white" type="submit" size="users" />
          </div>
        </form>
      </UserWrapper>
    </Wrapper>
  );
};

export default SignUpComponent;

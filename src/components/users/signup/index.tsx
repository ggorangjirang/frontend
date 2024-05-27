"use client";
import Wrapper from "@/layout/Wrapper";
import Input from "@/components/common/input";
import Image from "next/image";
import { useState } from "react";
interface Props {
  signup: boolean;
}

const UserComponent: React.FC<Props> = ({ signup }) => {
  // signup true일 시에만 회원가입
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  return (
    <Wrapper>
      <div className="flex flex-col">
        <div className="relative flex h-auto w-[468px] flex-col items-center border">
          <Image src="/logo3.png" width={259} height={81} alt={""} />
          {signup ? (
            <div className="block">
              <p className="text-center font-bold text-secondary">회원가입</p>
              <div className="bg-red flex w-full justify-stretch">
                <p className="font-semibold leading-[46px] text-primary">이름</p>
                <Input
                  type="text"
                  placeholder="이름을 입력해주세요."
                  value={inputValue}
                  onChange={handleInputChange}
                  className=""
                />
              </div>
            </div>
          ) : (
            <>
              <p>로그인</p>
            </>
          )}
        </div>
      </div>
    </Wrapper>
  );
};
export default UserComponent;

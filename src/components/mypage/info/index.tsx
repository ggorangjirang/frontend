"use client";
import Input from "@/components/common/input";
import MyPageTab from "@/components/common/tab";
import PageWrapper from "@/layout/Wrapper/PageWrapper";
import { useForm, SubmitHandler } from "react-hook-form";
import { wrapFormAsync } from "@/utils/asyncFunc";
import { useEffect, useState } from "react";
import { ButtonPrimary } from "@/components/common/Buttons/ButtonIcon";

interface ChangeInfoData {
  password: string;
  newPassword?: string;
  newPasswordAgain?: string;
  phone: string;
}
declare global {
  interface Window {
    daum: any;
  }
}
const MyPageInfoComponent = () => {
  const { register, handleSubmit } = useForm<ChangeInfoData>();
  const [address, setAddress] = useState("");
  const [zonecode, setZonecode] = useState("");
  const [addressDetail, setAddressDetail] = useState("");

  useEffect(() => {
    // 클라이언트 사이드에서만 실행되도록 보장
    if (typeof window !== "undefined") {
      const script = document.createElement("script");
      script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        console.log("Daum Postcode script loaded");
      };
    }
  }, []);

  const onSubmitChangeInfo: SubmitHandler<ChangeInfoData> = async (data: ChangeInfoData): Promise<void> => {
    console.log(data);
    console.log(address, zonecode, addressDetail);
    // 기존 비밀번호가 db 내부 비밀번호와 일치해야만 수정이 가능함
    if (true) {
      // true 수정 곧
      if (data.newPassword !== data.newPasswordAgain) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }
      const phoneNumberPattern = /^(010-\d{4}-\d{4}|0\d{1,2}-\d{3,4}-\d{4})$/;
      if (!phoneNumberPattern.test(data.phone)) {
        alert("전화번호 형식이 올바르지 않습니다. 올바른 형식: 010-1234-5678 또는 02-123-4567");
        return;
      }
    }
  };
  const onClickAddr = () => {
    if (window.daum && window.daum.Postcode) {
      new window.daum.Postcode({
        oncomplete: function (data: { address: string; zonecode: string }) {
          setAddress(data.address);
          setZonecode(data.zonecode);
        },
      }).open();
    } else {
      console.error("Daum Postcode API is not loaded.");
    }
  };
  return (
    <PageWrapper>
      <div className="absolute mt-[24px] flex h-auto w-[1440px]">
        <MyPageTab />
        <div className="ml-[44px] w-[73%]">
          <p className="mb-[17px] text-texttitle  font-semibold text-primary">개인정보 변경</p>
          <form onSubmit={wrapFormAsync(handleSubmit(onSubmitChangeInfo))} className="block">
            <div className="h-auto w-full rounded-[12px] border border-gray-border p-[2%]">
              <div className="mb-[11px] flex h-[33px] w-full flex-row">
                <div className="w-[13.5%] text-texttitle font-semibold text-primary">이름</div>
                <div className="w-[82.5%] text-textmedium font-medium leading-[33px] text-secondary">김뫄</div>
              </div>
              <div className="mb-[11px] flex h-[33px] w-full flex-row">
                <div className="w-[13.5%] text-texttitle font-semibold text-primary">아이디</div>
                <div className="w-[82.5%] text-textmedium font-medium leading-[33px] text-secondary">
                  twin@gmail.com
                </div>
              </div>
              <div className="mb-[11px] flex h-[33px] w-full flex-row items-center">
                <div className="w-[13.5%] text-texttitle font-semibold text-primary">기존 비밀번호</div>
                <Input // 개인정보 수정할 때마다 비밀번호 확인
                  required={true}
                  type="password"
                  placeholder="기존의 비밀번호를 입력하세요."
                  register={register("password")}
                  className="h-[26px] w-[82.5%] rounded-none pl-[18px]"
                />
              </div>
              <div className="mb-[11px] flex h-[33px] w-full flex-row items-center">
                <div className="w-[13.5%] text-texttitle font-semibold text-primary">새 비밀번호</div>
                <Input
                  required={false}
                  type="password"
                  placeholder="새 비밀번호를 입력하세요."
                  register={register("newPassword")}
                  className="h-[26px] w-[82.5%] rounded-none pl-[18px]"
                />
              </div>
              <div className="mb-[17px] flex h-[33px] w-full flex-row items-center">
                <div className="w-[13.5%] text-texttitle font-semibold text-primary">비밀번호 확인</div>
                <Input
                  required={false}
                  type="password"
                  placeholder="새 비밀번호를 다시 입력하세요."
                  register={register("newPasswordAgain")}
                  className="h-[26px] w-[82.5%] rounded-none pl-[18px]"
                />
              </div>
              <div className="flex h-auto w-full flex-row ">
                <div className="w-[13.5%] text-texttitle font-semibold leading-[17px] text-primary">주소</div>
                <div className="w-[82.5%]">
                  <div>
                    <input
                      type="text"
                      disabled
                      value={zonecode}
                      className="placeholder-grayborder mb-[17px] mr-[17px] h-[26px] w-[100px] border border-gray-border text-center text-textmedium leading-[26px]"
                    />
                    <button
                      type="button"
                      onClick={onClickAddr}
                      className="placeholder-grayborder mb-[17px] h-[26px] w-[100px] border border-gray-border text-center text-textmedium"
                    >
                      <span className="text-textmedium font-medium leading-[26px] text-secondary">우편번호</span>
                    </button>
                  </div>
                  <input
                    type="text"
                    disabled
                    value={address}
                    onClick={onClickAddr}
                    placeholder="기본 주소가 입력됩니다."
                    className="placeholder-grayborder mb-[17px] h-[26px] w-full border border-gray-border pl-[18px] text-textmedium"
                  />
                  <input
                    type="text"
                    value={addressDetail}
                    onChange={(e) => setAddressDetail(e.target.value)}
                    placeholder="나머지 주소를 입력하세요."
                    className="placeholder-grayborder mb-[17px] h-[26px] w-full border border-gray-border pl-[18px] text-textmedium"
                  />
                </div>
              </div>
              <div className="flex h-[33px] w-full flex-row items-center">
                <div className="w-[13.5%] text-texttitle font-semibold text-primary">전화번호</div>
                <Input
                  required={false}
                  type="string"
                  placeholder="전화번호를 입력하세요."
                  register={register("phone")}
                  className="h-[26px] w-[82.5%] rounded-none pl-[18px]"
                />
              </div>
            </div>
            <ButtonPrimary value={"저장"} className="mt-[22px] text-white" type="submit" size="mypage" />
          </form>
        </div>
      </div>
    </PageWrapper>
  );
};
export default MyPageInfoComponent;

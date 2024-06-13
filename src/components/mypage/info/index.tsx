"use client";
import Input from "@/components/common/input";
import MyPageTab from "@/components/common/tab";
import PageWrapper from "@/layout/Wrapper/PageWrapper";
import { useForm, SubmitHandler } from "react-hook-form";
import { wrapFormAsync } from "@/utils/asyncFunc";
import { useEffect, useState } from "react";
import { ButtonPrimary } from "@/components/common/Buttons/ButtonIcon";
import { constSelector, useRecoilState } from "recoil";
import { tokenState } from "@/recoil/atoms/authState";
import { getUserInfoByEmail, patchUser } from "@/apis/users";
import { userInfo } from "os";

interface ChangeInfoData {
  currentPassword: string;
  newPassword?: string;
  confirmPassword?: string;
}
declare global {
  interface Window {
    daum: any;
  }
}
interface userInfo {
  email: string;
  name: string;
  phoneNumber: string;
  address: {
    zipcode: string;
    streetAddress: string;
    detailAddress: string;
  };
}

const MyPageInfoComponent = () => {
  const { register, handleSubmit } = useForm<ChangeInfoData>();
  const [address, setAddress] = useState<string | undefined>("");
  const [zonecode, setZonecode] = useState<string | undefined>("");
  const [addressDetail, setAddressDetail] = useState<string | undefined>("");
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>("");
  const [token, setToken] = useRecoilState(tokenState);

  const [user, setUser] = useState<userInfo>();
  useEffect(() => {
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
    // 기존 비밀번호 맞는지 검증하는 로직 백에서만
    if (data.newPassword !== data.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    // 비번 변경 칸이 공란이면 그거는 바뀌지 않도록
    const phoneNumberPattern = /^(010-\d{4}-\d{4}|0\d{1,2}-\d{3,4}-\d{4})$/;
    if (user?.phoneNumber && !phoneNumberPattern.test(user?.phoneNumber)) {
      alert("전화번호 형식이 올바르지 않습니다. 올바른 형식: 010-1234-5678 또는 02-123-4567");
      return;
    }
    console.log(zonecode);
    const response = await patchUser({
      ...data,
      name: user?.name,
      phoneNumber: user?.phoneNumber,
      address: {
        zipcode: zonecode,
        streetAddress: address,
        detailAddress: addressDetail,
      },
    });
    console.log(response);
  };
  const onClickAddr = () => {
    if (window.daum && window.daum.Postcode) {
      new window.daum.Postcode({
        oncomplete: function (data: { address: string; zonecode: string }) {
          console.log(data);
          setZonecode(data.zonecode);
          setAddress(data.address);
        },
      }).open();
    } else {
      console.error("Daum Postcode API is not loaded.");
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const userInfo = await getUserInfoByEmail(token);
      setUser(userInfo);
      setZonecode(userInfo?.address.zipcode);
      setAddress(userInfo?.address.streetAddress);
      setAddressDetail(userInfo?.address.detailAddress);
    };
    getUser();
  }, []);
  // useEffect(() => {

  // }, []);
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
                <div className="w-[82.5%] text-textmedium font-medium leading-[33px] text-secondary">{user?.name}</div>
              </div>
              <div className="mb-[11px] flex h-[33px] w-full flex-row">
                <div className="w-[13.5%] text-texttitle font-semibold text-primary">아이디</div>
                <div className="w-[82.5%] text-textmedium font-medium leading-[33px] text-secondary">{user?.email}</div>
              </div>
              <div className="mb-[11px] flex h-[33px] w-full flex-row items-center">
                <div className="w-[13.5%] text-texttitle font-semibold text-primary">기존 비밀번호</div>
                <Input // 개인정보 수정할 때마다 비밀번호 확인
                  required={true}
                  type="password"
                  placeholder="기존의 비밀번호를 입력하세요."
                  register={register("currentPassword")}
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
                  register={register("confirmPassword")}
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
                      onChange={(e) => {
                        setZonecode(e.target.value);
                      }}
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
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
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
                <input
                  type="string"
                  placeholder="전화번호를 입력하세요."
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="placeholder-grayborder mb-[17px] h-[26px] w-full rounded-none border border-gray-border pl-[18px] text-textmedium"
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

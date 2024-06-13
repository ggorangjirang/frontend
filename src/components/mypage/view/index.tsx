"use client";
import { ButtonPrimary } from "@/components/common/Buttons/ButtonIcon";
import MyPageTab from "@/components/common/tab";
import PageWrapper from "@/layout/Wrapper/PageWrapper";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { isWriteState } from "@/recoil/atoms/authState";
import ViewTemplate from "@/components/reviews";
import Message from "@/components/common/message";
import { useEffect, useState } from "react";
import { canReview, getReview } from "@/apis/review";

const ViewComponent = () => {
  const [isWrite] = useRecoilState(isWriteState);
  const [reviews, setReviews] = useState();
  const buttons = [
    {
      href: "/mypage/write",
      value: "작성하기",
      primary: isWrite,
    },
    {
      href: "/mypage/view",
      value: "내가 쓴 후기 보기",
      primary: !isWrite,
    },
  ];
  const fetchData = async () => {
    try {
      if (isWrite) {
        const response = await canReview();
        console.log(response);
      } else {
        const response = await getReview();
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log(isWrite);
    fetchData();
  }, []);
  const onClickChange = () => {};
  return (
    <PageWrapper>
      <div className="absolute mt-[24px] flex h-auto w-[1440px]">
        <MyPageTab />
        <div className="ml-[41px] w-[73%]">
          <p className="mb-[26px] text-texttitle font-semibold text-primary">상품 후기</p>
          <div>
            {buttons.map(({ href, value, primary }) => (
              <Link key={href} href={href}>
                <ButtonPrimary
                  value={value}
                  size="mypage"
                  type="button"
                  className={`mr-[18px] ${primary ? "text-white" : "border border-gray-border bg-white text-secondary"}`}
                />
              </Link>
            ))}
          </div>
          <div className="mb-[20px] h-auto w-[1055px] rounded-[12px] border border-gray-border px-[2%] py-[1%]">
            {!isWrite ? (
              // 남긴 상품 있을 경우 조건 나중에 추가 예정 / 임시로 true가 설정
              <div>{true ? <ViewTemplate /> : <Message text="아직 남긴 상품 후기가 없습니다." />}</div>
            ) : (
              // 여기는 작성 페이지
              <div>{true ? <ViewTemplate /> : <Message text="아직 구매한 상품이 없습니다." />}</div>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ViewComponent;

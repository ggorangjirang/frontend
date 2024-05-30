"use client";
import { Button } from "@/components/common/button";
import MyPageTab from "@/components/common/tab";
import PageWrapper from "@/layout/Wrapper/PageWrapper";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { isWriteState } from "@/recoil/atoms/authState";
import ViewDivision from "@/components/reviews";

const ViewComponent = () => {
  const [isWrite] = useRecoilState(isWriteState);

  return (
    <PageWrapper>
      <div className="absolute mt-[24px] flex h-auto w-[1440px]">
        <MyPageTab />
        <div className="ml-[41px] w-[73%]">
          <p className="mb-[26px] text-texttitle font-semibold text-primary">상품 후기</p>
          {!isWrite ? ( // 내가 쓴 후기 보기 먼저
            <div>
              <Link href={"/mypage/write"}>
                <Button
                  value={"작성하기"}
                  size="mypage"
                  type="button"
                  className="mr-[18px] border border-gray-border bg-white text-secondary"
                />
              </Link>
              <Link href={"/mypage/view"}>
                <Button value={"내가 쓴 후기 보기"} size="mypage" type="button" className="text-white" />
              </Link>
            </div>
          ) : (
            // 요거가 쓰기
            <div>
              <Link href={"/mypage/write"}>
                <Button value={"작성하기"} size="mypage" type="button" className="mr-[18px] text-white" />
              </Link>
              <Link href={"/mypage/view"}>
                <Button
                  value={"내가 쓴 후기 보기"}
                  size="mypage"
                  type="button"
                  className="border border-gray-border bg-white text-secondary"
                />
              </Link>
            </div>
          )}
          <ViewDivision />
        </div>
      </div>
    </PageWrapper>
  );
};

export default ViewComponent;

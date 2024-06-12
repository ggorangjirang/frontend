"use client";
import PageWrapper from "@/layout/Wrapper/PageWrapper";
import Image from "next/image";
import { useRouter } from "next/navigation";
const BoughtComponent = () => {
  const router = useRouter();
  return (
    <PageWrapper>
      <div className="flex flex-col items-center pt-[50px]">
        <Image src="/imgs/logos/logo1.png" alt="" width={161} height={164} />
        <div className="my-[19px] text-texttitle font-semibold text-primary">상품 주문이 접수되었습니다.</div>
        <div className="mb-[19px] text-textmedium font-medium text-secondary">
          {/* TODO 추후 2순위 */}
          {/* 주문일 2024.01.01 | 주문번호 11111111 */}
        </div>
        <button
          onClick={() => {
            router.push("/mypage/purchased");
          }}
          type="button"
          className="mb-[175px] h-[38px] w-[318px] cursor-pointer rounded-[12px] border border-none bg-primary text-center text-texttitle font-semibold text-white"
        >
          주문내역 확인
        </button>
      </div>
    </PageWrapper>
  );
};
export default BoughtComponent;

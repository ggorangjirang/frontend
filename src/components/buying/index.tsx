"use client";
import PageWrapper from "@/layout/Wrapper/PageWrapper";
import { ChangeEvent, useEffect, useState } from "react";
import BoughtElement from "../common/bought";
import { formatNumber } from "@/utils/formatNumber";
import { useRouter } from "next/navigation";
import Script from "next/script";

const temp = [
  { title: "상품1", description: "설명1", count: 1, img: "/testImg.png", price: 7000, discount: 5000 },
  { title: "상품2", description: "설명2", count: 2, img: "/testImg.png", price: 5000, discount: 2200 },
];
const box = 3000;
declare const window: typeof globalThis & {
  IMP: any;
  daum: any;
};
const BuyingComponent = () => {
  const router = useRouter();
  const totalPrice = temp.reduce((sum, item) => sum + item.price, 0);
  const totalDiscount = temp.reduce((sum, item) => sum + item.discount, 0);
  const finalPrice = totalPrice - totalDiscount + box;

  const [more, setMore] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedValue, setSelectedValue] = useState("x");

  const [address, setAddress] = useState("");
  const [zonecode, setZonecode] = useState("");
  const [addressDetail, setAddressDetail] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

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

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
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

  const onClickPay = (): void => {
    if (selectedValue === "kakao") {
      if (typeof window !== "undefined") {
        const IMP = window.IMP;
        IMP.init("imp27255777");
        // 결제 내역 수정 예정
        IMP.request_pay(
          {
            pg: "kakaopay",
            pay_method: "card",
            name: "노르웨이 회전 의자",
            amount: 100,
            buyer_email: "gildong@gmail.com",
            buyer_name: "홍길동",
            buyer_tel: "010-4242-4242",
            buyer_addr: "서울특별시 강남구 신사동",
            buyer_postcode: "01181",
            m_redirect_url: "/",
          },
          (rsp: { success: boolean }) => {
            if (rsp.success === true) {
              router.push("/bought");
            } else {
              alert("결제에 실패했습니다. 다시 시도해주세요.");
            }
          }
        );
      }
    } else {
      router.push("/bought");
    }
  };
  return (
    <PageWrapper>
      <Script src="https://code.jquery.com/jquery-1.12.4.min.js" strategy="lazyOnload" />
      <Script src="https://cdn.iamport.kr/v1/iamport.js" strategy="lazyOnload" />
      <div className="mt-[64px] flex h-auto w-[1440px] flex-col px-[3%]">
        <p className="mb-[19px] text-texttitle  font-semibold text-primary">주문 목록</p>
        <div className="h-[1px] w-full border border-gray-border" />
        <div>
          {more ? (
            temp.map((product, index) => <BoughtElement temp={product} key={index} />)
          ) : (
            <BoughtElement temp={temp[0]} />
          )}
        </div>
        <p
          className="cursor-pointer text-center text-textmedium font-medium text-secondary"
          onClick={() => {
            setMore(!more);
          }}
        >
          {more ? "접기" : "더보기"}
        </p>
        <div className="mt-[97px] flex h-auto">
          <p className="text-texttitle font-semibold text-primary">받는 사람 정보</p>
          <input type="checkbox" className="mx-[10px]" checked={isChecked} onChange={handleCheckboxChange} />
          <div className="text-textmedium font-medium leading-[200%] text-secondary">구매자와 정보 동일</div>
        </div>
        <div className="my-[19px] h-[1px] w-full border border-gray-border" />
        <div>
          {/* 이름 구역 */}
          <div className="flex h-[33px] w-full flex-row items-center">
            <div className="w-[13.5%] text-texttitle font-semibold text-primary">이름</div>
            <input
              type="text"
              required
              placeholder="이름을 입력하세요."
              className="placeholder-grayborder h-[26px] w-full border border-gray-border pl-[18px] text-textmedium"
            />
          </div>
          {/* 전화번호 구역 */}
          <div className="mt-[19px] flex h-[33px] w-full flex-row items-center">
            <div className="w-[13.5%] text-texttitle font-semibold text-primary">전화번호</div>
            <input
              type="text"
              required
              placeholder="전화번호를 입력하세요."
              className="placeholder-grayborder h-[26px] w-full border border-gray-border pl-[18px] text-textmedium"
            />
          </div>
          {/* 주소 구역 */}
          <div className="mt-[19px] flex h-auto w-full flex-row">
            <div className="w-[11.8%] text-texttitle font-semibold text-primary">주소</div>
            <div className="w-[88.2%]">
              <div>
                <input
                  type="text"
                  disabled
                  required
                  value={zonecode}
                  className="placeholder-grayborder mb-[19px] mr-[17px] h-[26px] w-[100px] border border-gray-border text-center text-textmedium leading-[26px]"
                />
                <button
                  type="button"
                  onClick={onClickAddr}
                  className="placeholder-grayborder mb-[19px] h-[26px] w-[100px] border border-gray-border text-center text-textmedium"
                >
                  <span className="text-textmedium font-medium leading-[26px] text-secondary">우편번호</span>
                </button>
              </div>
              <input
                type="text"
                disabled
                required
                value={address}
                onClick={onClickAddr}
                placeholder="기본 주소가 입력됩니다."
                className="placeholder-grayborder mb-[19px] h-[26px] w-full border border-gray-border pl-[18px] text-textmedium"
              />
              <input
                type="text"
                value={addressDetail}
                onChange={(e) => setAddressDetail(e.target.value)}
                placeholder="나머지 주소를 입력하세요."
                className="placeholder-grayborder mb-[19px] h-[26px] w-full border border-gray-border pl-[18px] text-textmedium"
              />
            </div>
          </div>
          {/* 배송 구역 */}
          <div className="flex h-[33px] w-full flex-row items-center">
            <div className="w-[13.5%] text-texttitle font-semibold text-primary">배송 요청사항</div>
            <input
              type="text"
              required
              placeholder="배송 요청사항을 입력하세요."
              className="placeholder-grayborder h-[26px] w-full border border-gray-border pl-[18px] text-textmedium"
            />
          </div>
        </div>
        <div className="mb-[47px] mt-[19px] h-[1px] w-full border border-gray-border" />
        {/* 결제 금액 출력 */}
        <p className="text-texttitle font-semibold text-primary">결제 금액</p>
        <div className="my-[19px] h-[1px] w-full border border-gray-border" />
        <div className="flex flex-col">
          <p className="mb-[19px] text-textmedium font-medium text-gray">
            상품({temp.length}개): {formatNumber(totalPrice)}원
          </p>
          <p className="mb-[19px] text-textmedium font-medium text-gray">
            할인받은 금액: {formatNumber(totalDiscount)}원
          </p>
          <p className="mb-[19px] text-textmedium font-medium text-gray">배송비: {formatNumber(box)}원</p>
          <p className="text-textbig font-bold text-gray">
            총 결제금액: <span className="text-price">{formatNumber(finalPrice)}원</span>
          </p>
        </div>
        <div className="mb-[47px] mt-[19px] h-[1px] w-full border border-gray-border" />
        {/* 결제 방법 출력 */}
        <p className="text-texttitle font-semibold text-primary">결제 방법</p>
        <div className="my-[19px] h-[1px] w-full border border-gray-border" />
        <div className="flex">
          <input type="radio" name="pay" className="" value="kakao" onChange={handleChange} />
          <span className="ml-[7px] text-textmedium font-medium text-secondary">카카오페이</span>
          <input type="radio" name="pay" className="ml-[20px]" value="x" onChange={handleChange} />
          <span className="ml-[7px] text-textmedium font-medium text-secondary">무통장입금</span>
        </div>
        <div className="my-[19px] h-[1px] w-full border border-gray-border" />
      </div>
      <button
        onClick={onClickPay}
        type="button"
        className="mb-[175px] h-[38px] w-[318px] cursor-pointer rounded-[12px] border border-none bg-primary text-center text-texttitle font-semibold text-white"
      >
        결제하기
      </button>
    </PageWrapper>
  );
};
export default BuyingComponent;

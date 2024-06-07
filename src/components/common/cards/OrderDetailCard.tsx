import Image from "next/image";
import TextMedium from "../labels/TextMedium";
import { ButtonMedium } from "../Buttons/ButtonIcon";

type Props = {};

export default function OrderDetailCard({}: Props) {
  return (
    <div className="mb-6 flex h-[150px] flex-row items-center justify-between gap-5 rounded-lg border border-gray-border p-5">
      <Image src="/testImg.png" width={120} height={120} alt="img"></Image>
      <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_1fr] grid-rows-2 justify-center gap-2 align-middle">
        <TextMedium style={{ display: "flex", justifyContent: "center", fontWeight: "bold" }}>주문일</TextMedium>
        <TextMedium style={{ display: "flex", justifyContent: "center", fontWeight: "bold" }}>주문번호</TextMedium>
        <TextMedium style={{ display: "flex", justifyContent: "center", fontWeight: "bold" }}>결제금액</TextMedium>
        <TextMedium style={{ display: "flex", justifyContent: "center", fontWeight: "bold" }}>결제수단</TextMedium>
        <TextMedium style={{ display: "flex", justifyContent: "center", fontWeight: "bold" }}>배송상태</TextMedium>
        <TextMedium style={{ display: "flex", justifyContent: "center", fontWeight: "bold" }}>주문취소여부</TextMedium>
        <TextMedium>2024.01.01</TextMedium>
        <div className="flex justify-center ">1234567891011</div>
        <div className="flex justify-center ">9999990 원</div>
        <div className="flex justify-center ">무통장입금</div>
        <div className="flex justify-center ">배송 전</div>
        <div className="flex justify-center ">x</div>
      </div>
      <ButtonMedium type="button">주문서 보기</ButtonMedium>
    </div>
  );
}

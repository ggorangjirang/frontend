import Image from "next/image";

export default function OrderDetailProductCard() {
  return (
    <div className="my-6 flex h-[150px] w-full flex-row items-center justify-start gap-5 rounded-lg border border-gray-border p-5">
      <Image src="/testImg.png" width={120} height={120} alt="img"></Image>
      <div className="flex h-full flex-col items-start justify-start gap-3">
        <div className="bold text-xl text-primary">상품명</div>
        <div className="text-gray">수량</div>
        <div className="text-gray">가격</div>
      </div>
    </div>
  );
}

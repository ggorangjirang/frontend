import Image from "next/image";
import React from "react";
import { ProductCardProps } from "./ProductCardList";

const DUMMY = {
  imgUrl: "/testImg.png",
  title: "굿모닝 탱구 귀여움 치사량 주의하세요 너무 귀여워서 ",
  discount: "10%",
  originPrice: 300000,
  price: 200000, //db에서 최종 price 계산해서 주는지?
  option: "품절",
};

export default function ProductCard({ imgSize = 250 }: ProductCardProps) {
  return (
    <div className={`w-[${imgSize}px] z-0 flex cursor-pointer flex-col justify-center gap-y-2 align-middle`}>
      <Image
        className="rounded-lg border border-gray-border"
        src={DUMMY.imgUrl}
        width={imgSize}
        height={imgSize}
        alt={DUMMY.title}
      ></Image>
      <div className={` h-full px-2`}  style={{ width: `${imgSize}px` }}>
        <div className="flex flex-wrap text-base font-bold leading-tight text-secondary">{DUMMY.title}</div>
        <div className="flex items-center justify-start gap-3 leading-tight">
          <div className="text-sm text-warning">{DUMMY.discount}</div>
          <div className="text-sm leading-tight text-gray line-through">{DUMMY.originPrice.toLocaleString()}원</div>
        </div>
        <div className="text-base font-bold leading-tight text-price">{DUMMY.price.toLocaleString()}원</div>
        <span className="border p-[1px] align-middle text-[12px] leading-tight text-gray">임시품절</span>
      </div>
    </div>
  );
}

import Image from "next/image";
import React from "react";
type Props = {};

const DUMMY = {
  imgUrl: "/testImg.png",
  title: "굿모닝 탱구 귀여움 치사량 주의하세요 너무 귀여워서 ",
  discount: "10%",
  originPrice: 300000,
  price: 200000, //db에서 최종 price 계산해서 주는지?
  option: "품절",
};

export default function ProductCard({}: Props) {
  return (
    <div className="flex w-[250px] flex-col justify-center gap-y-2 align-middle">
      <Image
        className="rounded-lg border border-gray-border"
        src={DUMMY.imgUrl}
        width={250}
        height={250}
        alt={DUMMY.title}
      ></Image>
      <div className="fw-full h-full px-2">
        <div className="text-base font-bold text-secondary leading-tight">{DUMMY.title}</div>
        <div className="flex items-center justify-start gap-3 leading-tight">
          <div className="text-sm text-warning">{DUMMY.discount}</div>
          <div className="text-sm text-gray line-through leading-tight">{DUMMY.originPrice.toLocaleString()}원</div>
        </div>
        <div className="text-base font-bold text-price leading-tight">{DUMMY.price.toLocaleString()}원</div>
        <span className="border p-[1px] align-middle text-[12px] text-gray leading-tight">임시품절</span>
      </div>
    </div>
  );
}

import Image from "next/image";
import { ProductCardProps } from "./ProductCardList";
import Link from "next/link";

export default function ProductCard({ imgSize = 250, cardInfo }: ProductCardProps) {
  return (
    <Link href={`products?productId=${cardInfo.productId}`}>
      <div className={`w-[${imgSize}px] z-0 flex cursor-pointer flex-col justify-center gap-y-2 align-middle`}>
        <Image
          loading="lazy"
          className="rounded-lg border border-gray-border"
          src={cardInfo.imageUrl === "url" ? "/testImg.png" : cardInfo.imageUrl} //TODO 추후 수정
          width={imgSize}
          height={imgSize}
          alt={cardInfo.name}
        ></Image>
        <div className={`h-full px-2`} style={{ width: `${imgSize}px` }}>
          <div className="flex flex-wrap text-base font-bold leading-tight text-secondary">{cardInfo.name}</div>
          {cardInfo.discountRate !== 0 && (
            <div className="flex items-center justify-start gap-3 leading-tight">
              <div className="text-sm text-warning">{cardInfo.discountRate}%</div>
              <div className="text-sm leading-tight text-gray line-through">{cardInfo.price.toLocaleString()}원</div>
            </div>
          )}
          <div className="text-base font-bold leading-tight text-price">
            {cardInfo.discountedPrice.toLocaleString()}원
          </div>
          {cardInfo.stock === 0 && (
            <span className="border p-[1px] px-[4px] align-middle text-[12px] leading-tight text-gray"> 품절 </span>
          )}
        </div>
      </div>
    </Link>
  );
}

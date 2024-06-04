import { Product } from "@/apis/product";
import ProductCard from "./ProductCard";

interface Props {
  title: string;
  data: Product[] | undefined;
}

export default function ProductCardListSet({ title, data }: Props) {
  const content = data;
  return (
    content && (
      <div className="border-b border-gray-border last:border-b-0 ">
        <div className=" my-9 flex w-full flex-row items-start justify-start text-[22px] font-bold text-text">
          <div>{title}</div>
        </div>
        <div className="b my-2 flex w-[1240px] flex-wrap justify-center gap-14 gap-x-20 align-middle ">
          {content.map((cardInfo) => {
            return <ProductCard cardInfo={cardInfo} key={cardInfo.productId}></ProductCard>;
          })}
          <div className="mb-12 flex h-12 w-60 cursor-pointer items-center justify-center rounded-full border border-gray-border text-gray hover:opacity-55">
            상품 전체보기
          </div>
        </div>
      </div>
    )
  );
}

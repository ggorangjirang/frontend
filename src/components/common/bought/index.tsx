import { CartItem } from "@/apis/cart";
import Image from "next/image";

type BoughtElementCard = {
  item: CartItem;
};
const BoughtElement = ({ item }: BoughtElementCard) => {
  return (
    item && (
      <>
        <div className="flex flex-row">
          <Image
            className="my-[19px] mr-[19px] flex items-center justify-center bg-gray-border"
            src={item.productImageUrl}
            alt={item.productName}
            width={75}
            height={75}
          />
          <div className="mt-[19px] flex flex-col">
            <div className="mb-[3px] text-texttitle font-semibold text-primary">{item.productName}</div>
            <div className="mb-[3px] text-textsmall font-medium text-gray">
              가격 : {item.discountedPrice.toLocaleString()} 원
            </div>
            <div className="text-textsmall font-medium text-gray">수량: {item.quantity} 개</div>
          </div>
        </div>
        <div className="h-[1px] w-full border border-gray-border" />
      </>
    )
  );
};
export default BoughtElement;

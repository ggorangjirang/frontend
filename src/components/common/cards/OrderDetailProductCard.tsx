import { OrderItemDetail } from "@/apis/orders";
import Image from "next/image";

type Props = {
  orderItem: OrderItemDetail;
};

export default function OrderDetailProductCard({ orderItem }: Props) {
  return (
    <div className="my-6 flex h-[150px] w-full flex-row items-center justify-start gap-5 rounded-lg border border-gray-border p-5">
      <Image src={orderItem.imageUrl} width={120} height={120} alt="img"></Image>
      <div className="flex h-full flex-col items-start justify-start gap-3">
        <div className="bold text-xl font-bold text-primary">{orderItem.productName}</div>
        <div className="text-gray">수량 : {orderItem.quantity} 개</div>
        <div className="text-gray">가격 : {orderItem.totalPrice.toLocaleString()} 원</div>
      </div>
    </div>
  );
}

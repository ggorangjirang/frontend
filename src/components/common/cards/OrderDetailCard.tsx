import Image from "next/image";
import TextMedium from "../labels/TextMedium";
import { ButtonMedium } from "../Buttons/ButtonIcon";
import { Order } from "@/apis/orders";
import { formatDate } from "@/utils/time";
import { usePathname, useRouter } from "next/navigation";
import { DELIVERY_STATUS, ORDER_STATUS } from "@/constants";

type Props = {
  order: Order;
};

export default function OrderDetailCard({ order }: Props) {
  const router = useRouter();
  const pathName = usePathname();
  const oncClickDetail = () => router.push(`${pathName}/order?orderId=${order.id}`);
  console.log(order);
  return (
    order && (
      <div className="mb-6 flex h-[150px] flex-row items-center justify-between gap-5 rounded-lg border border-gray-border p-5">
        {<Image src={`${order.orderItems[0].imageUrl}`} width={120} height={120} alt="img"></Image>}
        <div className="grid grid-cols-[1fr_1fr_1.5fr_1fr] grid-rows-2 justify-center gap-2 align-middle">
          <TextMedium style={{ display: "flex", justifyContent: "center", fontWeight: "bold" }}>주문일</TextMedium>
          {/* <TextMedium style={{ display: "flex", justifyContent: "center", fontWeight: "bold" }}>주문번호</TextMedium> */}
          <TextMedium style={{ display: "flex", justifyContent: "center", fontWeight: "bold" }}>결제금액</TextMedium>
          {/* <TextMedium style={{ display: "flex", justifyContent: "center", fontWeight: "bold" }}>결제수단</TextMedium> */}
          <TextMedium style={{ display: "flex", justifyContent: "center", fontWeight: "bold" }}>배송상태</TextMedium>
          <TextMedium style={{ display: "flex", justifyContent: "center", fontWeight: "bold" }}>
            주문취소여부
          </TextMedium>
          <div className="flex justify-center ">{formatDate(order.orderDate)}</div>
          {/* <div className="flex justify-center ">{order}</div> */}
          <div className="flex justify-center ">{order.totalAllPrice.toLocaleString()}원</div>
          {/* <div className="flex justify-center ">무통장입금</div> */}
          <div className="flex justify-center ">{DELIVERY_STATUS[order.deliveryStatus]}</div>
          <div className="flex justify-center ">{ORDER_STATUS[order.orderStatus]}</div>
        </div>
        <ButtonMedium type="button" onClickHandler={oncClickDetail}>
          주문서 보기
        </ButtonMedium>
      </div>
    )
  );
}

import Image from "next/image";
import CountSpinner from "../input/CountSpinner/CountSpinner";
import { ButtonMedium } from "../Buttons/ButtonIcon";
import { Dispatch, SetStateAction } from "react";

type Props = {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
};

export default function BasketItemCard({ count, setCount }: Props) {
  return (
    <div className="last:border-b">
      <div className="grid h-[150px] grid-cols-[1.5fr_3.5fr_1fr_1fr_1fr] gap-2 border-t border-gray-border p-4 text-center align-middle last-of-type:border-b">
        <Image src="/testImg.png" width={120} height={120} alt="img"></Image>
        <div className="flex h-full flex-col items-start justify-start gap-3">
          <div className="text-xl font-bold text-primary">상품명</div>
          <div className="text-gray">설명</div>
        </div>
        <CountSpinner size="medium" count={count} setCount={setCount}></CountSpinner>
        <div className="flex flex-col items-center justify-center">
          <div className="text-xl font-bold text-price">2,400 원</div>
          <div className="text-gray">6000 원</div>
        </div>
        <div className="flex items-center justify-center">
          <ButtonMedium type="button">삭제</ButtonMedium>
        </div>
      </div>
    </div>
  );
}

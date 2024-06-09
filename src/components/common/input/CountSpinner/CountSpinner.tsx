import { Dispatch, SetStateAction } from "react";

interface SpinnerSizeProps {
  buttonSize: string;
  inputSize: string;
}
interface sizeVariants {
  big: SpinnerSizeProps;
  medium: SpinnerSizeProps;
}

interface Props {
  productId: number;
  count: number;
  setCount?: Dispatch<SetStateAction<number>>;
  setCountHandler?: (productId: number, value: number) => void;
  maximum?: number;
  size?: keyof sizeVariants;
}

/*
사용법 :     

1. const [count, setCount] =useState<number>(defaultValue) 선언해줍니다
2. <CountSpinner count={count} setCount={setCount}/> 넣어줍니다.


*/
export default function CountSpinner({
  productId,
  count,
  setCount,
  setCountHandler,
  maximum = 99999,
  size = "big",
}: Props) {
  const sizeVariants = {
    medium: {
      buttonSize: "h-6 w-6",
      inputSize: "h-6 w-14",
    },
    big: {
      buttonSize: "h-8 w-8",
      inputSize: "h-8 w-24",
    },
  };

  function onClickPlus() {
    if (setCount) setCount((prev) => (prev >= maximum ? prev : prev + 1));
    if (setCountHandler) setCountHandler(productId, count >= maximum ? count : count + 1); // setCountHandler 호출
  }

  function onClickMinus() {
    if (setCount) setCount((prev) => (prev <= 1 ? prev : prev - 1));
    if (setCountHandler) setCountHandler(productId, count <= 1 ? count : count - 1); // setCountHandler 호출
  }

  return (
    <div className="flex h-auto flex-row items-center justify-center">
      <div
        onClick={onClickMinus}
        className={`flex ${sizeVariants[size].buttonSize} cursor-pointer select-none items-center justify-center border border-text bg-white font-bold text-text hover:bg-[#6d6d6d] hover:bg-opacity-20 hover:shadow-md`}
      >
        -
      </div>
      <input
        className={`flex  ${sizeVariants[size].inputSize} items-center justify-center border-y border-text text-center font-bold text-text outline-none`}
        type="number"
        readOnly
        min={1}
        value={count}
      ></input>
      <div
        onClick={onClickPlus}
        className={`flex ${sizeVariants[size].buttonSize} cursor-pointer select-none items-center justify-center border border-text bg-white font-bold text-text hover:bg-[#6d6d6d] hover:bg-opacity-20 hover:shadow-md`}
      >
        +
      </div>
    </div>
  );
}

import React from "react";

type Props = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

/*
사용법 :     

1. const [count, setCount] =useState<number>(defaultValue) 선언해줍니다
2. <CountSpinner count={count} setCount={setCount}/> 넣어줍니다.


*/
export default function CountSpinner({ count, setCount }: Props) {
  function onClickPlus() {
    setCount((prev) => prev + 1);
  }

  function onClickMinus() {
    setCount((prev) => (prev <= 1 ? prev : prev - 1));
  }

  return (
    <div className="flex h-auto w-40 flex-row items-center justify-center">
      <div
        onClick={onClickMinus}
        className="flex h-8  w-8 cursor-pointer select-none items-center justify-center border border-text bg-white font-bold text-text hover:bg-[#6d6d6d] hover:bg-opacity-20 hover:shadow-md"
      >
        -
      </div>
      <input
        className="flex h-8 w-24 items-center justify-center border-y border-text text-center font-bold text-text outline-none"
        type="number"
        readOnly
        min={1}
        value={count}
      ></input>
      <div
        onClick={onClickPlus}
        className="flex h-8 w-8 cursor-pointer  select-none items-center justify-center border border-text bg-white font-bold text-text hover:bg-[#6d6d6d] hover:bg-opacity-20 hover:shadow-md"
      >
        +
      </div>
    </div>
  );
}

import { PageInfo } from "@/app/(categories)/categories/page";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Props = {
  limit: number;
  totalPage: number;
  pageSize: number;
  pageInfo: PageInfo;
  setPageInfo: Dispatch<SetStateAction<PageInfo>>;
  requestFn?: () => void;
};

const generateArray = ({ totalPage, limit }: { totalPage: number; limit: number }) => {
  const arr = Array.from({ length: totalPage }, (_, i) => i + 1);
  const slicedArray = Array(Math.ceil(totalPage / limit))
    .fill(0)
    .map(() => arr.splice(0, limit));

  return slicedArray;
};

export default function Pagenation({ limit, totalPage, requestFn = () => {}, pageInfo, setPageInfo }: Props) {
  const numbers = generateArray({ totalPage: totalPage, limit: limit });
  const selected = Math.floor((pageInfo.page - 1) / limit);

  const onClickLeftArrow = () => {
    setPageInfo((prev) => ({ ...prev, page: prev.page - limit < 1 ? prev.page : prev.page - limit }));
    requestFn();
  };

  const onClickRightArrow = () => {
    setPageInfo((prev) => ({ ...prev, page: prev.page + limit > totalPage ? totalPage : prev.page + limit }));
    requestFn();
  };

  const onClickNumber = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const value = Number(e.currentTarget.textContent);
    setPageInfo((prev) => ({ ...prev, page: value }));
    requestFn();
  };

  return (
    <div className="my-8 flex h-8 w-full flex-row items-center justify-center">
      <div
        className="flex h-8 w-8 items-center justify-center rounded-full hover:cursor-pointer hover:bg-secondary hover:text-white"
        onClick={onClickLeftArrow}
      >
        {`<`}
      </div>
      {numbers[selected].map((item) => (
        <div
          key={item}
          className={`mx-2 flex h-8 w-8 items-center justify-center rounded-full 
          hover:cursor-pointer hover:bg-secondary hover:text-white 
          ${item === pageInfo.page ? "bg-secondary text-white" : ""}`}
          onClick={onClickNumber}
        >
          {item}
        </div>
      ))}
      <div
        className="flex h-8 w-8 items-center justify-center rounded-full 
      hover:cursor-pointer hover:bg-secondary hover:text-white"
        onClick={onClickRightArrow}
      >
        {`>`}
      </div>
    </div>
  );
}

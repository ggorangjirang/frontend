import { Dispatch, SetStateAction } from "react";

type Props = {
  limit: number;
  totalPage: number;
  pageSize: number;
  pageInfo: PageInfo | null;
  setPageInfo: Dispatch<SetStateAction<PageInfo | null>>;
  requestFn?: () => void;
};

export type PageInfo = {
  page: number;
  totalPages: number;
  totalElements: number;
  limit?: number;
};

const generateArray = ({ totalPage, limit }: { totalPage: number; limit: number }) => {
  const arr = Array.from({ length: totalPage }, (_, i) => i + 1);
  const slicedArray = Array(Math.ceil(totalPage / limit))
    .fill(0)
    .map(() => arr.splice(0, limit));

  return slicedArray;
};
// page 넘버 0 을기준으로 합니다.

export default function Pagination({ limit, totalPage, requestFn = () => {}, pageInfo, setPageInfo }: Props) {
  const numbers = generateArray({ totalPage: totalPage, limit: limit });
  const selected = Math.floor(pageInfo!.page / limit);

  const onClickLeftArrow = () => {
    setPageInfo((pageInfo) => {
      if (pageInfo !== null)
        return { ...pageInfo, page: pageInfo.page - limit < 0 ? pageInfo.page : pageInfo.page - limit };
      return pageInfo;
    });

    requestFn();
  };

  const onClickRightArrow = () => {
    setPageInfo((pageInfo) => {
      if (pageInfo !== null)
        return { ...pageInfo, page: pageInfo.page + limit > totalPage - 1 ? totalPage - 1 : pageInfo.page + limit };
      return pageInfo;
    });

    requestFn();
  };

  const onClickNumber = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const value = Number(e.currentTarget.textContent) - 1;
    console.log(value);
    setPageInfo((pageInfo) => {
      if (pageInfo !== null) return { ...pageInfo, page: value };
      return pageInfo;
    });

    requestFn();
  };

  return (
    pageInfo && (
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
          ${item === pageInfo.page + 1 ? "bg-secondary text-white" : ""}`}
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
    )
  );
}

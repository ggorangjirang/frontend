import { useState } from "react";

type Props = {
  limit: number;
  current: number;
  totalPage: number;
  pageSize: number;
};

const generateArray = ({ totalPage, limit, current }: { totalPage: 17; limit: 5; current: 3 }) => {
  const arr = Array.from({ length: totalPage }, (_, i) => i + 1);
  const slicedArray = Array(Math.ceil(totalPage / limit))
    .fill(0)
    .map(() => arr.splice(0, limit));

  const selected = Math.floor(current / limit);
  return slicedArray[selected];
};

export default function Pagenation({ limit, current = 3, totalPage, pageSize }: Props) {
  const [page, setPage] = useState();
  const numbers = generateArray({ totalPage: 17, limit: 5, current: 3 });

  console.log(numbers);
  console.log(current);
  return (
    <div className="my-8 flex h-8 w-full flex-row items-center justify-center">
      <div className="flex h-8 w-8 items-center justify-center rounded-full hover:cursor-pointer hover:bg-secondary hover:text-white">
        {`<`}
      </div>
      {numbers.map((item) => (
        <div
          key={item}
          className={`mx-2 flex h-8 w-8 items-center justify-center rounded-full 
          hover:cursor-pointer hover:bg-secondary hover:text-white 
          ${item === current ? "bg-secondary text-white" : ""}`}
        >
          {item}
        </div>
      ))}
      <div
        className="flex h-8 w-8 items-center justify-center rounded-full 
      hover:cursor-pointer hover:bg-secondary hover:text-white"
      >
        {`>`}
      </div>
    </div>
  );
}

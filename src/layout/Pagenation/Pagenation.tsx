import { useState } from "react";

type Props = {
  limit: number;
  current: number;
  totalPage: number;
  pageSize: number;
};

const generateArray = ({ totalPage: 17, limit: 5, current: 3  }) => {
  const arr = Array.from({ length: limit }, (_, i) => i + 1);
  const slicedArray = Array(Math.ceil(totalPage / limit))
    .fill(0)
    .map(() => arr.splice(0, limit));

  console.log(slicedArray);
  return slicedArray;
};

export default function Pagenation({ limit, current, totalPage, pageSize }: Props) {
  const [page, setPage] = useState();
  const numbers = generateArray({ totalPage: 17, limit: 5, current: 3 });

  return (
    <div className="h-full, my-8 flex w-full flex-row justify-center align-middle">
      <div className="mx-3 hover:cursor-pointer">{`<`} </div>
      {}
      <div className="mx-3 hover:cursor-pointer">1</div>
      <div className="mx-3 hover:cursor-pointer">2</div>
      <div className="mx-3 hover:cursor-pointer">3</div>
      <div className="mx-3 hover:cursor-pointer">4</div>
      <div className="mx-3 hover:cursor-pointer">5</div>
      <div className="mx-3 hover:cursor-pointer">{`>`} </div>
    </div>
  );
}

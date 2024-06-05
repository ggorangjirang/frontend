import Image from "next/image";
const BoughtElement = ({ temp }: any) => {
  return (
    <>
      <div className="flex flex-row">
        <Image
          className="my-[19px] mr-[19px] flex items-center justify-center bg-gray-border"
          src={temp.img}
          alt=""
          width={75}
          height={75}
        />
        <div className="mt-[19px] flex flex-col">
          <div className="mb-[3px] text-texttitle font-semibold text-primary">{temp.title}</div>
          <div className="mb-[3px] text-textsmall font-medium text-gray">{temp.description}</div>
          <div className="text-textsmall font-medium text-gray">수량: {temp.count}개</div>
        </div>
      </div>
      <div className="h-[1px] w-full border border-gray-border" />
    </>
  );
};
export default BoughtElement;

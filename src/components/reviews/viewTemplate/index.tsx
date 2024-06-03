import { Button } from "@/components/common/button";

const ViewTemplate = () => {
  return (
    <div className="flex flex-col">
      <div className="mb-[14px] flex">
        <div>제목</div>
        <div>내용</div>
      </div>
      <div className="flex">
        <div className="mr-[12px] flex flex-col">
          <div className="mb-[12px] h-[170px] w-[170px] bg-gray-border">+</div>
          <div>
            <Button value="등록" size="review" type="button" className="border-none text-white" />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="mr-[12px]">제목</div>
          <div>내용</div>
        </div>
      </div>
    </div>
  );
};
export default ViewTemplate;

import { Plus } from "@/assets/index.mjs";
import { ButtonPrimary } from "../common/Buttons/ButtonIcon";
import Input from "@/components/common/input";
import { wrapFormAsync } from "@/utils/asyncFunc";
import { useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRecoilState } from "recoil";
import { isWriteState } from "@/recoil/atoms/authState";

interface ReviewData {
  title: string;
  content: string;
}

const ViewTemplate = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const { register, handleSubmit } = useForm<ReviewData>();
  const [isWrite] = useRecoilState(isWriteState);
  const onSubmitReview: SubmitHandler<ReviewData> = async (data: ReviewData): Promise<void> => {
    console.log(data);
  };

  // value 값은 input에 value?. 으로
  return (
    <div className="flex flex-col">
      <div className="mb-[14px] flex h-auto">
        <p className="mr-[12px] text-texttitle font-semibold text-primary">제목</p>
        <p className="text-textsmall font-medium leading-[33px] text-gray">내용</p>
      </div>
      <form onSubmit={wrapFormAsync(handleSubmit(onSubmitReview))} className="flex">
        <div className="mr-[12px] flex flex-col justify-center">
          <div
            className="mb-[12px] flex h-[170px] w-[170px] items-center justify-center bg-gray-border"
            onClick={() => {
              fileRef.current?.click();
            }}
          >
            <Plus width={100} height={100} />
          </div>
          <input type="file" className="hidden" ref={fileRef} />
          <div>
            {isWrite ? (
              <ButtonPrimary value="등록" size="review" type="submit" className="border-none text-white" />
            ) : (
              <>
                <ButtonPrimary value="수정" size="edit" type="submit" className="mr-[12px] border-none text-white " />
                <ButtonPrimary
                  value="삭제"
                  size="edit"
                  type="submit"
                  className="border border-gray-border bg-white text-secondary"
                />
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="mr-[12px]">
            <Input
              required={true}
              type="text"
              placeholder="제목을 입력하세요."
              className="mb-[12px] h-[40px] w-[823px] pl-[12px] text-texttitle"
              register={register("title")}
            />
          </div>
          <div>
            <Input
              required={true}
              type="text"
              placeholder="내용을 입력하세요."
              className="h-[168px] w-[823px] pl-[12px]"
              register={register("content")}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
export default ViewTemplate;

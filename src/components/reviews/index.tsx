import { Plus } from "@/assets/index.mjs";
import { ButtonPrimary } from "../common/Buttons/ButtonIcon";
import Input from "@/components/common/input";
import { wrapFormAsync } from "@/utils/asyncFunc";
import { useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRecoilState } from "recoil";
import { isWriteState } from "@/recoil/atoms/authState";
import { postReview, ReviewableProduct, getReview, postReviewRequest, getReviewResponse } from "@/apis/review";
import Image from "next/image";

interface Props {
  product: ReviewableProduct | getReviewResponse;
}

const ViewTemplate = ({ product }: Props) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const { register, handleSubmit, setValue } = useForm<postReviewRequest>();
  const [isWrite] = useRecoilState(isWriteState);
  const [profileImage, setProfileImage] = useState<File | null>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setProfileImage(e.target.files[0]);
      setValue("profileImage", e.target.files[0]); // setValue로 React Hook Form에 파일 설정
    }
  };

  const onSubmitReview: SubmitHandler<postReviewRequest> = async (data: postReviewRequest): Promise<void> => {
    try {
      console.log(data);
      const review = {
        title: data.title,
        content: data.content,
        productId: product.productId,
      };

      const formData = new FormData();
      formData.append("review", JSON.stringify(review));

      if (profileImage) formData.append("profileImage", profileImage);

      const response = await postReview(formData); // postReview가 FormData를 받을 수 있게 수정 필요
      console.log("User signed up successfully:", response);
    } catch (error) {
      console.error("Error signing up user:", error);
    }
  };
  return (
    product && (
      <div className="flex flex-col">
        <div className="mb-[14px] flex h-auto">
          <p className="mr-[12px] text-texttitle font-semibold text-primary">상품</p>
          <p className="text-xl font-medium leading-[33px] text-gray">{product.productName}</p>
        </div>
        <form onSubmit={wrapFormAsync(handleSubmit(onSubmitReview))} className="flex">
          <div className="mr-[12px] flex flex-col justify-center">
            {"reviewId" in product ? (
              <Image
                src={"/imgs/logos/logo1.png"}
                width={170}
                height={170}
                alt="img"
                className="mb-[12px] flex h-[170px] w-[170px] items-center justify-center"
                onClick={() => {
                  fileRef.current?.click();
                }}
              ></Image>
            ) : (
              <div
                className="mb-[12px] flex h-[170px] w-[170px] items-center justify-center bg-gray-border"
                onClick={() => {
                  fileRef.current?.click();
                }}
              >
                <Plus width={100} height={100} />
              </div>
            )}
            <input
              type="file"
              className="hidden"
              name="profileImage"
              ref={fileRef}
              onChange={handleFileChange}
              accept="image/*"
            />
            <div>
              {isWrite ? (
                <ButtonPrimary value="등록" size="review" type="submit" className="border-none text-white" />
              ) : (
                <div className="flex items-center justify-between">
                  <ButtonPrimary value="수정" size="edit" type="submit" className="mr-[12px] border-none text-white " />
                  <ButtonPrimary
                    value="삭제"
                    size="edit"
                    type="submit"
                    className="border border-gray-border bg-white text-secondary"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="mr-[12px]">
              <Input
                required={true}
                type="text"
                defaultValue={"reviewId" in product ? product.title : ""}
                placeholder="제목을 입력하세요."
                className="mb-[12px] h-[40px] w-[823px] pl-[12px] text-texttitle"
                register={register("title")}
              />
            </div>
            <div>
              <Input
                required={true}
                type="text"
                defaultValue={"reviewId" in product ? product.content : ""}
                placeholder="내용을 입력하세요."
                className="h-[168px] w-[823px] pl-[12px]"
                register={register("content")}
              />
            </div>
          </div>
        </form>
      </div>
    )
  );
};
export default ViewTemplate;

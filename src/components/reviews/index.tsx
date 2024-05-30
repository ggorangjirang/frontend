"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRecoilState } from "recoil";
import { isWriteState } from "@/recoil/atoms/authState";
import Message from "../common/message";

interface ReviewData {
  title: string;
}
const ViewDivision = () => {
  const { register, handleSubmit } = useForm<ReviewData>();
  const [isWrite] = useRecoilState(isWriteState);
  return (
    <div className="mb-[20px] h-auto w-[82.5%] rounded-[12px] border border-gray-border p-[2%]">
      {!isWrite ? (
        <div>{true ? <div>r</div> : <Message text="아직 남긴 상품 후기가 없습니다." />}</div>
      ) : (
        <div>{true ? <div>w</div> : <Message text="아직 구매한 상품이 없습니다." />}</div>
      )}
    </div>
  );
};
export default ViewDivision;

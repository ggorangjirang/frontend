"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRecoilState } from "recoil";
import { isWriteState } from "@/recoil/atoms/authState";
import Message from "../common/message";
import ViewTemplate from "./viewTemplate";

interface ReviewData {
  title: string;
}
const ViewDivision = () => {
  const { register, handleSubmit } = useForm<ReviewData>();
  const [isWrite] = useRecoilState(isWriteState);
  return (
    <div className="mb-[20px] h-auto w-[1055px] rounded-[12px] border border-gray-border px-[2%] py-[1%]">
      {!isWrite ? (
        <div>{true ? <ViewTemplate /> : <Message text="아직 남긴 상품 후기가 없습니다." />}</div>
      ) : (
        <div>{true ? <ViewTemplate /> : <Message text="아직 구매한 상품이 없습니다." />}</div>
      )}
    </div>
  );
};
export default ViewDivision;

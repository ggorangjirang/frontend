import { Review } from "@/apis/product";
import { formatDate, formatTime } from "@/utils/time";
import TextMedium from "../common/labels/TextMedium";
import Image from "next/image";

type Props = {
  review: Review;
};

export default function ProductReview({ review }: Props) {
  return (
    <div className="grid  h-[180px] w-full grid-cols-[1fr_3fr_1fr] justify-center rounded-lg border border-gray px-10 py-7">
      <div className="flex flex-col items-start ">
        <div className="text-sm text-gray">{review.emailResponse}</div>
        <div className="text-sm text-gray">{`${formatDate(review.createdAt)} ${formatTime(review.createdAt)}`}</div>
      </div>
      <div className="border-l border-l-gray-border px-5">
        <TextMedium style={{ fontWeight: "bold" }}>{review.title}</TextMedium>
        <div className="">{review.content}</div>
      </div>
      <div className="h-[160px] w-[160px] rounded-lg" style={{ width: "100%", height: "100%", position: "relative" }}>
        {review.imageUrl ? <Image src="testImg.png" width={0} height={0} fill alt="testImg" objectFit="cover" /> : ""}
      </div>
    </div>
  );
}

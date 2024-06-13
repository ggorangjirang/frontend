"use client";
import { ButtonPrimary } from "@/components/common/Buttons/ButtonIcon";
import MyPageTab from "@/components/common/tab";
import PageWrapper from "@/layout/Wrapper/PageWrapper";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { isWriteState } from "@/recoil/atoms/authState";
import ViewTemplate from "@/components/reviews";
import Message from "@/components/common/message";
import { useEffect, useState } from "react";
import { getReview, getReviewable, getReviewableItemPageable } from "@/apis/review";
import { PageInfo } from "@/layout/Pagenation/Pagination";

type Props = {
  route: "write" | "view";
};

const ViewComponent = ({ route }: Props) => {
  const [isWrite] = useRecoilState(isWriteState);
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);
  const [reviews, setReviews] = useState<getReviewableItemPageable>();
  const buttons = [
    {
      href: "/mypage/write",
      value: "작성하기",
      primary: isWrite,
    },
    {
      href: "/mypage/view",
      value: "내가 쓴 후기 보기",
      primary: !isWrite,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const targetPage = pageInfo?.page ?? 0;
        let data;

        if (route === "write") data = (await getReviewable(targetPage)).data;
        if (route === "view") data = (await getReview(targetPage)).data;
        const targetPageInfo = {
          page: data!.pageable.pageNumber,
          totalPages: data!.totalPages,
          totalElements: data!.totalElements,
        };
        setPageInfo(targetPageInfo);
        setReviews(data);
      } catch (error) {
        console.log(error);

        console.log(error);
      }
    };

    fetchData();
  }, [pageInfo?.page, route]);

  return (
    reviews &&
    reviews.content && (
      <>
        <div className="absolute mt-[24px] flex h-auto w-[1440px]">
          <MyPageTab />
          <div className="ml-[41px] w-[73%]">
            <p className="mb-[26px] text-texttitle font-semibold text-primary">상품 후기</p>
            <div>
              {buttons.map(({ href, value, primary }) => (
                <Link key={href} href={href}>
                  <ButtonPrimary
                    value={value}
                    size="mypage"
                    type="button"
                    className={`mr-[18px] ${primary ? "text-white" : "border border-gray-border bg-white text-secondary"}`}
                  />
                </Link>
              ))}
            </div>
            {/* // 남긴 상품 있을 경우 조건 나중에 추가 예정 / 임시로 true가 설정
            //   <div>{true ? <ViewTemplate /> : <Message text="아직 남긴 상품 후기가 없습니다." />}</div>
            // ) :  */}
            {reviews?.content.length > 0 ? (
              reviews?.content.map((review) => (
                // 여기는 작성 페이지
                <div
                  className="mb-[20px] h-auto w-[1055px] rounded-[12px] border border-gray-border px-[2%] py-[1%]"
                  key={review.productId}
                >
                  {route === "write" ? (
                    <ViewTemplate key={review.productId} product={review} />
                  ) : (
                    <ViewTemplate key={review.productId} product={review}></ViewTemplate>
                  )}
                </div>
              ))
            ) : (
              <Message text={route === "write" ? "아직 구매한 상품이 없습니다." : "아직 작성한 리뷰가 없습니다."} />
            )}
          </div>
        </div>
      </>
    )
  );
};

export default ViewComponent;

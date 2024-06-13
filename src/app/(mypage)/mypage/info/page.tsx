import MyPageInfoComponent from "@/components/mypage/info";
import PageWrapper from "@/layout/Wrapper/PageWrapper";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export default function Info({ children }: Props) {
  return (
    <PageWrapper>
      <div className="flex w-full flex-row gap-8 ">
        <MyPageInfoComponent />
      </div>
    </PageWrapper>
  );
}

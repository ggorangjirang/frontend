import MyPageInfoComponent from "@/components/mypage/info";
import PageWrapper from "@/layout/Wrapper/PageWrapper";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <PageWrapper>
      <div className="flex w-full flex-row gap-8 ">{children}</div>
    </PageWrapper>
  );
}

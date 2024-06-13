import { ReactNode } from "react";
import PageWrapper from "@/layout/Wrapper/PageWrapper";

type Props = {
  children: ReactNode;
};

export default function layout({ children }: Props) {
  return (
    <PageWrapper>
      <div className="flex w-full flex-row gap-8 ">{children}</div>
    </PageWrapper>
  );
}

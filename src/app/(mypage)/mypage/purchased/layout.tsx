import PageWrapper from "@/layout/Wrapper/PageWrapper";
import React, { ReactNode } from "react";

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

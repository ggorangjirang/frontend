import Wrapper from "@/layout/Wrapper";
import React, { ReactNode } from "react";
import Header from "@/layout/Header";
import PageWrapper from "@/layout/Wrapper/PageWrapper";

interface Props {
  children: ReactNode;
}

export default function layout({ children }: Readonly<Props>) {
  return (
    <Wrapper>
      <Header />
      <div className="flex justify-center">
        <PageWrapper>{children}</PageWrapper>
      </div>
    </Wrapper>
  );
}

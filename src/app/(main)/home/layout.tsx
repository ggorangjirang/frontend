import Wrapper from "@/layout/Wrapper";
import React, { ReactNode } from "react";
import Header from "@/layout/Header";

interface Props {
  children: ReactNode;
}

export default function layout({ children }: Readonly<Props>) {
  return (
    <Wrapper>
      <Header />
      {children}
    </Wrapper>
  );
}

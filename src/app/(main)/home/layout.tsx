"use client";
import Wrapper from "@/layout/Wrapper";
import React, { ReactNode, useState } from "react";
import Header from "@/layout/Header";
import PageWrapper from "@/layout/Wrapper/PageWrapper";

interface Props {
  children: ReactNode;
}

export default function layout({ children }: Readonly<Props>) {
  const [hover, setHover] = useState<boolean>(false);
  return (
    <Wrapper>
    <div className={`flex justify-center `}>
        <PageWrapper>{children}</PageWrapper>
      </div>
    </Wrapper>
  );
}

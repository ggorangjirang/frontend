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
      <div className="relative">
        <Header setHover={setHover} />
        <div
          className={`absolute top-full z-30 flex h-[8740px] w-full  transition-opacity delay-150 duration-300 ease-in-out ${hover ? "bg-black  opacity-75" : " bg-black  opacity-0 "} `}
          style={{ transitionProperty: "opacity, visibility" }}
        ></div>
      </div>
      <div className={`flex justify-center `}>
        <PageWrapper>{children}</PageWrapper>
      </div>
    </Wrapper>
  );
}

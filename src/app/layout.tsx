import Provider from "@/layout/Provider";
import "./globals.css";
import { pretendard } from "@/assets/font";
import Wrapper from "@/layout/Wrapper";
import React, { useState } from "react";
import Header from "@/layout/Header";
import { DefaultLayoutProps } from "@/components/common/type/LayoutType";

export default function RootLayout({ children }: Readonly<DefaultLayoutProps>) {
  //질문, 레이아웃이 클라이언트 컴포넌트여도 되는가, 다른 방법 없는가..
  return (
    <html lang="ko" className={pretendard.variable}>
      <body className="h-full font-pretendard">
        <Provider>
          <Wrapper>
            <Header />
            {children}
          </Wrapper>
        </Provider>
      </body>
    </html>
  );
}

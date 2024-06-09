import Provider from "@/layout/Provider/Provider";
import "./globals.css";
import { pretendard } from "@/assets/font";
import Wrapper from "@/layout/Wrapper/Wrapper";
import Header from "@/layout/Header/Header";
import { ReactNode, Suspense } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  //질문, 레이아웃이 클라이언트 컴포넌트여도 되는가, 다른 방법 없는가..

  return (
    <html lang="ko" className={pretendard.variable}>
      <body className="h-full font-pretendard">
        <Provider>
          <Wrapper>
            <Suspense fallback={""}>
              <Header />
            </Suspense>
            {children}
          </Wrapper>
        </Provider>
      </body>
    </html>
  );
}

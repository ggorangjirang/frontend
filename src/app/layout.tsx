import Provider from "@/layout/Provider/Provider";
import "./globals.css";
import { pretendard } from "@/assets/font";
import Wrapper from "@/layout/Wrapper/Wrapper";
import Header from "@/layout/Header/Header";
import { ReactNode, Suspense } from "react";

export const metadata = {
  title: "꼬랑지랑",
  description: "elice 프로젝트 6팀",
  icons: {
    icon: "ggrjrfavicon.ico",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body className="h-full font-pretendard">
        <Provider>
          <Wrapper>
            <Suspense fallback={<div>로딩중입니다.. 잠시만 기다려주세요</div>}>
              <Header />
            </Suspense>
            {children}
          </Wrapper>
        </Provider>
      </body>
    </html>
  );
}

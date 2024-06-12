import Provider from "@/layout/Provider/Provider";
import "./globals.css";
import { pretendard } from "@/assets/font";
import Wrapper from "@/layout/Wrapper/Wrapper";
import Header from "@/layout/Header/Header";
import { ReactNode, Suspense } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";


export default function RootLayout({ children }: { children: ReactNode }) {
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

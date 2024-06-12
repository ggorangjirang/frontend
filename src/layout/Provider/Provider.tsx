"use client";
import useWebSocket from "@/hooks/useWebSocket";
import { ReactNode, useEffect } from "react";
import { Bounce, ToastContainer } from "react-toastify";
import { RecoilRoot } from "recoil";
interface Props {
  children: ReactNode;
}

export default function Provider({ children }: Props) {
  const data = useWebSocket("https://ggorangjirang.duckdns.org:8080/ws"); // Spring Boot 서버 URL
  useEffect(() => {
    if (data) {
      data.activate();
    }
    return () => {
      if (data) {
        data.deactivate();
      }
    };
  }, [data]);

  data;
  return (
    <RecoilRoot>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div>{children}</div>
    </RecoilRoot>
  );
}

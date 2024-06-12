"use client";

import { useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { CompatClient, Stomp } from "@stomp/stompjs";
import { toast } from "react-toastify";

const useWebSocket = (url: string) => {
  const stompClientRef = useRef<Client | null>(null);
  console.log(url);
  useEffect(() => {
    const token = window.localStorage.getItem("accessToken");

    const stompClient = new Client({
      brokerURL: "wss://ggorangjirang.duckdns.org/ws",
      beforeConnect: () => {
        console.log("beforeConnect");
      },
      connectHeaders: {
        Authorization: `Bearer ${token}`, // 우리 프로젝트의 경우 토큰이 없으면 보안에 걸려서 헤더 함께 보낸다
      },
      debug: (str) => {
        console.log(str);
      },
      reconnectDelay: 50000, // 자동 재연결
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });
    // const stompClient = new Client({

    // });

    //연결시
    stompClient.onConnect = () => {
      console.log("Connected");
      stompClient.subscribe(
        "/user/queue/updateDeliveryStatus",
        (message) => {
          console.log("Message received:", message.body);
          toast.info(`message Receive : ${message.body}`);
        },
        { Authorization: `Bearer ${token}` }
      );
    };

    //에러 수신시
    stompClient.onStompError = (frame) => {
      console.error("Broker reported error: " + frame.headers["message"]);
      console.error("Additional details: " + frame.body);
    };

    //구독 활성화
    stompClient.activate();
    //서버에 연결
    stompClientRef.current = stompClient;

    // 컴포넌트 언마운트 시 소켓 연결 해제
    return () => {
      stompClient.deactivate();
    };
  }, []);

  return stompClientRef.current;
};

export default useWebSocket;

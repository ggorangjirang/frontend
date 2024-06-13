"use client";

import { useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import { toast } from "react-toastify";

const useWebSocket = (userId: number, url: string) => {
  const stompClientRef = useRef<Client | null>(null);
  useEffect(() => {
    const token = window.localStorage.getItem("accessToken");
    console.log("token", token);
    const stompClient = new Client({
      brokerURL: "wss://ggorangjirang.duckdns.org/ws",
      beforeConnect: () => {
        console.log("beforeConnect");
      },
      connectHeaders: {
        Authorization: `${token}`, // 우리 프로젝트의 경우 토큰이 없으면 보안에 걸려서 헤더 함께 보낸다
      },
      debug: (str) => {
        // console.log(str);
      },
      reconnectDelay: 50000, // 자동 재연결
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    if (token) {
      // const stompClient = new Client({

      // });

      //연결시
      stompClient.onConnect = () => {
        console.log("Connected");
        stompClient.subscribe(
          `/user/${userId}/queue/updateDeliveryStatus`,
          (message) => {
            toast(`message Receive : ${message.body}`);
          },
          { Authorization: `${token}` }
        );
      };
    }
    //에러 수신시
    stompClient.onStompError = (frame) => {
      console.error("Broker reported error: " + frame.headers["message"]);
      console.error("Additional details: " + frame.body);
    };

    stompClient.onDisconnect = () => {
      console.log("disconeected");
    };
    //구독 활성화
    stompClient.activate();
    //서버에 연결
    stompClientRef.current = stompClient;

    if (!token) {
      console.log("deactive");
      stompClient.deactivate();
    }
    // 컴포넌트 언마운트 시 소켓 연결 해제
    return () => {
      stompClient.deactivate();
    };
  }, [userId]);

  return stompClientRef.current;
};

export default useWebSocket;

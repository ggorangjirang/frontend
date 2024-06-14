"use client";

import { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import { toast } from "react-toastify";

// 사용자 ID를 가져오는 비동기 함수
const fetchUserId = async (): Promise<number> => {
  const token = localStorage.getItem("accessToken");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = token;
  }

  const response = await fetch("https://ggorangjirang.duckdns.org/api/users/id", {
    method: "GET",
    headers: headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user ID");
  }

  const data = await response.json();
  return data;
};

const useWebSocket = (url: string) => {
  const stompClientRef = useRef<Client | null>(null);
  const isInitialized = useRef<boolean>(false);

  useEffect(() => {
    const initializeWebSocket = async () => {
      if (isInitialized.current) return;

      try {
        const id = await fetchUserId();

        const token = window.localStorage.getItem("accessToken");
        const stompClient = new Client({
          brokerURL: url,

          beforeConnect: () => {
            console.log("beforeConnect");
          },
          connectHeaders: {
            Authorization: token || "", // token 값이 존재하지 않으면 빈 문자열 사용
          },
          debug: (str) => {
            console.log(str);
          },
          reconnectDelay: 5000, // 자동 재연결
          heartbeatIncoming: 4000,
          heartbeatOutgoing: 4000,
        });

        if (token) {
          // const stompClient = new Client({

          // });

          //연결시
          stompClient.onConnect = () => {
            console.log("Connected");
            if (id !== null) {
              stompClient.subscribe(
                `/user/${id}/queue/bellDeliveryStatus`,
                (message) => {
                  toast.info(`message Receive : ${message.body}`);
                },
                { Authorization: token || "" }
              );
            }
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
        isInitialized.current = true; // WebSocket 초기화 완료 상태로 설정

        if (!token) {
          console.log("deactive");
          stompClient.deactivate();
        }
        // 컴포넌트 언마운트 시 소켓 연결 해제
        return () => {
          if (stompClientRef.current) {
            stompClient.deactivate();
            stompClientRef.current = null;
            isInitialized.current = false;
          }
        };
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };
    initializeWebSocket();
  }, [url]);

  return stompClientRef.current;
};

export default useWebSocket;

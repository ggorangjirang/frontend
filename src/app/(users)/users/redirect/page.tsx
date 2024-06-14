"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const RedirectPage = () => {
  const [token, setToken] = useState<string | string[]>("");
  const router = useRouter();
  useEffect(() => {
    let token = new URL(window.location.href).searchParams.get("code");
    if (token) {
      setToken(token);
      localStorage.setItem("accessToken", token);
      router.push("/");
    }
  }, []);

  return <div>Loading...</div>;
};

export default RedirectPage;

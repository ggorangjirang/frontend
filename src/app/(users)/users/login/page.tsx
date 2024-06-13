import LoginComponent from "@/components/users/login";
import { Suspense } from "react";

export default function Login() {
  return (
    <Suspense>
      <LoginComponent />
    </Suspense>
  );
}

import BuyingComponent from "@/components/buying";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense>
      <BuyingComponent />
    </Suspense>
  );
}

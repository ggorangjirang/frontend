import { ReactNode } from "react";

export default function ProductInfo({ children }: { children: ReactNode }) {
  return <div className="flex flex-row items-center gap-10">{children}</div>;
}

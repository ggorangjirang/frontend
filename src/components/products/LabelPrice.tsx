import { ReactNode } from "react";

export default function LabelPrice({ children }: { children: ReactNode }) {
  return <div className="text-[18px] font-bold text-price">{children}</div>;
}

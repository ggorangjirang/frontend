import { ReactNode } from "react";

export default function ProductTitleLabel({ children }: { children: ReactNode }) {
  return <div className="mb-7 mt-8 text-2xl font-bold text-text">{children}</div>;
}

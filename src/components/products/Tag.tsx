import { ReactNode } from "react";

export default function Tag({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-center border border-gray-border px-2 py-1 text-[12px] text-gray">
      {children}
    </div>
  );
}

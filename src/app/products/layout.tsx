import { ReactNode, Suspense } from "react";

export default function ProductsLayout({ children }: { children: ReactNode }) {
  // 추후 서스펜스에 스켈레톤 또는 로딩 문구 넣기
  return (
    <div>
      <Suspense>{children}</Suspense>
    </div>
  );
}

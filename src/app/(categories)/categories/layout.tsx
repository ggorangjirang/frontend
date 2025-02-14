import { ReactNode, Suspense } from "react";
import PageWrapper from "@/layout/Wrapper/PageWrapper";

export default function CategoriesLayout({ children }: { children: ReactNode }) {
  return (
    <PageWrapper>
      <Suspense>
        <div className="mt-8 flex w-full flex-row gap-8 ">{children}</div>
      </Suspense>
    </PageWrapper>
  );
}

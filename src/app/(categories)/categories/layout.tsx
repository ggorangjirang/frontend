import { ReactNode } from "react";
import PageWrapper from "@/layout/Wrapper/PageWrapper";
import { FILTERS } from "@/constants/filterConfig";
import SideBar from "@/components/products/SideBar";

const categories = {
  main: "전체",
  subCategories: ["강아지 사료", "고양이 사료"],
};

export default function CategoriesLayout({ children }: { children: ReactNode }) {
  return (
    <PageWrapper>
      <div className="mt-8 flex w-full flex-row gap-8 ">
      
        {children}
      </div>
    </PageWrapper>
  );
}

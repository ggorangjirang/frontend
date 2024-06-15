"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
const MyPageTab = () => {
  const pathName = usePathname();

  const tabItems = [
    { name: "내 활동", path: "x" },
    { name: "상품 후기", path: "/mypage/view" },
    { name: "개인정보 변경", path: "/mypage/info" },
    { name: "주문/배송", path: "/mypage/purchased" },
  ];

  return (
    tabItems && (
      <div className="ml-[9px] flex h-full w-[239px] flex-col rounded-[12px] border border-gray-border pl-[8px] pt-[9px]">
        <p className="mb-[5px] text-texttitle font-semibold text-primary">{tabItems[0].name}</p>
        {tabItems.slice(1, 3).map((item, index) => (
          <Link key={index} href={item.path}>
            <p
              className={`text-textmedium ${pathName.includes(item.path) ? "text-primary" : "text-secondary"} mb-[9px] cursor-pointer font-medium hover:font-bold`}
            >
              {item.name}
            </p>
          </Link>
        ))}
        <div className=" mb-[5px] h-[1px] w-[222px] bg-gray-border " />
        <Link href={tabItems[3].path}>
          <p
            className={`align-middle ${pathName.includes(tabItems[3].path) ? "text-warning" : "text-secondary"} py-2 text-textmedium font-bold`}
          >
            {tabItems[3].name}
          </p>
        </Link>
      </div>
    )
  );
};

export default MyPageTab;

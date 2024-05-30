import { usePathname } from "next/navigation";
import Link from "next/link";
const MyPageTab = () => {
  const pathName = usePathname();

  const tabItems = [
    { name: "내 활동", path: "x" },
    { name: "최근 본 상품", path: "/mypage/recent" },
    { name: "상품 후기", path: "/mypage/view" },
    { name: "개인정보 변경", path: "/mypage/info" },
    { name: "주문/배송", path: "/mypage/purchased" },
  ];

  return (
    <div className="ml-[9px] flex h-[193px] w-[239px] flex-col rounded-[12px] border border-gray-border pl-[8px] pt-[9px]">
      <p className="mb-[5px] text-texttitle font-semibold text-primary">{tabItems[0].name}</p>
      {tabItems.slice(1, 4).map((item, index) => (
        <Link key={index} href={item.path}>
          <p
            className={`text-textmedium ${pathName.includes(item.path) ? "text-primary" : "text-secondary"} mb-[9px] cursor-pointer font-medium hover:font-bold`}
          >
            {item.name}
          </p>
        </Link>
      ))}
      <div className=" mb-[5px] h-[1px] w-[222px] bg-gray-border" />
      <Link href={tabItems[4].path}>
        <p
          className={`text-primary ${pathName.includes(tabItems[4].path) ? "text-warning" : ""}text-texttitle  font-semibold `}
        >
          {tabItems[4].name}
        </p>
      </Link>
    </div>
  );
};

export default MyPageTab;

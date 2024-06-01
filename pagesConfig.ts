//라우팅 주소에 따라 헤더가 보일지 안보일지 관리하는 파일입니다.

type PageConfig = {
  showHeader: boolean;
  title: string;
};

export const pageConfig: Record<string, PageConfig> = {
  "/": {
    showHeader: true,
    title: "홈페이지",
  },
  "/users": {
    showHeader: false,
    title: "유저 페이지",
  },
  "/categories": {
    showHeader: true,
    title: "카테고리 리스트 페이지",
  },
  "/products": {
    showHeader: true,
    title: "상품 상세 페이지",
  },
};

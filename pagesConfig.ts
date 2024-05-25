//라우팅 주소에 따라 헤더가 보일지 안보일지 관리하는 파일입니다.

type PageConfig = {
    showHeader :boolean,
    title:string
}

export const pageConfig: Record<string, PageConfig> = {
    "/": {
        showHeader: true,
        title: "홈페이지",
    },
    "/users": {
        showHeader: false,
        title: "유저 페이지",
    },
};
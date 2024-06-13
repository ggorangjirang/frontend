import MyPageInfoComponent from "@/components/mypage/info";
import PageWrapper from "@/layout/Wrapper/PageWrapper";

export default function Info() {
  return (
    <PageWrapper>
      <div className="flex w-full flex-row gap-8 ">
        <MyPageInfoComponent />
      </div>
    </PageWrapper>
  );
}

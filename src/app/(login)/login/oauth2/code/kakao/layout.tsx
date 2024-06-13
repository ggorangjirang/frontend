import { ReactNode, Suspense } from "react";

type Props = {
  children: ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <Suspense>
      <div>{children}</div>
    </Suspense>
  );
};

export default layout;

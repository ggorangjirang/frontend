import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Readonly<Props>) {
  return <>{children}</>;
}

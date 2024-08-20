import { PropsWithChildren } from "react";

const AppLayout = ({ children }: PropsWithChildren) => {
  return <main className="h-[100vh]">{children}</main>;
};

export default AppLayout;

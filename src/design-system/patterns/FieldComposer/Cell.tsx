import { PropsWithChildren } from "react";

import { Flex } from "@/design-system/layout/Flex/Flex";

type CellProps = PropsWithChildren<{}>;
function Cell({ children }: CellProps) {
  return <Flex className="min-w-[240px]">{children}</Flex>;
}

export default Cell;

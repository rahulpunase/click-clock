import { PropsWithChildren } from "react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { cn } from "@/design-system/utils/utils";

import styles from "./CellWrapper.module.scss";

const CellWrapper = ({ children }: PropsWithChildren) => {
  return (
    <Flex
      data-component="cell-wrapper"
      className={cn(
        "py-1 px-2 pr-4 w-full border border-background hover:border-accent-border rounded-sm",
        styles.cellWrapper,
      )}
    >
      {children}
    </Flex>
  );
};

export default CellWrapper;

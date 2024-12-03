import { PropsWithChildren } from "react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import Cell from "@/design-system/patterns/FieldComposer/Cell";
import DataList from "@/design-system/patterns/FieldComposer/DataList";

type FieldComposerProps = PropsWithChildren<{}>;
const FieldComposer = Object.assign(
  ({ children }: FieldComposerProps) => {
    return <Flex>{children}</Flex>;
  },
  {
    displayName: "FieldComposer",
    DataList,
    Cell,
  },
);

export default FieldComposer;

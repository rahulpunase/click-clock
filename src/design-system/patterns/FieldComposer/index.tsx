import { PropsWithChildren } from "react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import Cell from "@/design-system/patterns/FieldComposer/Cell";
import DataList from "@/design-system/patterns/FieldComposer/DataList";
import SelectField from "@/design-system/patterns/FieldComposer/fieldComponents/SelectField";
import TextField from "@/design-system/patterns/FieldComposer/fieldComponents/TextField";

type FieldComposerProps = PropsWithChildren<{}>;
const FieldComposer = Object.assign(
  ({ children }: FieldComposerProps) => {
    return <Flex className="w-full">{children}</Flex>;
  },
  {
    displayName: "FieldComposer",
    DataList,
    Cell,
    TextField,
    SelectField,
  },
);

export default FieldComposer;

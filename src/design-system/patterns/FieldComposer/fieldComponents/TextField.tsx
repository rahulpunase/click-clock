import { PropsWithChildren } from "react";

import { useDataListContext } from "@/design-system/patterns/FieldComposer/DataListContext";
import InlinePopover from "@/design-system/patterns/FieldComposer/fieldComponents/InlinePopover";

type TextFieldProps = PropsWithChildren;
const TextField = ({ children }: TextFieldProps) => {
  const context = useDataListContext();
  return (
    <InlinePopover open={context?.editing} setEditing={context?.setEditing}>
      {children}
    </InlinePopover>
  );
};

export default TextField;

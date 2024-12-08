import { ComponentProps } from "react";

import { useFieldContext } from "@/design-system/patterns/FieldComposer/FieldContext";
import MultiSelectCombo from "@/design-system/ui/MultiSelectCombo/MultiSelectCombo";

const SelectCombo = ({ ...props }: ComponentProps<typeof MultiSelectCombo>) => {
  const context = useFieldContext();

  return (
    <MultiSelectCombo
      defaultOpen={context?.editing}
      onOpenChange={context?.setEditing}
      {...props}
    />
  );
};

export default SelectCombo;

import { PropsWithChildren } from "react";

import Field from "@/design-system/patterns/FieldComposer/Field";
import DateField from "@/design-system/patterns/FieldComposer/fieldComponents/DateField";
import InputField from "@/design-system/patterns/FieldComposer/fieldComponents/InputField";
import SelectCombo from "@/design-system/patterns/FieldComposer/fieldComponents/SelectCombo";
import SelectField from "@/design-system/patterns/FieldComposer/fieldComponents/SelectField";

type FieldComposerProps = PropsWithChildren<{}>;
const FieldComposer = Object.assign(
  ({ children }: FieldComposerProps) => {
    return children;
  },
  {
    displayName: "FieldComposer",
    Field,
    Select: SelectField,
    Input: InputField,
    SelectCombo,
    DateField,
  },
);

export default FieldComposer;

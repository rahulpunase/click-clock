import { Pencil } from "lucide-react";
import { PropsWithChildren, useId, useMemo, useState } from "react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { DataListContext } from "@/design-system/patterns/FieldComposer/DataListContext";
import InputField from "@/design-system/patterns/FieldComposer/fieldComponents/InputField";
import MultilineInputField from "@/design-system/patterns/FieldComposer/fieldComponents/MultilineInputField";
import SelectField from "@/design-system/patterns/FieldComposer/fieldComponents/SelectField";
import { IconButton } from "@/design-system/ui/Button/IconButton";
import Icon, { IconName } from "@/design-system/ui/Icon/Icon";
import { Text } from "@/design-system/ui/Text/Text";
import { cn } from "@/design-system/utils/utils";

type DataListProps = PropsWithChildren<{
  label: string;
  icon?: IconName;
  value?: string;
}>;

const DataList = Object.assign(
  ({ children, label, icon, value }: DataListProps) => {
    const id = useId();
    const [editing, setEditing] = useState(false);

    const setForEditing = () => setEditing(true);

    const setForNotEditing = () => setEditing(false);

    const contextValues = useMemo(
      () => ({
        editing,
        setEditing,
      }),
      [editing, setEditing],
    );

    return (
      <DataListContext.Provider value={contextValues}>
        <Flex
          justifyContent="justify-center"
          gap="gap-6"
          role="data-list"
          className={cn("h-[40px]")}
          onClick={setForEditing}
        >
          <Flex flex="flex-1" alignItems="items-center" gap="gap-2">
            {icon && <Icon className="size-4" IconName={icon} />}
            <Text variant="body-1" as="label" for={id}>
              {label}
            </Text>
          </Flex>
          {!editing ? (
            <Flex
              className="w-[240px] border border-accent-border px-2 rounded-md bg-background"
              alignItems="items-center"
              justifyContent="justify-between"
              gap="gap-1"
            >
              {value && <Text variant="body-1">{value}</Text>}
              {!value && <Text variant="subtext-1">Click to edit</Text>}
              <IconButton
                variant="outline"
                size="xSmallIcon"
                onClick={setForEditing}
                icon={Pencil}
              />
            </Flex>
          ) : (
            <Flex
              className={cn(
                "w-[240px] h-full relative",
                editing && "shadow-md",
              )}
            >
              {children}
            </Flex>
          )}
        </Flex>
      </DataListContext.Provider>
    );
  },
  {
    displayName: "DataList",
    Select: SelectField,
    Input: InputField,
    MultilineInput: MultilineInputField,
  },
);

export default DataList;

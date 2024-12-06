import { Pencil } from "lucide-react";
import React, { PropsWithChildren, useState } from "react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { DataListContext } from "@/design-system/patterns/FieldComposer/DataListContext";
import InputField from "@/design-system/patterns/FieldComposer/fieldComponents/InputField";
import SelectField from "@/design-system/patterns/FieldComposer/fieldComponents/SelectField";
import { IconButton } from "@/design-system/ui/Button/IconButton";
import Icon, { IconName } from "@/design-system/ui/Icon/Icon";
import { Text } from "@/design-system/ui/Text/Text";

type DataListProps = PropsWithChildren<{
  label: string;
  icon?: IconName;
  value?: string;
  editable?: boolean;
}>;

const DataList = Object.assign(
  ({ children, label, icon, value, editable = true }: DataListProps) => {
    const [editing, setEditing] = useState(false);

    const setForEditing = () => {
      if (!editing) {
        setEditing(true);
      }
    };

    const setForNotEditing = () => setEditing(false);

    return (
      <Flex
        justifyContent="justify-center"
        gap="gap-6"
        role="data-list"
        className="h-[40px] w-full"
        onClick={setForEditing}
      >
        <Flex flex="flex-1" alignItems="items-center" gap="gap-2">
          {icon && <Icon className="size-4" IconName={icon} />}
          <Text variant="body-1" as="label">
            {label}
          </Text>
        </Flex>
        <DataListContext.Provider
          value={{
            editing,
            setEditing,
          }}
        >
          <Flex className="flex-1">
            {!editing && (
              <Flex
                className="flex-1 border border-accent-border px-2 rounded-md bg-background"
                alignItems="items-center"
                justifyContent="justify-between"
                gap="gap-1"
              >
                {value && <Text variant="body-1">{value}</Text>}
                {!value && <Text variant="subtext-1">Click to edit</Text>}
                {editable && (
                  <IconButton
                    variant="outline"
                    size="xSmallIcon"
                    onClick={setForEditing}
                    icon={Pencil}
                  />
                )}
              </Flex>
            )}

            {editing && editable && (
              <Flex className="flex-1 h-full relative shadow-md">
                {children}
              </Flex>
            )}
          </Flex>
        </DataListContext.Provider>
      </Flex>
    );
  },
  {
    displayName: "DataList",
    Select: SelectField,
    Input: InputField,
  },
);

export default DataList;

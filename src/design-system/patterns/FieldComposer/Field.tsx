import { Pencil } from "lucide-react";
import { PropsWithChildren, useState } from "react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { FieldContext } from "@/design-system/patterns/FieldComposer/FieldContext";
import { Badge } from "@/design-system/ui/Badge/Badge";
import { BadgeGroup } from "@/design-system/ui/Badge/BadgeGroup";
import { IconButton } from "@/design-system/ui/Button/IconButton";
import Icon, { IconName } from "@/design-system/ui/Icon/Icon";
import { Text } from "@/design-system/ui/Text/Text";
import { cn } from "@/design-system/utils/utils";

type FieldProps = PropsWithChildren<{
  label: string;
  icon?: IconName;
  value?: string | { label: string; icon?: IconName }[];
  valueType?: "string" | "badge";
  editable?: boolean;
  type: "cell" | "datalist";
}>;

type BadgeValues = {
  values: { label: string; icon?: IconName }[];
};
const BadgeValues = ({ values }: BadgeValues) => {
  if (!values.length) {
    return null;
  }
  return (
    <BadgeGroup>
      {values.map((value) => (
        <Badge variant="outline">{value.label}</Badge>
      ))}
    </BadgeGroup>
  );
};

const RenderValues = ({
  value,
  valueType,
}: {
  value?: string | { label: string; icon?: IconName }[];
  valueType?: "string" | "badge";
}) => {
  if (!value) {
    return <Text variant="subtext-1">Click to edit</Text>;
  }
  if (typeof value === "string" && valueType === "string") {
    return <Text variant="body-1">{value}</Text>;
  }
  if (valueType === "badge" && typeof value === "object") {
    return <BadgeValues values={value} />;
  }
  return <Text variant="subtext-1">Click to edit</Text>;
};

const Field = Object.assign(
  ({
    children,
    label,
    icon,
    value,
    valueType,
    editable = true,
    type,
  }: FieldProps) => {
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
        role={type}
        className="min-[40px] w-full"
        onClick={setForEditing}
      >
        {type === "datalist" && (
          <Flex className="w-[50%]" alignItems="items-center" gap="gap-2">
            {icon && <Icon className="size-4" IconName={icon} />}
            <Text variant="body-1" as="label">
              {label}
            </Text>
          </Flex>
        )}
        <FieldContext.Provider
          value={{
            editing,
            setEditing,
          }}
        >
          <Flex className={cn(type === "datalist" ? "w-[50%]" : "w-full")}>
            {!editing && (
              <Flex
                className={cn(
                  type === "datalist"
                    ? "w-full border border-accent-border px-2 py-2 rounded-md bg-background"
                    : "border-none px-0 py-2 w-full hover:cursor-pointer",
                )}
                alignItems={valueType === "string" ? "items-center" : undefined}
                justifyContent="justify-between"
                gap="gap-1"
              >
                <RenderValues value={value} valueType={valueType} />
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
              <Flex className="w-full h-full relative shadow-md">
                {children}
              </Flex>
            )}
          </Flex>
        </FieldContext.Provider>
      </Flex>
    );
  },
  {
    displayName: "Field",
  },
);

export default Field;

import { Pencil } from "lucide-react";
import { PropsWithChildren, useRef, useState } from "react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { FieldContext } from "@/design-system/patterns/FieldComposer/FieldContext";
import { Badge } from "@/design-system/ui/Badge/Badge";
import { BadgeGroup } from "@/design-system/ui/Badge/BadgeGroup";
import { IconButton } from "@/design-system/ui/Button/IconButton";
import Icon, { IconName } from "@/design-system/ui/Icon/Icon";
import { Text } from "@/design-system/ui/Text/Text";
import { Tooltip } from "@/design-system/ui/Tooltip/Tooltip";
import { cn } from "@/design-system/utils/utils";

type FieldProps = PropsWithChildren<{
  label: string;
  icon?: IconName;
  value?: string | { label: string; icon?: IconName }[];
  valueType?: "string" | "badge";
  editable?: boolean;
  type: "cell" | "datalist" | "field";
  leftContent?: JSX.Element;
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
  type?: FieldProps["type"];
}) => {
  if (!value) {
    return <Text variant="subtext-1">Click to edit</Text>;
  }
  if (typeof value === "string" && valueType === "string") {
    return (
      <Text wrap variant="body-1">
        {value}
      </Text>
    );
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
    leftContent,
  }: FieldProps) => {
    const [editing, setEditing] = useState(false);

    const ref = useRef<HTMLDivElement>(null);

    const setBackFocus = () => {
      ref.current?.classList.add("awesome");
    };

    const setForEditing = () => {
      if (!editing) {
        setEditing(true);
      } else {
        setEditing(false);
        setBackFocus();
      }
    };

    return (
      <Flex
        justifyContent="justify-center"
        gap="gap-6"
        role={type}
        className="min-[40px] w-full"
        onClick={setForEditing}
        ref={ref}
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
            setEditing: setForEditing,
          }}
        >
          <Flex
            className={cn(
              type === "datalist" && "w-[50%] h-[40px]",
              type === "cell" && "w-full",
              type === "field" && "w-full h-[30px]",
            )}
          >
            {!editing && (
              <Flex
                className={cn(
                  "relative",
                  type === "datalist" &&
                    "w-full border border-accent-border px-2 py-2 rounded-md bg-background",
                  type === "cell" &&
                    "border-none px-2 py-2 w-full hover:cursor-pointer hover:bg-secondary-light",
                  type === "field" &&
                    "border w-full px-1 rounded-md cursor-pointer items-center py-1",
                )}
                alignItems={valueType === "string" ? "items-center" : undefined}
                justifyContent="justify-between"
                gap="gap-1"
              >
                <Flex className="max-w-full">
                  {leftContent && (
                    <Flex className="pr-2" alignItems="items-center">
                      {leftContent}
                    </Flex>
                  )}
                  <Tooltip content={value} className="w-full truncate">
                    <RenderValues value={value} valueType={valueType} />
                  </Tooltip>
                  {editable && <div className="h-full w-14"></div>}
                </Flex>
                {editable && (
                  <IconButton
                    className="absolute translate-y-[-50%] top-[50%] right-2"
                    variant="outline"
                    size={type === "field" ? "xxs" : "xs"}
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

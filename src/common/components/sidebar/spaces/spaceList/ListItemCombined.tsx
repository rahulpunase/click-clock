import { ComponentProps } from "react";

import { IconName } from "@/design-system/ui/Icon/Icon";
import { ListItem } from "@/design-system/ui/List/List.Item";

export const ListItemCombined = ({
  label,
  icon,
  onClick,
  variant = "default",
  subText,
}: {
  label: string;
  icon: IconName;
  onClick: () => void;
  variant?: ComponentProps<typeof ListItem.Dropdown.Item>["variant"];
  subText?: string;
}) => (
  <ListItem.Dropdown.Item onClick={onClick} variant={variant}>
    <ListItem.Dropdown.Item.LeftIcon icon={icon} />
    <ListItem.Dropdown.Item.Label>{label}</ListItem.Dropdown.Item.Label>
    {subText && (
      <ListItem.Dropdown.Item.SubText>{subText}</ListItem.Dropdown.Item.SubText>
    )}
  </ListItem.Dropdown.Item>
);

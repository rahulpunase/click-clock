import { ComponentProps } from "react";

import { IconName } from "@/design-system/ui/Icon/Icon";
import { ListItem } from "@/design-system/ui/List/List.Item";

/**
 * Functional component for rendering a combined list item with an icon, label, and optional subtext.
 *
 * @param label The main text label for the list item.
 * @param icon The name of the icon to display.
 * @param onClick Function to be called when the item is clicked.
 * @param variant The variant of the list item (default or custom).
 * @param subText Optional additional text to display below the main label.
 * @returns A React element representing the combined list item.
 */
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

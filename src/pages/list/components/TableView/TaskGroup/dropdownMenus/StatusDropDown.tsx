import {
  ChevronUp,
  Ellipsis,
  ListCheck,
  Pencil,
  Plus,
  Settings,
} from "lucide-react";

import { IconButton } from "@/design-system/ui/Button/IconButton";
import { DropdownMenu } from "@/design-system/ui/DropdownMenu/DropdownMenu";

import { useListContext } from "@/pages/list/context/ListContext";

import useGlobalDialogStore from "@/common/store/useGlobalDialogStore";

type StatusDropDownProps = {
  expanded: boolean;
  actions: {
    setExpanded: (b?: boolean) => void;
    selectAll: () => void;
  };
};
const StatusDropDown = ({ actions, expanded }: StatusDropDownProps) => {
  const { show } = useGlobalDialogStore();
  const { list } = useListContext();
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger>
        <IconButton variant="ghost" size="xSmallIcon" icon={Ellipsis} />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Label>Group options</DropdownMenu.Label>
        <DropdownMenu.Item>
          <DropdownMenu.Item.LeftIcon icon={Pencil} />
          <DropdownMenu.Item.Label>Rename</DropdownMenu.Item.Label>
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <DropdownMenu.Item.LeftIcon icon={Plus} />
          <DropdownMenu.Item.Label>New Status</DropdownMenu.Item.Label>
        </DropdownMenu.Item>
        <DropdownMenu.Item
          onClick={() =>
            show("list-status", {
              _id: list?._id,
            })
          }
        >
          <DropdownMenu.Item.LeftIcon icon={Settings} />
          <DropdownMenu.Item.Label>Edit statuses</DropdownMenu.Item.Label>
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item onClick={() => actions.setExpanded()}>
          <DropdownMenu.Item.LeftIcon icon={ChevronUp} />
          <DropdownMenu.Item.Label>
            {expanded ? "Collapse group" : "Expand group"}
          </DropdownMenu.Item.Label>
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item onClick={() => actions.selectAll()}>
          <DropdownMenu.Item.LeftIcon icon={ListCheck} />
          <DropdownMenu.Item.Label>Select all</DropdownMenu.Item.Label>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
};

export default StatusDropDown;

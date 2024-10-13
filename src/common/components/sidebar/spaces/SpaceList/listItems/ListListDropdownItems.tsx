import { ChartBarBig, Link, Pencil, Settings } from "lucide-react";

import { ListItem } from "@/design-system/ui/List/List.Item";

import { ItemWrapper } from "@/common/components/sidebar/spaces/SpaceList/ItemWrapper";
import useGlobalDialogStore from "@/common/store/useGlobalDialogStore";

import { DataModel } from "@db/_generated/dataModel";

const ListListDropdownItems = ({
  list,
}: {
  list: DataModel["lists"]["document"];
}) => {
  const { show } = useGlobalDialogStore();
  return (
    <>
      <ItemWrapper icon={Pencil} label="Rename" onClick={() => {}} />
      <ItemWrapper icon={Link} label="Copy link" onClick={() => {}} />
      <ListItem.Dropdown.Separator />
      <ItemWrapper
        icon={Settings}
        label="Settings"
        onClick={() => {}}
        subItemContent={
          <ItemWrapper
            icon={ChartBarBig}
            label="Status settings"
            onClick={() => show("list-status", list)}
          />
        }
      />
    </>
  );
};

export default ListListDropdownItems;

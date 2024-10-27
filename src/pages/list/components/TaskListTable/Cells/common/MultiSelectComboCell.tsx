import { Flag } from "lucide-react";

import Cell from "@/design-system/patterns/Cell";
import { IconName } from "@/design-system/ui/Icon/Icon";
import MultiSelectCombo from "@/design-system/ui/MultiSelectCombo/MultiSelectCombo";
import { MultiSelectComboData } from "@/design-system/ui/MultiSelectCombo/type";

type MultiSelectComboCellProps = {
  defaultValue?: string;
  cellName: string;
  mappedData: MultiSelectComboData[];
  onUpdate: (valueToSet: string[]) => void;
  icon?: IconName;
  iconColor?: string;
};
const MultiSelectComboCell = ({
  defaultValue,
  cellName,
  mappedData,
  onUpdate,
  icon,
  iconColor,
}: MultiSelectComboCellProps) => {
  return (
    <MultiSelectCombo
      data={mappedData}
      selected={[defaultValue ?? ""]}
      setSelected={onUpdate}
      trigger={
        <Cell
          icon={icon}
          defaultValue={defaultValue}
          name={cellName}
          isEditable
          iconColor={iconColor}
        />
      }
      isSingleSelect
    />
  );
};

export default MultiSelectComboCell;

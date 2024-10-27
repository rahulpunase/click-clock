import Cell from "@/design-system/patterns/Cell";
import MultiSelectCombo from "@/design-system/ui/MultiSelectCombo/MultiSelectCombo";
import { MultiSelectComboData } from "@/design-system/ui/MultiSelectCombo/type";

type MultiSelectComboCellProps = {
  defaultValue?: string;
  cellName: string;
  mappedData: MultiSelectComboData[];
  onUpdate: (valueToSet: string[]) => void;
};
const MultiSelectComboCell = ({
  defaultValue,
  cellName,
  mappedData,
  onUpdate,
}: MultiSelectComboCellProps) => {
  return (
    <MultiSelectCombo
      data={mappedData}
      selected={[defaultValue ?? ""]}
      setSelected={onUpdate}
      trigger={<Cell defaultValue={defaultValue} name={cellName} isEditable />}
      isSingleSelect
    />
  );
};

export default MultiSelectComboCell;

import { IconName } from "@/design-system/ui/Icon/Icon";
import { MultiSelectComboData } from "@/design-system/ui/MultiSelectCombo/type";
import { Select } from "@/design-system/ui/Select/Select";

import FieldTrigger from "@/common/components/tasks/EditableFields/FieldTrigger";

type MultiSelectComboCellProps = {
  defaultValue?: string;
  cellName: string;
  mappedData: MultiSelectComboData[];
  onUpdate: (valueToSet: string) => void;
  icon?: IconName;
  iconColor?: string;
  defaultRender?: JSX.Element;
};
const MultiSelectComboCell = ({
  defaultValue,
  cellName,
  mappedData,
  onUpdate,
  icon,
  iconColor,
  defaultRender,
}: MultiSelectComboCellProps) => {
  return (
    <Select name={cellName} onValueChange={onUpdate} value={defaultValue}>
      <Select.Trigger className="h-full border-none py-0 px-0">
        {defaultRender ?? <FieldTrigger icon={icon} value={defaultValue} />}
      </Select.Trigger>
      <Select.Content>
        {mappedData.map((item) => (
          <Select.Item value={item.value}>{item.label}</Select.Item>
        ))}
      </Select.Content>
    </Select>
  );
};

export default MultiSelectComboCell;

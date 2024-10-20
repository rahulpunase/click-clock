import { Badge } from "@/design-system/ui/Badge/Badge";
import { MultiSelectComboData } from "@/design-system/ui/MultiSelectCombo/type";
import { Text } from "@/design-system/ui/Text/Text";

type MultiSelectComboInputProps = {
  selected: string[];
  onSelect: (selectedItemId: string, action: "delete" | "add") => void;
  isSingleSelect?: boolean;
  data: MultiSelectComboData[];
  placeholder?: string;
};
const MultiSelectComboInput = ({
  selected,
  isSingleSelect,
  onSelect,
  data,
  placeholder,
}: MultiSelectComboInputProps) => {
  const getSelectedItem = (selectedItemId: string) => {
    return data.find((item) => item.value === selectedItemId);
  };

  return (
    <button className="flex min-h-10 w-full rounded-md border border-accent-border bg-background px-3 py-2 text-sm ring-offset-background gap-1 max-h-24 placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 overflow-auto flex-wrap focus-visible:ring-primary-hover focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 items-center">
      {selected.map((selectedItemId) => {
        const item = getSelectedItem(selectedItemId);
        return (
          <Badge
            key={selectedItemId}
            size="small"
            isDeletable
            variant="secondary"
            onDelete={(e) => {
              e.stopPropagation();
              onSelect(selectedItemId, "delete");
            }}
          >
            {item?.label}
          </Badge>
        );
      })}
      {isSingleSelect && !selected.length && (
        <Text variant="subtext">{placeholder ?? "Select single value"}</Text>
      )}
      {!isSingleSelect && (
        <Text variant="subtext">{placeholder ?? "Select multiple values"}</Text>
      )}
    </button>
  );
};

export default MultiSelectComboInput;

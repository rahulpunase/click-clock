import { Flex } from "@/design-system/layout/Flex/Flex";
import { Badge } from "@/design-system/ui/Badge/Badge";
import { Separator } from "@/design-system/ui/Separator/Separator";

import StatusFilter from "@/pages/list/components/Filters/StatusFilter";
import { useListContext } from "@/pages/list/context/ListContext";

const Filters = () => {
  const { tasks } = useListContext();
  if (!tasks.length) {
    return null;
  }
  return (
    <Flex gap="gap-2" className="py-2 px-4" data-component="Filters">
      <StatusFilter />

      <Badge isSelectable variant="outline">
        Subtasks: Collapse all
      </Badge>
      <Separator orientation="vertical" />
      <Badge isSelectable variant="outline">
        Filters: Collapse all
      </Badge>
      <Separator orientation="vertical" />
      <Badge isSelectable variant="secondary">
        Hide
      </Badge>
    </Flex>
  );
};

export default Filters;

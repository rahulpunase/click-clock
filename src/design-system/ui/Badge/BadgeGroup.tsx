import { Flex } from "@/design-system/layout/Flex/Flex";
import { Children, useState } from "react";
import { Badge } from "./badge";

type BadgeGroup = {
  limit?: number;
  children: React.ReactNode;
};

const BadgeGroup = ({ children, limit, ...props }: BadgeGroup) => {
  const [newLimit, setNewLimit] = useState(limit);
  const childrenToRender = Children.toArray(children).splice(0, newLimit);
  const childrenCount = Children.count(children);

  if (!limit || limit > childrenCount) {
    return (
      <Flex className="max-w-[400px] flex-wrap" gap="gap-2">
        {children}
      </Flex>
    );
  }

  const badgeWithCount = (
    <Badge
      variant="secondary"
      isSelectable
      {...props}
      onClick={() => {
        if (newLimit === limit) {
          setNewLimit(childrenCount);
        } else {
          setNewLimit(limit);
        }
      }}
    >
      {newLimit === limit ? `+${childrenCount - limit} more` : "Less"}
    </Badge>
  );
  return (
    <Flex className="max-w-[400px] flex-wrap" gap="gap-2">
      {childrenToRender}
      {badgeWithCount}
    </Flex>
  );
};

export { BadgeGroup };

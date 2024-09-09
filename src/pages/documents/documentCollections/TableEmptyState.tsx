import React from "react";

import EmptyState from "@/design-system/patterns/EmptyState";
import { Button } from "@/design-system/ui/Button/Button";

const TableEmptyState = () => {
  return (
    <EmptyState>
      <EmptyState.Label>No matching results found.</EmptyState.Label>
      <EmptyState.Subtext>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </EmptyState.Subtext>
      <EmptyState.Actions>
        <Button variant="secondary" size="sm">
          Clear filter
        </Button>
      </EmptyState.Actions>
    </EmptyState>
  );
};

export default TableEmptyState;

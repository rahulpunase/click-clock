import React from "react";

import EmptyState from "@/design-system/patterns/EmptyState";
import { Button } from "@/design-system/ui/Button/Button";

const CardEmptyState = ({ title }: { title: string }) => {
  return (
    <EmptyState>
      <EmptyState.Label>{title}</EmptyState.Label>
      {/* <EmptyState.Subtext>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </EmptyState.Subtext> */}
    </EmptyState>
  );
};

export default CardEmptyState;

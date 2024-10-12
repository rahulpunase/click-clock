import React from "react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Button } from "@/design-system/ui/Button/Button";
import MultiSelectCombo from "@/design-system/ui/MultiSelectCombo/MultiSelectCombo";
import { Select } from "@/design-system/ui/Select/Select";
import { Text } from "@/design-system/ui/Text/Text";

const Status = () => {
  return (
    <Flex className="w-full">
      <Flex className="rounded-sm hover:bg-secondary-hover">
        <MultiSelectCombo
          data={[]}
          selected={[]}
          setSelected={() => {}}
        ></MultiSelectCombo>
      </Flex>
    </Flex>
  );
};

export default Status;

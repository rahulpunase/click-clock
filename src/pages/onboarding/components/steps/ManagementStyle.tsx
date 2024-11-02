import { useState } from "react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Slider } from "@/design-system/ui/Slider/Slider";
import { Text } from "@/design-system/ui/Text/Text";

import { StepProps } from "@/pages/onboarding/utils";

const ManagementStyle = ({}: StepProps) => {
  const [defaultValue, setDefaultValue] = useState(10);
  return (
    <>
      <Flex className="mb-4">
        <Text variant="heading-3">{`More than ${defaultValue} people`}</Text>
      </Flex>
      <Slider
        onValueChange={(val) => setDefaultValue(val[0])}
        defaultValue={[defaultValue]}
        min={10}
        max={1000}
        step={10}
      />
    </>
  );
};

export default ManagementStyle;

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Text } from "@/design-system/ui/Text/Text";

type FieldWrapperProps = {
  label: string;
  child: JSX.Element;
};
const FieldWrapper = ({ label, child }: FieldWrapperProps) => {
  return (
    <Flex alignItems="items-center" className="w-full">
      <Flex className="w-[30%]">
        <Text variant="subtext-1">{label}</Text>
      </Flex>
      <Flex>{child}</Flex>
    </Flex>
  );
};

export default FieldWrapper;

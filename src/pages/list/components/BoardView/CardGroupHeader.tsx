import { Flex } from "@/design-system/layout/Flex/Flex";
import { Text } from "@/design-system/ui/Text/Text";

type CardGroupHeader = {
  icon?: JSX.Element;
  label: string;
  subText: string | number;
};

const CardGroupHeader = ({ icon, label, subText }: CardGroupHeader) => {
  return (
    <Flex
      justifyContent="justify-between"
      className="p-1"
      alignItems="items-center"
      gap="gap-2"
    >
      <Flex className="rounded-sm p-1" alignItems="items-center" gap="gap-2">
        {icon}
        <Text variant="heading-1">{label ?? "N.A."}</Text>
      </Flex>
      <Text variant="subtext">{subText}</Text>
    </Flex>
  );
};

export default CardGroupHeader;

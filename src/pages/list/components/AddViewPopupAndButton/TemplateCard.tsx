import { Flex } from "@/design-system/layout/Flex/Flex";
import { Text } from "@/design-system/ui/Text/Text";

import { templates } from "@/pages/list/constants";

type TemplateCardProps = {
  template: (typeof templates)[number];
};
const TemplateCard = ({ template }: TemplateCardProps) => {
  return (
    <Flex
      alignItems="items-center"
      gap="gap-2"
      flex="flex-1"
      className="p-2 rounded-md cursor-pointer hover:bg-secondary min-w-[48%]"
    >
      <img
        className="size-12 shrink-0"
        src={template.img}
        alt={template.title}
      />
      <Flex direction="flex-col">
        <Text>{template.title}</Text>
        <Text variant="subtext">{template.subtext}</Text>
      </Flex>
    </Flex>
  );
};

export default TemplateCard;

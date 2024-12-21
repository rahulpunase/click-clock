import { Plus } from "lucide-react";
import React from "react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Button } from "@/design-system/ui/Button/Button";
import { Popover } from "@/design-system/ui/Popover/Popover";

import TemplateCard from "@/pages/list/components/AddViewPopupAndButton/TemplateCard";
import { templates } from "@/pages/list/constants";

const AddViewPopupAndButton = () => {
  return (
    <Popover>
      <Popover.Trigger asChild>
        <Button size="xsm" icon={Plus} variant="ghost">
          Add View
        </Button>
      </Popover.Trigger>
      <Popover.Content className="min-w-[600px] max-w-[600px] p-2">
        <Popover.Content.Header>
          <Popover.Content.Header.Title variant="subtext-1">
            Add custom views and templates to your list
          </Popover.Content.Header.Title>
        </Popover.Content.Header>
        <Popover.Content.Main>
          <Flex gap="gap-2" wrap="flex-wrap">
            {templates.map((template) => (
              <TemplateCard key={template.title} template={template} />
            ))}
          </Flex>
        </Popover.Content.Main>
      </Popover.Content>
    </Popover>
  );
};

export default AddViewPopupAndButton;

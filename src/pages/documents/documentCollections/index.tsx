import ContentTabAll from "@/pages/documents/documentCollections/ContentTabAll";

import { Card } from "@/design-system/ui/Card/Card";
import { Tabs } from "@/design-system/ui/Tabs/Tabs";

const DocumentCollections = () => {
  return (
    <Card className="min-h-[400px]">
      <Card.Content className="flex">
        <Tabs defaultValue="all">
          <Tabs.List>
            <Tabs.Trigger value="all">All</Tabs.Trigger>
            <Tabs.Trigger value="my-docs">My docs</Tabs.Trigger>
            <Tabs.Trigger value="shared">Shared</Tabs.Trigger>
            <Tabs.Trigger value="private">Private</Tabs.Trigger>
            <Tabs.Trigger value="assigned">Assigned</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="all" className="flex-1">
            <ContentTabAll />
          </Tabs.Content>
        </Tabs>
      </Card.Content>
    </Card>
  );
};

export default DocumentCollections;

import { Clock, Filter, LayoutDashboard } from "lucide-react";

import PageLook from "@/design-system/patterns/PageLook";
import { Button } from "@/design-system/ui/Button/Button";
import { IconButton } from "@/design-system/ui/Button/IconButton";
import { Text } from "@/design-system/ui/Text/Text";

const { Header, Content } = PageLook;

const DashboardPage = () => {
  return (
    <PageLook>
      <Header icon={LayoutDashboard}>
        <PageLook.Header.Heading as="h2">Dashboard</PageLook.Header.Heading>

        <PageLook.Header.LeftMostActions>
          <Text>Awesome...</Text>
        </PageLook.Header.LeftMostActions>

        <PageLook.Header.RightMostActions>
          <Button icon={Filter} size="sm" variant="secondary">
            Filters
          </Button>
          <IconButton icon={Clock} size="smallIcon" variant="ghost" />
        </PageLook.Header.RightMostActions>
      </Header>
      <Content>
        <Content.Main direction="flex-col" gap="gap-2">
          <div className="h-[500px] w-[200px]">Some content</div>
        </Content.Main>
        <Content.SideActions>A</Content.SideActions>
      </Content>
    </PageLook>
  );
};

export default DashboardPage;

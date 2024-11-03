import { ChartNoAxesGantt, Grid2X2, List } from "lucide-react";
import { Link, Outlet, useParams } from "react-router-dom";

import { Flex } from "@/design-system/layout/Flex/Flex";
import PageLook from "@/design-system/patterns/PageLook";
import Icon from "@/design-system/ui/Icon/Icon";
import { Separator } from "@/design-system/ui/Separator/Separator";
import { Tabs } from "@/design-system/ui/Tabs/Tabs";

import AddViewPopupAndButton from "@/pages/list/components/AddViewPopupAndButton";
import ListContextProvider from "@/pages/list/context/ListContextProvider";

const ListPage = () => {
  const params = useParams();
  const listId = params?.listId;
  return (
    <ListContextProvider>
      <PageLook>
        <PageLook.Header>
          <PageLook.Header.Heading>Space List</PageLook.Header.Heading>
        </PageLook.Header>
        <PageLook.Content>
          <PageLook.Content.Main noPadding>
            <Flex className="px-0 border-b border-accent-border">
              <Tabs className="w-auto" role="tabs">
                <Tabs.List className="px-4 py-0">
                  <Tabs.Trigger value="List" asChild className="py-3">
                    <Link to={`d/${listId}`}>
                      <Flex alignItems="items-center" gap="gap-2">
                        <Icon IconName={List} className="size-4" />
                        List
                      </Flex>
                    </Link>
                  </Tabs.Trigger>
                  <Tabs.Trigger value="Board" asChild className="py-3">
                    <Link to={`b/${listId}`}>
                      <Flex alignItems="items-center" gap="gap-2">
                        <Icon IconName={Grid2X2} className="size-4" />
                        Board
                      </Flex>
                    </Link>
                  </Tabs.Trigger>
                  <Tabs.Trigger value="Gantt" asChild className="py-3">
                    <Link to={`g/${listId}`}>
                      <Flex alignItems="items-center" gap="gap-2">
                        <Icon IconName={ChartNoAxesGantt} className="size-4" />
                        Gantt
                      </Flex>
                    </Link>
                  </Tabs.Trigger>
                </Tabs.List>
              </Tabs>
              <Flex alignItems="items-center" gap="gap-2" className="my-2">
                <Separator orientation="vertical" className="ml-2" />
                <AddViewPopupAndButton />
              </Flex>
            </Flex>
            <Flex>
              <Outlet />
            </Flex>
          </PageLook.Content.Main>
        </PageLook.Content>
      </PageLook>
    </ListContextProvider>
  );
};

export default ListPage;

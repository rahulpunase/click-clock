import { ChartNoAxesGantt, Grid2X2, List } from "lucide-react";
import { Link, Outlet, useParams } from "react-router-dom";

import { Flex } from "@/design-system/layout/Flex/Flex";
import PageLook from "@/design-system/patterns/PageLook";
import Icon from "@/design-system/ui/Icon/Icon";
import { Tabs } from "@/design-system/ui/Tabs/Tabs";

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
            <Flex className="px-0 py-2">
              <Tabs>
                <Tabs.List className="px-4">
                  <Tabs.Trigger value="List" asChild>
                    <Link to={`d/${listId}`}>
                      <Flex alignItems="items-center" gap="gap-2">
                        <Icon IconName={List} className="size-4" />
                        List
                      </Flex>
                    </Link>
                  </Tabs.Trigger>
                  <Tabs.Trigger value="Board" asChild>
                    <Link to={`b/${listId}`}>
                      <Flex alignItems="items-center" gap="gap-2">
                        <Icon IconName={Grid2X2} className="size-4" />
                        Board
                      </Flex>
                    </Link>
                  </Tabs.Trigger>
                  <Tabs.Trigger value="Gantt" asChild>
                    <Link to={`g/${listId}`}>
                      <Flex alignItems="items-center" gap="gap-2">
                        <Icon IconName={ChartNoAxesGantt} className="size-4" />
                        Gantt
                      </Flex>
                    </Link>
                  </Tabs.Trigger>
                </Tabs.List>
              </Tabs>
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

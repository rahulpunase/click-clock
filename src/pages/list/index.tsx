import { ChartNoAxesGantt, Grid2X2, List } from "lucide-react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";

import { Flex } from "@/design-system/layout/Flex/Flex";
import PageLook from "@/design-system/patterns/PageLook";
import Icon from "@/design-system/ui/Icon/Icon";
import { Separator } from "@/design-system/ui/Separator/Separator";
import { Tabs } from "@/design-system/ui/Tabs/Tabs";
import { Text } from "@/design-system/ui/Text/Text";

import AddViewPopupAndButton from "@/pages/list/components/AddViewPopupAndButton";
import { useListContext } from "@/pages/list/context/ListContext";
import ListContextProvider from "@/pages/list/context/ListContextProvider";

const triggers = [
  {
    to: "d",
    label: "List",
    icon: List,
  },
  {
    to: "b",
    label: "Board",
    icon: Grid2X2,
  },
  {
    to: "g",
    label: "Gantt",
    icon: ChartNoAxesGantt,
  },
];

const ListPageInternal = () => {
  const params = useParams();
  const listId = params?.listId;
  const location = useLocation();

  const isSelected = (str: string) => location.pathname.includes(`/${str}/`);

  const { list } = useListContext();

  return (
    <PageLook>
      <PageLook.Header>
        <PageLook.Header.Heading>Space List</PageLook.Header.Heading>
        <PageLook.Header.LeftMostActions>
          <Text variant="heading-1">{list?.name ?? ""}</Text>
        </PageLook.Header.LeftMostActions>
      </PageLook.Header>
      <PageLook.Content>
        <PageLook.Content.Main noPadding fitHeight={false}>
          <Flex className="px-0 border-b border-accent-border sticky bg-background z-10 w-full">
            <Tabs className="w-auto" role="tabs">
              <Tabs.List className="px-4 py-0">
                {triggers.map((trigger) => (
                  <Tabs.Trigger
                    value={trigger.label}
                    asChild
                    className="py-3"
                    data-state={isSelected(trigger.to) ? "active" : "inactive"}
                    key={trigger.to}
                  >
                    <Link to={`${trigger.to}/${listId}`}>
                      <Flex alignItems="items-center" gap="gap-2">
                        <Icon IconName={trigger.icon} className="size-4" />
                        {trigger.label}
                      </Flex>
                    </Link>
                  </Tabs.Trigger>
                ))}
              </Tabs.List>
            </Tabs>
            <Flex alignItems="items-center" gap="gap-2" className="my-2">
              <Separator orientation="vertical" className="ml-2" />
              <AddViewPopupAndButton />
            </Flex>
          </Flex>

          <Outlet />
        </PageLook.Content.Main>
      </PageLook.Content>
    </PageLook>
  );
};

const ListPage = () => {
  return (
    <ListContextProvider>
      <ListPageInternal />
    </ListContextProvider>
  );
};

export default ListPage;

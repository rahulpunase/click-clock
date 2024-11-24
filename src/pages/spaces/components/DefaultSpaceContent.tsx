import { File, Folder, List } from "lucide-react";
import { useParams } from "react-router-dom";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Card } from "@/design-system/ui/Card/Card";
import Icon, { IconName } from "@/design-system/ui/Icon/Icon";
import { Text } from "@/design-system/ui/Text/Text";

import { useGetSpaces } from "@/common/hooks/db/spaces/queries/useGetSpaces";
import { useGlobalModalContext } from "@/common/hooks/useGlobalModalContext";

type DefaultCardProps = {
  iconName: IconName;
  subtext: string;
  buttonLabel: string;
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};
const DefaultCard = ({
  iconName,
  subtext,
  buttonLabel,
  label,
  onClick,
}: DefaultCardProps) => (
  <Card className="items-center justify-center">
    <Card.Content className="h-full">
      <Flex
        direction="flex-col"
        className="w-full"
        justifyContent="justify-center"
        alignItems="items-center"
        gap="gap-5"
      >
        <Icon size="xxlg" className="text-text-muted" IconName={iconName} />
        <Flex direction="flex-col" alignItems="items-center">
          <Text variant="heading-1">{label}</Text>
          <Text variant="subtext-1">{subtext}</Text>
        </Flex>

        <Flex direction="flex-col" alignItems="items-center">
          <button
            onClick={onClick}
            className="bg-primary rounded-full p-2 px-3 text-sm text-white shadow-lg hover:shadow-2xl"
          >
            {buttonLabel}
          </button>
        </Flex>
      </Flex>
    </Card.Content>
  </Card>
);

const DefaultSpaceContent = () => {
  const params = useParams();
  const spaceId = params.spaceId;
  const { data, isLoading } = useGetSpaces();
  const space = data.find((space) => space._id === spaceId);

  const { createNewFolderModalStore, createNewListModalStore } =
    useGlobalModalContext();

  if (isLoading) {
    return "Loading...";
  }

  return (
    <Flex
      direction="flex-col"
      gap="gap-8"
      className="w-full"
      data-component="DefaultSpaceContent"
    >
      <Flex justifyContent="justify-center">
        <Text variant="heading-3">
          {`Add new things in your new space ${space?.name}`}
        </Text>
      </Flex>
      <Flex className="gap-3">
        <DefaultCard
          iconName={Folder}
          buttonLabel="Create a new folder"
          label="No folders"
          subtext="Folder holds your data together"
          onClick={() =>
            space?._id &&
            createNewFolderModalStore.show({
              flow: "new",
              spaceId: space?._id,
            })
          }
        />
        <DefaultCard
          iconName={List}
          buttonLabel="Create a new list"
          label="No lists"
          subtext="List helps manage your tasks"
          onClick={() =>
            space?._id &&
            createNewListModalStore.show({
              flow: "new",
              spaceId: space?._id,
            })
          }
        />
        <DefaultCard
          iconName={File}
          buttonLabel="Create a new document"
          label="No documents"
          subtext="Create a new document"
          onClick={() => space?._id}
        />
        {/* <DefaultCard iconName={} /> */}
      </Flex>
    </Flex>
  );
};

export default DefaultSpaceContent;

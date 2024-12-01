import { Flex } from "@/design-system/layout/Flex/Flex";
import { Alert } from "@/design-system/ui/Alert/alert";

import { useListContext } from "@/pages/list/context/ListContext";

function SpaceIsDeletedAlert() {
  const { contextIds, spaces } = useListContext();
  const space = spaces.find((item) => item._id === contextIds.spaceId);
  if (space) {
    return null;
  }
  if (!space) {
    return (
      <Flex className="p-3">
        <Alert variant="destructive">
          <Alert.Title>This space is deleted or moved to trash</Alert.Title>
        </Alert>
      </Flex>
    );
  }
}

export default SpaceIsDeletedAlert;

import { useMessageContext } from "@/pages/inbox/Messages/provider/MessageContext";
import React from "react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Button } from "@/design-system/ui/Button/Button";
import { Card } from "@/design-system/ui/Card/Card";
import Icon from "@/design-system/ui/Icon/Icon";
import { Text } from "@/design-system/ui/Text/Text";

const ChannelDetails = () => {
  const { channel } = useMessageContext();
  return (
    <Flex className="pt-2" gap="gap-3" direction="flex-col">
      <Card>
        <Card.Content>
          <Flex alignItems="items-center" justifyContent="justify-between">
            <Flex direction="flex-col">
              <Text variant="heading-1">Channel name</Text>
              <Flex gap="gap-1" alignItems="items-center">
                <Icon name="hash" className="size-4" />
                <Text>{channel?.name ?? ""}</Text>
              </Flex>
            </Flex>
            <Flex>
              <Button variant="ghost">Edit</Button>
            </Flex>
          </Flex>
        </Card.Content>
      </Card>

      <Card>
        <Card.Content>
          <Flex direction="flex-col" gap="gap-2">
            <Flex
              alignItems="items-center"
              justifyContent="justify-between"
              className="border-b border-accent-border pb-3"
            >
              <Flex direction="flex-col">
                <Text variant="heading-1">Description</Text>
                <Flex gap="gap-1" alignItems="items-center">
                  <Text variant="body-1">Add a description</Text>
                </Flex>
              </Flex>
              <Flex>
                <Button variant="ghost">Edit</Button>
              </Flex>
            </Flex>

            {/* <Flex
              alignItems="items-center"
              justifyContent="justify-between"
              className="border-b border-accent-border pb-3"
            >
              <Flex direction="flex-col">
                <Text variant="heading-1">Channel name</Text>
                <Flex gap="gap-1" alignItems="items-center">
                  <Icon name="hash" className="size-4" />
                  <Text>{channel?.name ?? ""}</Text>
                </Flex>
              </Flex>
              <Flex>
                <Button variant="ghost">Edit</Button>
              </Flex>
            </Flex> */}

            <Flex
              alignItems="items-center"
              justifyContent="justify-between"
              className="border-b border-accent-border pb-3"
            >
              <Flex direction="flex-col">
                <Text variant="heading-1">Created by</Text>
                <Flex gap="gap-1" alignItems="items-center">
                  <Icon name="user" className="size-4" />
                  <Text>{channel?.createdByUser?.name ?? ""}</Text>
                </Flex>
              </Flex>
            </Flex>

            <Flex>
              <Button variant="destructive">Leave channel</Button>
            </Flex>
          </Flex>
        </Card.Content>
      </Card>
    </Flex>
  );
};

export default ChannelDetails;

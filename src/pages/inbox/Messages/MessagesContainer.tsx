import ChatInputBox from "@/pages/inbox/Messages/ChatInputBox";
import ContainerHeader from "@/pages/inbox/Messages/ContainerHeader";
import MessageCollection from "@/pages/inbox/Messages/MessageCollection";
import { MessagesProvider } from "@/pages/inbox/Messages/provider/MessagesProvider";
import SideDrawer from "@/pages/inbox/Messages/SideDrawer";
import { useParams } from "react-router-dom";

import { Flex } from "@/design-system/layout/Flex/Flex";

const MessagesContainer = () => {
  const param = useParams();

  const channelId = param.channelId ?? "no-channel";

  return (
    <MessagesProvider>
      <Flex className="h-full w-full">
        <SideDrawer />
        <Flex className="" flex="flex-1" direction="flex-col">
          <ContainerHeader />
          <MessageCollection />
          <ChatInputBox key={channelId} />
        </Flex>
      </Flex>
    </MessagesProvider>
  );
};

export default MessagesContainer;

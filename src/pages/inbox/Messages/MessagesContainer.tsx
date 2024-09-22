import ChatInputBox from "@/pages/inbox/Messages/ChatInputBox";
import ContainerHeader from "@/pages/inbox/Messages/ContainerHeader";
import MessageCollection from "@/pages/inbox/Messages/MessageCollection";
import { useMessageContext } from "@/pages/inbox/Messages/provider/MessageContext";
import SideDrawer from "@/pages/inbox/Messages/SideDrawer";
import { useParams } from "react-router-dom";

import { Flex } from "@/design-system/layout/Flex/Flex";

import AppLoader from "@/common/components/AppLoader";

const MessagesContainer = () => {
  const param = useParams();
  const { loading } = useMessageContext();
  const channelId = param.channelId;

  return (
    <Flex className="h-full w-full">
      <SideDrawer />
      {loading && (
        <Flex
          flex="flex-1"
          direction="flex-col"
          className="animate-in fade-in-0 "
        >
          <AppLoader />
        </Flex>
      )}
      {!loading && (
        <Flex
          flex="flex-1"
          direction="flex-col"
          className="animate-in fade-in-0"
        >
          <ContainerHeader />
          <MessageCollection />
          <ChatInputBox key={channelId} />
        </Flex>
      )}
    </Flex>
  );
};

export default MessagesContainer;

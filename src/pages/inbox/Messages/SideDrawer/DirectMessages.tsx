import DirectMessageItem from "@/pages/inbox/Messages/SideDrawer/DirectMessageItem";
import { useToggle } from "react-use";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Button } from "@/design-system/ui/Button/Button";

const DirectMessages = () => {
  const [on, toggle] = useToggle(true);
  return (
    <Flex direction="flex-col" className="w-full">
      <div>
        <Button
          icon={on ? "chevron-down" : "chevron-right"}
          size="sm"
          variant="ghost"
          onClick={toggle}
          className="justify-start"
          block
        >
          Direct messages
        </Button>
      </div>
      {on && (
        <Flex direction="flex-col">
          {[1, 2, 3].map((item) => (
            <DirectMessageItem />
          ))}
        </Flex>
      )}
    </Flex>
  );
};

export default DirectMessages;

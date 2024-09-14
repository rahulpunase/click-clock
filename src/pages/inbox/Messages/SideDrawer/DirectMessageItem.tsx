import { ListItem } from "@/design-system/ui/List/List.Item";

const DirectMessageItem = () => {
  return (
    <ListItem variant="nav" icon="message-circle">
      <ListItem.Label>Channel name</ListItem.Label>
    </ListItem>
  );
};

export default DirectMessageItem;

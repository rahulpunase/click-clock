import CardEmptyState from "@/pages/documents/documentsDisplayDashboard/CardEmptyState";
import { Link } from "react-router-dom";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { IconButton } from "@/design-system/ui/Button/IconButton";
import { Card } from "@/design-system/ui/Card/Card";
import { List } from "@/design-system/ui/List/List";
import { ListItem } from "@/design-system/ui/List/List.Item";

import { useRecentDocuments } from "@/common/hooks/db/documents/queries/useGetRecentDocuments";

const DocumentsDisplayDashboard = () => {
  const { data: recentDocuments } = useRecentDocuments();
  return (
    <Flex className="w-full" wrap="flex-wrap" gap="gap-3">
      {/* Recent */}
      <Card className="min-h-[280px] max-h-[320px]">
        <Card.Header>
          <Card.Header.Title>Recent</Card.Header.Title>
        </Card.Header>
        <Card.Content>
          <List>
            {recentDocuments?.map((doc) => (
              <ListItem variant="nav" icon="file-text">
                <ListItem.Label>
                  {doc.name === "" ? "Doc" : doc.name}
                </ListItem.Label>
                {doc.in && <ListItem.SubText> ﹒ in {doc.in}</ListItem.SubText>}
                <ListItem.Action>
                  <IconButton
                    size="xSmallIcon"
                    variant="secondary"
                    icon="link"
                  />
                  <IconButton
                    render={(props) => (
                      <Link target="_blank" to={`/doc/${doc._id}`} {...props} />
                    )}
                    size="xSmallIcon"
                    variant="secondary"
                    icon="external-link"
                  />
                </ListItem.Action>
              </ListItem>
            ))}
          </List>
        </Card.Content>
      </Card>

      <Card className="min-h-[280px] max-h-[320px]">
        <Card.Header>
          <Card.Header.Title>Favorites</Card.Header.Title>
        </Card.Header>
        <Card.Content>
          <CardEmptyState title="No favorites found" />
        </Card.Content>
      </Card>
      <Card>
        <Card.Header>
          <Card.Header.Title>Created by me</Card.Header.Title>
        </Card.Header>
      </Card>
    </Flex>
  );
};

export default DocumentsDisplayDashboard;

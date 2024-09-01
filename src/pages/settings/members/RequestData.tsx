import { IconButton } from "@/design-system/ui/Button/IconButton";
import { Card } from "@/design-system/ui/Card/Card";
import { Table } from "@/design-system/ui/Table/Table";
import type { useGetAllRequests } from "@/common/hooks/useGetAllRequests";
import { Badge } from "@/design-system/ui/Badge/Badge";
import { Flex } from "@/design-system/layout/Flex/Flex";

type RequestDataProps = {
  getAllRequests: ReturnType<typeof useGetAllRequests>;
};

const RequestData = ({ getAllRequests }: RequestDataProps) => {
  const renderStatus = (req: (typeof getAllRequests)[number]) => {
    const isPending = !(req.isApproved || req.isDenied);
    if (isPending) {
      return <Badge variant="secondary">Pending</Badge>;
    }
    if (req.isApproved) {
      return <Badge variant="default">Approved</Badge>;
    }
    if (req.isDenied) {
      return <Badge variant="default">Declined</Badge>;
    }
  };

  return (
    <Card className="h-full">
      <Card.Header>
        <Card.Header.Title>Requests</Card.Header.Title>
        <Card.Header.Subtext>
          Accept, delete or declined member requests here
        </Card.Header.Subtext>
      </Card.Header>
      <Card.Content>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.Head>Name</Table.Head>
              <Table.Head>Email</Table.Head>
              <Table.Head>Time</Table.Head>
              <Table.Head>Status</Table.Head>
              <Table.Head>Actions</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {getAllRequests?.map((req) => (
              <Table.Row>
                <Table.Cell>{req.name}</Table.Cell>
                <Table.Cell>{req.email}</Table.Cell>
                <Table.Cell>{req._creationTime}</Table.Cell>
                <Table.Cell>{renderStatus(req)}</Table.Cell>
                <Table.Cell>
                  <Flex gap="gap-2">
                    <IconButton
                      size="smallIcon"
                      variant="default"
                      icon="Check"
                    />
                    <IconButton size="smallIcon" variant="secondary" icon="X" />
                    <IconButton
                      size="smallIcon"
                      variant="destructive"
                      icon="Trash"
                    />
                  </Flex>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card.Content>
    </Card>
  );
};

export default RequestData;

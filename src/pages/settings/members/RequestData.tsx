import { Flex } from "@/design-system/layout/Flex/Flex";
import { Badge } from "@/design-system/ui/Badge/Badge";
import { IconButton } from "@/design-system/ui/Button/IconButton";
import { Card } from "@/design-system/ui/Card/Card";
import { Table } from "@/design-system/ui/Table/Table";
import { Text } from "@/design-system/ui/Text/Text";

import { useAcceptRequest } from "@/common/hooks/db/requests/mutations/useAcceptRequest";
import { useGetAllRequests } from "@/common/hooks/db/requests/queries/useGetAllRequests";
import { formatTo } from "@/common/utils/date-utils";

type RequestDataProps = {
  getAllRequests: ReturnType<typeof useGetAllRequests>["data"];
};

const RequestData = ({ getAllRequests }: RequestDataProps) => {
  const { mutate: mutateAcceptRequest } = useAcceptRequest();

  const approveRequest = async (
    req: (typeof getAllRequests)[number]["req"],
  ) => {
    mutateAcceptRequest({
      requestId: req._id,
    });
  };

  const isPending = (req: (typeof getAllRequests)[number]["req"]) => {
    return !(req.isApproved || req.isDenied);
  };

  const renderStatus = (req: (typeof getAllRequests)[number]["req"]) => {
    if (isPending(req)) {
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
            {getAllRequests?.map(({ req, user }) => (
              <Table.Row key={req._id}>
                <Table.Cell>{user?.name}</Table.Cell>
                <Table.Cell>{user?.email}</Table.Cell>
                <Table.Cell>
                  {formatTo(req._creationTime, "MMM, dd yyyy")}
                </Table.Cell>
                <Table.Cell>{renderStatus(req)}</Table.Cell>
                <Table.Cell>
                  {isPending(req) ? (
                    <Flex gap="gap-2">
                      <IconButton
                        size="smallIcon"
                        variant="default"
                        icon="check"
                        onClick={() => approveRequest(req)}
                      />
                      <IconButton
                        size="smallIcon"
                        variant="secondary"
                        icon="x"
                      />
                      <IconButton
                        size="smallIcon"
                        variant="destructive"
                        icon="trash"
                      />
                    </Flex>
                  ) : (
                    <Text>-</Text>
                  )}
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

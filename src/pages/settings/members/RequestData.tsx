import { IconButton } from "@/design-system/ui/Button/IconButton";
import { Card } from "@/design-system/ui/Card/Card";
import { Table } from "@/design-system/ui/Table/Table";
import type { useGetAllRequests } from "@/common/hooks/useGetAllRequests";
import { Badge } from "@/design-system/ui/Badge/Badge";
import { Flex } from "@/design-system/layout/Flex/Flex";
import { formatTo } from "@/common/utils/date-utils";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Text } from "@/design-system/ui/Text/Text";

type RequestDataProps = {
  getAllRequests: ReturnType<typeof useGetAllRequests>;
};

const RequestData = ({ getAllRequests }: RequestDataProps) => {
  const acceptRequestMutation = useMutation(api.requests.acceptRequest);

  const approveRequest = async (
    req: (typeof getAllRequests)[number]["req"]
  ) => {
    await acceptRequestMutation({
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
                        icon="Check"
                        onClick={() => approveRequest(req)}
                      />
                      <IconButton
                        size="smallIcon"
                        variant="secondary"
                        icon="X"
                      />
                      <IconButton
                        size="smallIcon"
                        variant="destructive"
                        icon="Trash"
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

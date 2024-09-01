import type { useGetMembers } from "@/common/hooks/useGetMembers";
import { formatTo } from "@/common/utils/date-utils";
import { IconButton } from "@/design-system/ui/Button/IconButton";
import { Card } from "@/design-system/ui/Card/Card";
import { Table } from "@/design-system/ui/Table/Table";
import { capitalize } from "lodash-es";

type MemberDataProps = {
  members: ReturnType<typeof useGetMembers>["members"];
};

const MemberData = ({ members }: MemberDataProps) => {
  return (
    <Card className="h-full">
      <Card.Header>
        <Card.Header.Title>Members</Card.Header.Title>
        <Card.Header.Subtext>
          Manage organization members here
        </Card.Header.Subtext>
      </Card.Header>
      <Card.Content>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.Head>Name</Table.Head>
              <Table.Head>Email</Table.Head>
              <Table.Head>Role</Table.Head>
              <Table.Head>Joined</Table.Head>
              <Table.Head>Actions</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {members?.map(({ member, user }) => (
              <Table.Row>
                <Table.Cell>{user?.name}</Table.Cell>
                <Table.Cell>{user?.email}</Table.Cell>
                <Table.Cell>{capitalize(member.role)}</Table.Cell>
                <Table.Cell>
                  {formatTo(member._creationTime, "MMM, dd yyyy")}
                </Table.Cell>
                <Table.Cell>
                  <IconButton
                    size="smallIcon"
                    variant="secondary"
                    icon="Ellipsis"
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card.Content>
    </Card>
  );
};

export default MemberData;

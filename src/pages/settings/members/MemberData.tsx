import { IconButton } from "@/design-system/ui/Button/IconButton";
import { Card } from "@/design-system/ui/Card/Card";
import { Table } from "@/design-system/ui/Table/Table";

const MemberData = () => {
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
            <Table.Row>
              <Table.Cell>Rahul Punase</Table.Cell>
              <Table.Cell>rahulpunase@gmail.com</Table.Cell>
              <Table.Cell>admin</Table.Cell>
              <Table.Cell>some date</Table.Cell>
              <Table.Cell>
                <IconButton
                  size="smallIcon"
                  variant="secondary"
                  icon="Ellipsis"
                />
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Card.Content>
    </Card>
  );
};

export default MemberData;

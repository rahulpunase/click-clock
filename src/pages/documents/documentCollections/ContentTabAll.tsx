import TableEmptyState from "@/pages/documents/documentCollections/TableEmptyState";
import React from "react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Table } from "@/design-system/ui/Table/Table";

const ContentTabAll = () => {
  if (true) {
    return (
      <Flex justifyContent="justify-center" className="h-full">
        <TableEmptyState />
      </Flex>
    );
  }
  return (
    <Table>
      <Table.Header className="text-muted">
        <Table.Head>Name</Table.Head>
        <Table.Head>Location</Table.Head>
        <Table.Head>Tags</Table.Head>
        <Table.Head>Date updated</Table.Head>
        <Table.Head>Date viewed</Table.Head>
        <Table.Head>Sharing with</Table.Head>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Doc name</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

export default ContentTabAll;

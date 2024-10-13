import { groupBy } from "lodash-es";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Button } from "@/design-system/ui/Button/Button";
import { Dialog } from "@/design-system/ui/Dialog/Dialog";
import Icon from "@/design-system/ui/Icon/Icon";
import { Text } from "@/design-system/ui/Text/Text";

import StatusField from "@/pages/list/modals/StatusField";
import StatusItemToRender from "@/pages/list/modals/StatusItemToRender";

import { useUpdateStatuses } from "@/common/hooks/db/lists/mutations/useUpdateStatuses";
import { useGetListById } from "@/common/hooks/db/lists/queries/useGetListById";
import useGlobalDialogStore from "@/common/store/useGlobalDialogStore";
import { StatusItem } from "@/common/types";

import { DataModel } from "@db/_generated/dataModel";

const NewStatusEditModal = () => {
  const { data, dialog, hide } = useGlobalDialogStore();
  const listId = (data as DataModel["lists"]["document"])?._id;

  const { data: list } = useGetListById({
    listId,
  });

  const [isAdding, setIsAdding] = useState<string | null>();

  const [newItems, setNewItems] = useState<Record<string, StatusItem[]>>({});

  const [locallyDeleted, setLocallyDeleted] = useState<string[]>([]);

  const { mutate: updateStatus } = useUpdateStatuses();

  if (!list) {
    return;
  }

  const groupedStatues = groupBy(list.statuses, "type");

  const clickHandlerAdd = (str: string) => {
    if (isAdding) {
      return;
    }
    setIsAdding(str);
  };

  const onSuccessfullyFieldAdded = (statusKey: string, item: StatusItem) => {
    const newStatusItem = { ...newItems };
    if (statusKey in newStatusItem) {
      newStatusItem[statusKey].push(item);
    } else {
      newStatusItem[statusKey] = [item];
    }
    setNewItems(newStatusItem);
    setIsAdding(null);
  };

  const onDelete = (statusLabel: string) => {
    const newStatusItem = { ...newItems };
    Object.keys(newStatusItem).forEach((key) => {
      const items = newStatusItem[key];
      const indexItem = items.findIndex((ind) => ind.label === statusLabel);
      if (indexItem >= 0) {
        items.splice(indexItem, 1);
      }
    });
    setNewItems(newStatusItem);
  };

  const onChangesApply = () => {
    const allNewStatus = Object.values(newItems).reduce((prev, acc) => {
      return [...acc, ...prev];
    }, []);

    updateStatus(
      {
        listId: list._id,
        statuses: allNewStatus,
      },
      {
        onSuccess: () => setNewItems({}),
      },
    );
  };

  const onSetLocallyDeleted = (label: string) => {
    const itemIndex = locallyDeleted.findIndex((item) => item === label);
    if (itemIndex >= 0) {
      const newLocallyDeleted = [...locallyDeleted];
      newLocallyDeleted.splice(itemIndex, 1);
      return setLocallyDeleted(newLocallyDeleted);
    }
    setLocallyDeleted((prev) => [...prev, ...[label]]);
  };

  return (
    <Dialog open={dialog === "list-status"} onOpenChange={() => hide()}>
      <Dialog.Content>
        <Dialog.Content.Header>
          <Dialog.Content.Header.Title>
            Status settings
          </Dialog.Content.Header.Title>
          <Dialog.Content.Header.Description>
            Status help you track your tasks better
          </Dialog.Content.Header.Description>
        </Dialog.Content.Header>
        <Dialog.Content.Main>
          <Flex direction="flex-col" gap="gap-4">
            <Text variant="subtext-1">Statuses</Text>
            {Object.keys(groupedStatues).map((key) => {
              const statusItem = groupedStatues[key];
              return (
                <Flex direction="flex-col" gap="gap-2">
                  <Text variant="subtext">{key}</Text>
                  {statusItem.map((status) => (
                    <StatusItemToRender
                      isLocallyDeleted={locallyDeleted.includes(status.label)}
                      dbDeletable={status.deletable}
                      setDbLocallyDeleted={() =>
                        onSetLocallyDeleted(status.label)
                      }
                      status={status}
                    />
                  ))}
                  {newItems[key]?.map((status) => (
                    <StatusItemToRender
                      deletable
                      onDelete={onDelete}
                      status={status}
                    />
                  ))}
                  <Flex
                    as={isAdding === key ? "div" : "button"}
                    className="p-2 border border-accent-border border-dashed rounded-md"
                    gap="gap-2"
                    alignItems="items-center"
                    onClick={() => clickHandlerAdd(key)}
                  >
                    <Icon IconName={PlusCircle} className="size-4" />
                    {isAdding === key ? (
                      <StatusField
                        groupKey={key}
                        onCancel={() => setIsAdding(null)}
                        onSuccessfullyFieldAdded={onSuccessfullyFieldAdded}
                      />
                    ) : (
                      <Text variant="body-1">Add status</Text>
                    )}
                  </Flex>
                </Flex>
              );
            })}
          </Flex>
        </Dialog.Content.Main>
        <Dialog.Content.Footer>
          <Flex gap="gap-2">
            <Button variant="outline" size="sm">
              Cancel
            </Button>
            <Button size="sm" onClick={onChangesApply}>
              Apply changes
            </Button>
          </Flex>
        </Dialog.Content.Footer>
      </Dialog.Content>
    </Dialog>
  );
};

export default NewStatusEditModal;

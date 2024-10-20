import { groupBy, isEqual } from "lodash-es";
import { PlusCircle } from "lucide-react";
import { ComponentProps, useEffect, useMemo, useState } from "react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Button } from "@/design-system/ui/Button/Button";
import { Dialog } from "@/design-system/ui/Dialog/Dialog";
import Icon from "@/design-system/ui/Icon/Icon";
import IconSelector from "@/design-system/ui/IconSelector/IconSelector";
import { Text } from "@/design-system/ui/Text/Text";

import StatusField from "@/pages/list/modals/StatusField";
import StatusItemToRender from "@/pages/list/modals/StatusItemToRender";

import { useUpdateStatuses } from "@/common/hooks/db/lists/mutations/useUpdateStatuses";
import { useGetListById } from "@/common/hooks/db/lists/queries/useGetListById";
import useGlobalDialogStore from "@/common/store/useGlobalDialogStore";
import { LocalStatuses, StatusItem } from "@/common/types";

import { Doc } from "@db/_generated/dataModel";

const NewStatusEditModal = () => {
  const { data, dialog, hide } = useGlobalDialogStore();
  const listId = (data as Doc<"lists">)._id;

  const { data: list } = useGetListById({
    listId,
  });
  const listStatuses = useMemo(() => list?.statuses ?? [], [list?.statuses]);

  const [localStatuses, setLocalStatuses] = useState<LocalStatuses>([]);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (listStatuses) {
      console.log("this worked?");
      setLocalStatuses(JSON.parse(JSON.stringify(listStatuses)));
    }
  }, [listStatuses]);

  const groupedStatuses = groupBy(localStatuses, "type");

  const [isAdding, setIsAdding] = useState<string | null>();

  const { mutate: updateStatus } = useUpdateStatuses();

  if (!list) {
    return;
  }

  const clickHandlerAdd = (str: string) => {
    if (isAdding) {
      return;
    }
    setIsAdding(str);
  };

  const onSuccessfullyFieldAdded = (statusKey: string, item: StatusItem) => {
    if (!localStatuses) {
      return;
    }

    const _localStatuses = [...localStatuses];
    if (_localStatuses.find((_item) => isEqual(item.label, _item.label))) {
      return setError("Label already exists");
    }

    _localStatuses.push({
      color: "",
      icon: "",
      deletable: true,
      label: item.label,
      type: statusKey,
      local: true,
    });

    setLocalStatuses(_localStatuses);
    setIsAdding(null);
  };

  const onChangesApply = () => {
    updateStatus(
      {
        listId,
        statuses: localStatuses
          .filter((status) => !status.deleted)
          .map((status) => ({
            color: status.color,
            deletable: status.deletable,
            icon: status.icon,
            label: status.label,
            type: status.type,
          })),
      },
      {
        onSuccess: () => {
          setError(null);
        },
      },
    );
  };

  const onDelete = (label: string) => {
    if (!localStatuses) {
      return;
    }

    const _localStatuses = [...localStatuses];
    const itemIndex = _localStatuses.findIndex((item) =>
      isEqual(item.label, label),
    );

    if (itemIndex >= 0) {
      if (
        _localStatuses[itemIndex].deletable &&
        !_localStatuses[itemIndex].local
      ) {
        _localStatuses[itemIndex].deleted = true;
        return setLocalStatuses(_localStatuses);
      }

      _localStatuses.splice(itemIndex, 1);
      return setLocalStatuses(_localStatuses);
    }
  };

  const onReset = (label: string) => {
    if (!localStatuses) {
      return;
    }

    const _localStatuses = [...localStatuses];
    const itemIndex = _localStatuses.findIndex((item) =>
      isEqual(item.label, label),
    );
    if (itemIndex >= 0) {
      _localStatuses[itemIndex].deleted = false;
      return setLocalStatuses(_localStatuses);
    }
  };

  const onIconChange = (
    params: Parameters<ComponentProps<typeof IconSelector>["onChange"]>["0"],
    label: string,
  ) => {
    if (!localStatuses) {
      return;
    }
    const _localStatuses = [...localStatuses];
    const index = _localStatuses.findIndex((_item) =>
      isEqual(label, _item.label),
    );
    if (index === -1) {
      return;
    }
    if (params.type === "color") {
      _localStatuses[index].color = params.value;
    }
    if (params.type === "icon") {
      _localStatuses[index].icon = params.value;
    }

    setLocalStatuses(_localStatuses);
  };

  const shouldDisabled = isEqual(listStatuses, localStatuses);

  return (
    <Dialog open={dialog === "list-status"} onOpenChange={hide}>
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
            {Object.keys(groupedStatuses).map((key) => {
              const statusItem = groupedStatuses[key];
              return (
                <Flex direction="flex-col" gap="gap-2" key={key}>
                  <Text variant="subtext">{key}</Text>
                  {statusItem?.map((status) => (
                    <StatusItemToRender
                      key={status.label}
                      onDelete={onDelete}
                      onReset={onReset}
                      status={status}
                      onIconChange={onIconChange}
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
                        onCancel={() => {
                          setError(null);
                          setIsAdding(null);
                        }}
                        onSuccessfullyFieldAdded={onSuccessfullyFieldAdded}
                        error={error}
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
            <Button
              size="sm"
              onClick={onChangesApply}
              disabled={shouldDisabled}
            >
              Apply changes
            </Button>
          </Flex>
        </Dialog.Content.Footer>
      </Dialog.Content>
    </Dialog>
  );
};

export default NewStatusEditModal;

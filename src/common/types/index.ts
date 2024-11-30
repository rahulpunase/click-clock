import { Doc, Id } from "@db/_generated/dataModel";

export enum GroupListBy {
  Status = "status",
  Priority = "priority",
  Assignee = "assignee",
}

export enum SortBy {
  Ascending = "asc",
  Descending = "desc",
}

export type StatusItem = {
  type: string;
  icon: string;
  color: string;
  label: string;
  deletable: boolean;
};

export type LocalStatuses = (StatusItem & {
  local: boolean;
  deleted?: boolean;
})[];

export type EditableFieldsAdditionalProps = {
  disabled?: boolean;
  defaultValue?: string;
  placeholder?: string;
  onValChange?: (val: string) => void;
};

export type FolderMapObject = Doc<"folders"> & {
  items: (Doc<"items"> | FolderMapObject)[];
};

export type ActualItem = Doc<"documents"> | Doc<"lists"> | null;

export type ItemWithActualItem = Doc<"items"> & {
  actualItem: ActualItem;
};

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

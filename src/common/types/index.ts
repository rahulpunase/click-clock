import { DataModel } from "@db/_generated/dataModel";

export type GroupListBy = "status" | "assignee";

export type StatusItem = {
  type: string;
  icon: string;
  color: string;
  label: string;
  deletable: boolean;
};

import groupBy from "lodash-es/groupBy";
import {
  Bookmark,
  Check,
  CheckCheck,
  CircleCheck,
  CircleCheckBig,
  Laugh,
  ListCheck,
  ListChecks,
  Loader,
  ShieldCheck,
} from "lucide-react";

export const IconSelectorColors = [
  "#ff0000",
  "#ff8700",
  "#ffd300",
  "#a1ff0a",
  "#0aff99",
  "#a167a5",
  "#147df5",
  "#580aff",
  "#be0aff",
  "#4f518c",
];

export const AllSelectorIcons = {
  loader: {
    icon: Loader,
    group: "In progress",
  },
  bookmark: {
    icon: Bookmark,
    group: "In progress",
  },
  laugh: {
    icon: Laugh,
    group: "In progress",
  },
  check: {
    icon: Check,
    group: "Complete",
  },
  "check-check": {
    icon: CheckCheck,
    group: "Complete",
  },
  "circle-check": {
    icon: CircleCheck,
    group: "Complete",
  },
  "circle-check-big": {
    icon: CircleCheckBig,
    group: "Complete",
  },
  "list-check": {
    icon: ListCheck,
    group: "Complete",
  },
  "list-checks": {
    icon: ListChecks,
    group: "Complete",
  },
  "shield-check": {
    icon: ShieldCheck,
    group: "Complete",
  },
};

export const AllSelectorIconsByGroup = groupBy(
  Object.keys(AllSelectorIcons).map((key) => ({
    key,
    ...AllSelectorIcons[key as keyof typeof AllSelectorIcons],
  })),
  "group",
);

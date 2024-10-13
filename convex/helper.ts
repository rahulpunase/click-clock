import { ConvexError } from "convex/values";

import { Doc } from "./_generated/dataModel";

export function makeRandomId(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export function AppConvexError(message: string, code: 429 | 401 | 403 = 429) {
  return new ConvexError({
    message,
    code,
  });
}

export function getStatuses(
  byRequirement: "project" | "marketing",
): Doc<"lists">["statuses"] {
  if (byRequirement === "project") {
    return [
      {
        color: "#808080",
        icon: "",
        label: "Stopped",
        type: "Not started",
        deletable: false,
      },
      {
        color: "#007200",
        icon: "",
        label: "In progress",
        type: "Started",
        deletable: false,
      },
      {
        color: "#ffcc66",
        icon: "",
        label: "In QA",
        type: "Started",
        deletable: false,
      },
      {
        color: "#ff6666",
        icon: "",
        label: "Blocked",
        type: "Stopped",
        deletable: false,
      },
    ];
  }
}

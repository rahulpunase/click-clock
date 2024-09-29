import { differenceInDays } from "date-fns";
import { groupBy } from "lodash-es";
import isEmpty from "lodash-es/isEmpty";

import type { useGetAllMessages } from "@/common/hooks/db/messages/queries/useGetAllMessages";
import { formatTo, getDayFormat } from "@/common/utils/date-utils";
import { makeRandomId } from "@/common/utils/misc-utils";

import { Doc, Id } from "@db/_generated/dataModel";

export function isAdmin(member: Doc<"channelMembers">) {
  return member.role === "admin";
}

export function isMemberLoggedInUser(
  member: Doc<"channelMembers">,
  userId?: Id<"users">,
) {
  return member.userId === userId;
}

export function isGeneralChannel(channel: Doc<"channels">) {
  return channel.isGeneral;
}

type MessageMap = Record<
  string,
  {
    order: number;
    user: ReturnType<typeof useGetAllMessages>["data"][number]["user"];
    items: ReturnType<typeof useGetAllMessages>["data"];
  }
>;

function convertMapToAnArray(map: MessageMap) {
  return Object.keys(map).map((key) => ({
    key,
    ...map[key],
  }));
}

/**
 * Groups messages based on the user who created them in the order they appear.
 *
 * @param messages - The array of messages to be grouped.
 * @returns A record object where keys are unique user IDs and values are arrays of messages created by that user.
 */
function groupMessagesAsPerUserInOrder(
  messages: ReturnType<typeof useGetAllMessages>["data"],
) {
  const map: MessageMap = {};
  let previousCreatedBy = "";
  let randomId = "";
  let prevOrder = 0;
  let previousMessage = messages[0];

  messages.forEach((message) => {
    const createdBy = message.createdByUserId;

    const shouldCreateNewGroup =
      createdBy !== previousCreatedBy ||
      differenceInDays(message._creationTime, previousMessage._creationTime) >=
        1;

    if (isEmpty(map) || shouldCreateNewGroup) {
      const random = makeRandomId(8);
      randomId = `${createdBy}_${random}`;
      previousCreatedBy = createdBy;
      prevOrder++;
      map[randomId] = {
        order: prevOrder,
        user: message.user,
        items: [{ ...message }],
      };
    } else {
      map[randomId] = {
        ...map[randomId],
        user: message.user,
        items: [...map[randomId].items, message],
      };
    }

    previousMessage = message;
  });

  return convertMapToAnArray(map);
}

export function prepareMessageToRender(
  messages: ReturnType<typeof useGetAllMessages>["data"],
) {
  const mappedMessages = messages.map((message) => ({
    ...message,
    day: formatTo(message._creationTime, "MMM, dd yyyy"),
    dayFormat: getDayFormat(message._creationTime),
    date: formatTo(message._creationTime, "MMM dd, hh:mm a"),
  }));

  const group = groupBy(mappedMessages, "dayFormat");

  const groupKeys = Object.keys(group);

  const groupedByTimeMap: Record<
    string,
    ReturnType<typeof groupMessagesAsPerUserInOrder>
  > = {};
  groupKeys.map((key) => {
    const actItem = group[key];
    groupedByTimeMap[key] = groupMessagesAsPerUserInOrder(actItem);
  });

  return groupedByTimeMap;
}

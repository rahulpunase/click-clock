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

/**
 * Groups messages based on the user who created them in the order they appear.
 *
 * @param messages - The array of messages to be grouped.
 * @returns A record object where keys are unique user IDs and values are arrays of messages created by that user.
 */
export function groupMessagesAsPerUserInOrder(
  messages: ReturnType<typeof useGetAllMessages>["data"],
) {
  const map: Record<
    string,
    {
      order: number;
      user: (typeof messages)[number]["user"];
      items: typeof messages;
    }
  > = {};
  let previousCreatedBy = "";
  let randomId = "";
  let prevOrder = 0;
  messages.forEach((message) => {
    const createdBy = message.createdByUserId;
    if (isEmpty(map)) {
      const random = makeRandomId(8);
      randomId = `${createdBy}_${random}`;
      previousCreatedBy = message.createdByUserId;
      map[randomId] = {
        order: prevOrder,
        user: message.user,
        items: [{ ...message }],
      };
    } else {
      if (createdBy === previousCreatedBy) {
        map[randomId] = {
          ...map[randomId],
          user: message.user,
          items: [...map[randomId].items, ...[message]],
        };
      } else {
        const createdBy = message.createdByUserId;
        const random = makeRandomId(8);
        randomId = `${createdBy}_${random}`;
        previousCreatedBy = message.createdByUserId;
        prevOrder++;
        map[randomId] = {
          order: prevOrder,
          user: message.user,
          items: [{ ...message }],
        };
      }
    }
  });
  return map;
}

type ItemReturnType =
  | {
      itemType: "message";
      item: ReturnType<typeof useGetAllMessages>["data"][number] & {
        getDayFormat: string;
        date: string;
        day: string;
      };
    }
  | {
      itemType: "divider";
      item: {
        label: string;
      };
    };

/**
 * Prepares messages to render by mapping them with additional information like formatted date and day.
 * Groups the messages by day format and adds dividers between different days.
 *
 * @param messages - The array of messages to be prepared for rendering.
 * @returns An object containing messages grouped by day format with dividers between different days.
 */
export function prepareMessagesToRender(
  messages: ReturnType<typeof useGetAllMessages>["data"],
) {
  groupMessagesAsPerUserInOrder(messages);
  const mapMessagesAsPerTheTime: ItemReturnType[] = messages.map((message) => ({
    item: {
      ...message,
      getDayFormat: getDayFormat(message._creationTime),
      day: formatTo(message._creationTime, "MMM, dd yyyy"),
      date: formatTo(message._creationTime, "MMM dd, hh:mm a"),
    },
    itemType: "message",
  }));

  const groupedByDayFormat = groupBy(
    mapMessagesAsPerTheTime,
    "item.getDayFormat",
  );

  Object.keys(groupedByDayFormat).forEach((dayFormatKey) => {
    groupedByDayFormat[dayFormatKey].unshift({
      itemType: "divider",
      item: {
        label: dayFormatKey,
      },
    });
  });

  return groupedByDayFormat;
}

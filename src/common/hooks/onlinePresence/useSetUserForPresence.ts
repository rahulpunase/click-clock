import { groupBy } from "lodash-es";
import cloneDeep from "lodash-es/cloneDeep";
import { create } from "zustand";

import type { useGetOnlineUsers } from "@/common/hooks/db/presence/queries/useGetOnlineUsers";

type DataType = ReturnType<typeof useGetOnlineUsers>["data"];

type Store = {
  users: Record<string, number>;
  subscribeUserForPresence: (userId: string) => void;
  unSubscribeUserForPresence: (userId: string) => void;

  onlineUserData: Record<string, DataType>;
  setOnlineUserData: (data: DataType) => void;
};

const useSetUserForPresence = create<Store>()((set) => ({
  users: {},
  subscribeUserForPresence: (userId: string) =>
    set((state) => {
      return {
        users: {
          ...state.users,
          [userId]: !state.users[userId] ? 1 : state.users[userId] + 1,
        },
      };
    }),

  unSubscribeUserForPresence: (userId: string) =>
    set((state) => {
      const isLast = state.users[userId] === 1;
      if (isLast) {
        const newUsers = cloneDeep(state.users);
        delete newUsers[userId];

        console.log(newUsers);

        return {
          users: {
            ...newUsers,
          },
        };
      }
      return {
        users: {
          ...state.users,
          [userId]: state.users[userId] - 1,
        },
      };
    }),

  onlineUserData: {},
  setOnlineUserData: (data: DataType) =>
    set((state) => {
      if (!data) {
        return state;
      }
      const map = groupBy(data, "userId");
      return {
        onlineUserData: map,
      };
    }),
}));

export default useSetUserForPresence;

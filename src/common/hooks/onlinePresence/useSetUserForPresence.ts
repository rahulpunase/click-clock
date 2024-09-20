import { groupBy } from "lodash-es";
import { create } from "zustand";

import type { useGetOnlineUsers } from "@/common/hooks/db/presence/queries/useGetOnlineUsers";

type DataType = ReturnType<typeof useGetOnlineUsers>["data"];

type Store = {
  users: Record<string, undefined>;
  setUsers: (userId: string) => void;

  onlineUserData: Record<string, DataType>;
  setOnlineUserData: (data: DataType) => void;
};

const useSetUserForPresence = create<Store>()((set) => ({
  users: {},
  setUsers: (userId: string) =>
    set((state) => {
      if (state.users[userId]) {
        return state;
      }

      const newMap = {
        [userId]: undefined,
      };
      return {
        users: {
          ...state.users,
          ...newMap,
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

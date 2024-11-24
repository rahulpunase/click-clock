import { createContext, useContext } from "react";

import { useDialogStore } from "@/design-system/ui/Dialog/useDialogStore";

import { Id } from "@db/_generated/dataModel";

export type NewFolderModalStoreData = {
  spaceId: Id<"spaces">;
  folderId?: Id<"folders">;
  parentFolderId?: Id<"folders">;
  flow: "new" | "edit";
};

export type NewListModalStoreData = {
  spaceId: Id<"spaces">;
  parentFolderId?: Id<"folders">;
  flow: "new" | "edit";
};

export type NewSpaceModalStoreData = {
  spaceId?: string;
  flow: "new" | "edit";
};

type AllGlobalDialogContextType = {
  createNewFolderModalStore: ReturnType<
    typeof useDialogStore<NewFolderModalStoreData>
  >;
  createNewSpaceModalStore: ReturnType<
    typeof useDialogStore<NewSpaceModalStoreData>
  >;
  createNewListModalStore: ReturnType<
    typeof useDialogStore<NewListModalStoreData>
  >;
};

const AllGlobalModalContext = createContext<
  AllGlobalDialogContextType | undefined
>(undefined);

export const useGlobalModalContext = () => {
  const context = useContext(AllGlobalModalContext);
  if (context === undefined) {
    throw new Error("Use useGlobalModalContext inside AllGlobalModalContext");
  }
  return context;
};

export default AllGlobalModalContext;

import { createContext, useContext } from "react";

import type { useDialogStore } from "@/design-system/ui/Dialog/useDialogStore";

import { Id } from "@db/_generated/dataModel";

export type NewFolderModalStoreData = {
  spaceId: Id<"spaces">;
  folderId?: Id<"folders">;
  parentFolderId?: Id<"folders">;
  flow: "new" | "edit";
};

export type NewSpaceModalStoreData = {
  spaceId?: string;
  flow: "new" | "edit";
};

type SpaceContext = {
  createSpaceModalStore: ReturnType<
    typeof useDialogStore<NewSpaceModalStoreData>
  >;
  createNewFolderModalStore: ReturnType<
    typeof useDialogStore<NewFolderModalStoreData>
  >;
};

export const useSpaceContext = () => {
  const context = useContext(SpaceContext);
  if (context === undefined) {
    throw new Error("Use useSpaceContext inside SpaceContextProvider");
  }
  return context;
};

export const SpaceContext = createContext<SpaceContext | undefined>(undefined);

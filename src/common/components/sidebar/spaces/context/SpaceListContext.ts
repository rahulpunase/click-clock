import { createContext, useContext } from "react";

import type { useDialogStore } from "@/design-system/ui/Dialog/useDialogStore";

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

type SpaceContextProps = {
  createSpaceModalStore: ReturnType<
    typeof useDialogStore<NewSpaceModalStoreData>
  >;
  createNewFolderModalStore: ReturnType<
    typeof useDialogStore<NewFolderModalStoreData>
  >;
  createNewListModalStore: ReturnType<
    typeof useDialogStore<NewListModalStoreData>
  >;
};

export const useSpaceContext = () => {
  const context = useContext(SpaceContext);
  if (context === undefined) {
    throw new Error("Use useSpaceContext inside SpaceContextProvider");
  }
  return context;
};

export const SpaceContext = createContext<SpaceContextProps | undefined>(
  undefined,
);

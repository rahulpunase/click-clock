import { PropsWithChildren, useMemo } from "react";

import { useDialogStore } from "@/design-system/ui/Dialog/useDialogStore";

import {
  NewFolderModalStoreData,
  NewSpaceModalStoreData,
  SpaceContext,
} from "@/common/components/sidebar/spaces/context/SpaceListContext";
import { CreateNewFolderModal } from "@/common/components/sidebar/spaces/modals/CreateNewFolderModal";
import { CreateNewSpaceModal } from "@/common/components/sidebar/spaces/modals/CreateNewSpaceModal";

const SpaceContextProvider = ({ children }: PropsWithChildren) => {
  const createSpaceModalStore = useDialogStore<NewSpaceModalStoreData>();
  const createNewFolderModalStore = useDialogStore<NewFolderModalStoreData>();

  const value = useMemo(() => {
    return {
      createSpaceModalStore,
      createNewFolderModalStore,
    };
  }, [createSpaceModalStore, createNewFolderModalStore]);
  return (
    <SpaceContext.Provider value={value}>
      {children}
      {createSpaceModalStore.open && <CreateNewSpaceModal />}
      {createNewFolderModalStore.open && <CreateNewFolderModal />}
    </SpaceContext.Provider>
  );
};

export { SpaceContextProvider };

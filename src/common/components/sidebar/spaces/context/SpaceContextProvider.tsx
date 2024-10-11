import { PropsWithChildren, useMemo } from "react";

import { useDialogStore } from "@/design-system/ui/Dialog/useDialogStore";

import {
  NewFolderModalStoreData,
  NewListModalStoreData,
  NewSpaceModalStoreData,
  SpaceContext,
} from "@/common/components/sidebar/spaces/context/SpaceListContext";
import { CreateNewFolderModal } from "@/common/components/sidebar/spaces/modals/CreateNewFolderModal";
import { CreateNewListModal } from "@/common/components/sidebar/spaces/modals/CreateNewListModal";
import { CreateNewSpaceModal } from "@/common/components/sidebar/spaces/modals/CreateNewSpaceModal";

const SpaceContextProvider = ({ children }: PropsWithChildren) => {
  const createSpaceModalStore = useDialogStore<NewSpaceModalStoreData>();
  const createNewFolderModalStore = useDialogStore<NewFolderModalStoreData>();
  const createNewListModalStore = useDialogStore<NewListModalStoreData>();

  const value = useMemo(() => {
    return {
      createSpaceModalStore,
      createNewFolderModalStore,
      createNewListModalStore,
    };
  }, [
    createSpaceModalStore,
    createNewFolderModalStore,
    createNewListModalStore,
  ]);
  return (
    <SpaceContext.Provider value={value}>
      {children}
      <CreateNewSpaceModal />
      {createNewFolderModalStore.open && <CreateNewFolderModal />}
      <CreateNewListModal />
    </SpaceContext.Provider>
  );
};

export { SpaceContextProvider };

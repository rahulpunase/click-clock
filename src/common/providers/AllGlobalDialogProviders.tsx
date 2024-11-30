import { PropsWithChildren } from "react";

import { useDialogStore } from "@/design-system/ui/Dialog/useDialogStore";

import CreateNewFolderModal from "@/common/components/modals/CreateNewFolderModal";
import CreateNewListModal from "@/common/components/modals/CreateNewListModal";
import CreateNewSpaceModal from "@/common/components/modals/CreateNewSpaceModal";
import AllGlobalModalContext, {
  type NewFolderModalStoreData,
  type NewListModalStoreData,
  type NewSpaceModalStoreData,
} from "@/common/hooks/useGlobalModalContext";

const AllGlobalModalProviders = ({ children }: PropsWithChildren) => {
  const createNewSpaceModalStore = useDialogStore<NewSpaceModalStoreData>();
  const createNewFolderModalStore = useDialogStore<NewFolderModalStoreData>();
  const createNewListModalStore = useDialogStore<NewListModalStoreData>();
  return (
    <AllGlobalModalContext.Provider
      value={{
        createNewFolderModalStore,
        createNewSpaceModalStore,
        createNewListModalStore,
      }}
    >
      {children}
      <CreateNewFolderModal />
      {createNewListModalStore.open && <CreateNewListModal />}
      {createNewSpaceModalStore.open && <CreateNewSpaceModal />}
    </AllGlobalModalContext.Provider>
  );
};

export default AllGlobalModalProviders;

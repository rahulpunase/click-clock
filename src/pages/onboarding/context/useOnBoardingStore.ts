import { useContext } from "react";
import { useStore } from "zustand";

import {
  OnBoardingContext,
  OnBoardingStoreContent,
} from "@/pages/onboarding/context/OnBoardingContext";

function useOnBoardingStore<T>(selector: (state: OnBoardingStoreContent) => T) {
  const store = useContext(OnBoardingContext);
  if (!store) {
    throw new Error("Missing OnBoarding store provider");
  }
  return useStore(store, selector);
}

export default useOnBoardingStore;

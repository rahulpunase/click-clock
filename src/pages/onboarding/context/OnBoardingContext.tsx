import { createContext, PropsWithChildren, useRef } from "react";
import { createStore } from "zustand";

import { options } from "@/pages/onboarding/utils/constants";

export type OnBoardingStoreContent = {
  selectedPersona: (typeof options)[number];
  setSelectedPersona: (persona: (typeof options)[number]) => void;

  noOfEmployees: number;
  setNumberOfEmployees: (no: number) => void;
};

export const OnboardingStore = createStore<OnBoardingStoreContent>()((set) => ({
  selectedPersona: "work",
  setSelectedPersona: (persona: (typeof options)[number]) =>
    set({
      selectedPersona: persona,
    }),
  noOfEmployees: 10,
  setNumberOfEmployees: (no: number) =>
    set({
      noOfEmployees: no,
    }),
}));

type OnboardingStoreType = typeof OnboardingStore;

export const OnBoardingContext = createContext<OnboardingStoreType | undefined>(
  undefined,
);

export const OnBoardingStoreProvider = ({ children }: PropsWithChildren) => {
  const storeRef = useRef<OnboardingStoreType>(OnboardingStore);

  return (
    <OnBoardingContext.Provider value={storeRef.current}>
      {children}
    </OnBoardingContext.Provider>
  );
};

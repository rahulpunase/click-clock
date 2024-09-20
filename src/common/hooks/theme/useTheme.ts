import { create } from "zustand";

type Store = {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
};

const useTheme = create<Store>()((set) => ({
  theme: "light",
  setTheme: (theme) =>
    set((state) => {
      localStorage.setItem("theme", theme);
      const html = document.querySelector("html");
      html?.setAttribute("theme-preference", theme);
      return {
        ...state,
        theme,
      };
    }),
}));

export default useTheme;

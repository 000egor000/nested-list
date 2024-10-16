import { create } from "zustand";
import { useStoreThemeT, initialStateThemeT } from "../App.types";

const initialStateTheme: initialStateThemeT = {
  theme: false,
};

const useStoreTheme = create<useStoreThemeT>((set, get) => ({
  ...initialStateTheme,

  changeTheme: () => {
    set({
      theme: !get().theme,
    });
  },
}));

export { useStoreTheme };

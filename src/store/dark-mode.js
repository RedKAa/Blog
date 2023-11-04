import create from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { getTheme } from "../utils/utils";


export const useDarkModeStore = create((set, get) => ({
  mode: getTheme(),
  setMode: (mode) => set({ mode }),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("DarkStore", useDarkModeStore);
}

import { create } from "zustand";
import { mokeData } from "./const";
import {
  childrenT,
  statisticInitT,
  useStoreT,
  initialStateT,
} from "./App.types";

import { handleClickAdd, handleClickRemove, countParents } from "./helpers";

const initialState: initialStateT = {
  mokeData,
  statistics: countParents(mokeData) as unknown as statisticInitT,
};

const useStore = create<useStoreT>((set, get) => ({
  ...initialState,

  addItems: (el: childrenT | "newParent" | undefined) => () => {
    const res = handleClickAdd(get().mokeData, el)();
    set({
      mokeData: res,
      statistics: countParents(res) as unknown as statisticInitT,
    });
  },

  removeItems: (el: childrenT) => () => {
    const res = handleClickRemove(get().mokeData, el)();
    set({
      mokeData: res,
      statistics: countParents(res) as unknown as statisticInitT,
    });
  },
  clearItems: ()  => {
    set({ mokeData: [], statistics: { Родители: "0", Дети: "0" } });
  },
}));

export { useStore };

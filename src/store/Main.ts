import { create } from "zustand";
import { mokeData } from "../const";
import {
  childrenT,
  statisticInitT,
  useStoreT,
  initialStateT,
} from "../App.types";

import { handleClickAdd, handleClickRemove, countParents } from "../helpers";

const initialState: initialStateT = {
  mokeData,
  statistics: countParents(mokeData) as unknown as statisticInitT,
};

const useStore = create<useStoreT>((set, get) => ({
  ...initialState,

  // Вспомогательная функция для обновления состояния
  updateState: (newData: typeof mokeData) => {
    set({
      mokeData: newData,
      statistics: countParents(newData) as unknown as statisticInitT,
    });
  },

  addItems: (el: childrenT | "newParent" | undefined) => () => {
    const res = handleClickAdd(get().mokeData, el)();
    get().updateState(res);
  },

  removeItems: (el: childrenT) => () => {
    const res = handleClickRemove(get().mokeData, el)();
    get().updateState(res);
  },

  clearItems: () => {
    set({ mokeData: [], statistics: { Родители: "0", Дети: "0" } });
  },
}));

export { useStore };

import { create } from "zustand";
import { mokeData } from "../const";
import {
  childrenT,
  statisticInitT,
  useStoreT,
  initialStateT,
} from "../App.types";

import {
  handleClickAdd,
  handleClickRemove,
  countParents,
  getTargetId,
  generateMokeData,
} from "../helpers";

const initialState: initialStateT = {
  mokeData,
  statistics: countParents(mokeData) as unknown as statisticInitT,
  idFocus: null,
};

const useStore = create<useStoreT>((set, get) => ({
  ...initialState,

  // Обновление состояния с новыми данными
  updateState: (newData: typeof mokeData) => {
    set({
      mokeData: newData,
      statistics: countParents(newData) as unknown as statisticInitT,
    });
  },

  // Обновление моков
  generateMoke: () => {
    get().updateState(generateMokeData(3));
  },

  // Добавление элемента
  addItem: (el: childrenT | "newParent" | undefined) => () => {
    const newData = handleClickAdd(get().mokeData, el)();
    get().updateState(newData);
  },

  // Удаление элемента
  removeItem: (el: childrenT) => () => {
    const newData = handleClickRemove(get().mokeData, el)();
    get().updateState(newData);
  },

  // Очистка всех элементов
  clearItems: () => {
    set({ mokeData: [], statistics: { Родители: "0", Дети: "0" } });
  },

  // Поиск ID
  searchId: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined
  ) => {
    const parentElement = event?.currentTarget?.parentElement;
    if (!parentElement) return;

    const targetId = getTargetId(parentElement, get().mokeData);
    set({ idFocus: targetId });
  },
}));

export { useStore };

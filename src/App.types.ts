export type mokeDataT = {
  id: string;
  children?: childrenT[];
};
export type statisticInitT = {
  Родители: string;
  Дети: string;
};

export type useStoreT = {
  mokeData: mokeDataT[];
  statistics: statisticInitT;
  addItems: (el: childrenT | "newParent" | undefined) => () => void;
  removeItems: (el: childrenT) => () => void;
  clearItems: () => void;
};
export type initialStateT = {
  mokeData: mokeDataT[];
  statistics: statisticInitT;
};

export type childrenT = {
  id: string;
  idParents?: string;
  children?: childrenT[];
};

export type NoDataPropsT = {
  addItem: () => void;
};
export type WraperPropsT = {
  children: React.ReactNode;
};

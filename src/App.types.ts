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
  updateState: (el: mokeDataT[])  => void;
};

export type useStoreThemeT = {
  theme: boolean;
  changeTheme: () => void;
};
export type initialStateT = {
  mokeData: mokeDataT[];
  statistics: statisticInitT;
};
export type initialStateThemeT = {
  theme: boolean;
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

export type initThemeT = Record<string, { title: string; svg: JSX.Element }>;

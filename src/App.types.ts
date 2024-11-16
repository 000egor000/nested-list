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
  idFocus: string | null;
  updateState: (newData: mokeDataT[]) => void;
  addItem: (el: childrenT | "newParent" | undefined) => () => void;
  removeItem: (el: childrenT) => () => void;
  clearItems: () => void;
  searchId: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined
  ) => void;
};

export type useStoreThemeT = {
  theme: boolean;
  changeTheme: () => void;
};
export type initialStateT = {
  mokeData: mokeDataT[];
  statistics: statisticInitT;
  idFocus: string | null;
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

export type addItemsT = (
  flag: childrenT | "newParent" | undefined
) => (event?: React.MouseEvent<HTMLButtonElement>) => void;

export type getTargetIdT = (parentElement: HTMLElement) => string | null;

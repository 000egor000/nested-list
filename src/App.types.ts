export type mokeDataT = {
  id: string;
  children?: childrenT[];
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

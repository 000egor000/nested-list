import { mokeDataT } from "./App.types";


const mokeData: mokeDataT[] = [
  {
    id: "1",
    children: [
      { id: "1-1", idParents: "1" },
      { id: "1-2", idParents: "1" },
      {
        id: "1-3",
        children: [
          { id: "1-3-1", idParents: "1-3" },
          { id: "1-3-2", idParents: "1-3" },
        ],
        idParents: "1",
      },
      { id: "1-4", idParents: "1" },
    ],
  },
];

export { mokeData };

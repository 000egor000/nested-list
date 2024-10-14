import { FC } from "react";

import Wraper from "./components/Wraper";
import ListParseItems from "./components/ListParseItems";

const App: FC = () => {
  return (
    <Wraper>
      <ListParseItems />
    </Wraper>
  );
};

export default App;

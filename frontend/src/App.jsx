import { useState } from "react";
import Autocomplete from "./components/autocomplete";
import Dashboard from "./layouts/dashBoard/dashBoard";

const App = () => {
  const [searchArr, setSearch] = useState([]);
  const selectedSet = [];

  return (
    <>
      <Dashboard />

    </>
  );
};

export default App;

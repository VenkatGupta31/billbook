import { createContext } from "react";

const autocompleteContext = createContext({
  searchTerm: "",
  selected: [],
});

export default autocompleteContext;

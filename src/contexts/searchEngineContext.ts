import { createContext } from "react";
import { SearchEngine } from "../types/types";

export const SearchEngineContext = createContext<{
  searchEngines: SearchEngine[];
  setSearchEngines: React.Dispatch<React.SetStateAction<SearchEngine[]>>;
}>({
  searchEngines: [],
  setSearchEngines: () => {},
});

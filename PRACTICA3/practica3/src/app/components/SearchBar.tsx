"use client";

import "./SearchBar.css";

type SearchBarProps = {
  setSearchQuery: (value: string) => void;
  searchQuery: string;
};

export const SearchBar = ({ setSearchQuery, searchQuery }: SearchBarProps) => {
  return (
    <div className="searchbar-wrapper">
      <input
        className="searchinput"
        type="text"
        placeholder="Buscar productos..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
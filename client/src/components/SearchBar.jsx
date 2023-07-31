import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchCountries } from "../redux/action";

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(searchCountries(searchTerm));
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="inserte el pais ..."
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

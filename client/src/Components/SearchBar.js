import react, { useState } from "react";

import React from 'react';

function SearchBar({ data, setFilterBar,}) {
    const [searchInput, setSearchInput] = useState("");

    const handleChange = (inputValue) => {
        setSearchInput(inputValue);
    }


    return (
      <div>
        <input
          type="text"
          placeholder="Search by ID"
          onChange={(e) => handleChange(e.target.value)}
          value={searchInput}
        />
      </div>
    );
}

export default SearchBar;
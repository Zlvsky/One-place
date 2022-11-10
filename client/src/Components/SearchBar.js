import react, { useState, useEffect } from "react";

import React from "react";

function SearchBar({ data, handleSearchChange, dataType, status }) {
  const [searchInput, setSearchInput] = useState("");

  const clientsDataFiltered = () => {
    const dataFiltered = data
      ?.filter((val) => {
        if (
          [val.client.toLowerCase(), val.client_id + ""].some((r) =>
            r.includes(searchInput.toLowerCase())
          )
        ) {
          return val;
        }
      })
      .reverse();
    handleSearchChange(dataFiltered);
  }

  const ordersDataFiltered = () => {
    const dataFiltered = data
      ?.filter((val) => {
        if (
          val.status.includes(status) &&
          [val.client.toLowerCase(), val.id + ""].some((r) =>
            r.includes(searchInput.toLowerCase())
          )
        ) {
          return val;
        }
      })
      .reverse();
    handleSearchChange(dataFiltered);
  }

  useEffect(() => {
    if(dataType === "orders") {
        ordersDataFiltered();
    }
    if(dataType === "clients") {
        clientsDataFiltered();
    }
      
  }, [searchInput, status]);


  return (
    <>
      <input
        type="text"
        placeholder="Search by name or ID"
        onChange={(e) => setSearchInput(e.target.value)}
        value={searchInput}
      />
    </>
  );
}

export default SearchBar;

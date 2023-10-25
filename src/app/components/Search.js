"use client";
import { useContext, useState } from "react";
import DataContext from "../context/DataContext";

export const Search = () => {
  const {
    data,
    search,
    setSearch,
    currentFilter,
    setCurrentFilter,
    setTable,
    setVisibleSelected,
  } = useContext(DataContext);

  const handleAuto = (item) => {
    setCurrentFilter(item);
    setVisibleSelected(true);
    setSearch("");
    // setTable(true);
  };

  return (
    <div className="search-container">
      <div className="search-input-container">
        <input
          id="auto"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {search && (
        <div className="auto-container">
          {data
            .filter((elem) =>
              elem.nombre.toLowerCase().includes(search.toLowerCase())
            )
            .map((v, i) => {
              return (
                <div
                  key={i}
                  className="autocomplete-item"
                  onClick={() => handleAuto(v)}
                >
                  <h4>{v.nombre.toLowerCase()}</h4>
                  <h4>{v.marca.toLowerCase()}</h4>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

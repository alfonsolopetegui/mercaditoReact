"use client";
import { useContext, useState } from "react";
import DataContext from "../context/DataContext";
import styles from '../../styles/search.module.css'

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
    <div className={styles["search-container"]}>
      <div className={styles["search-input-container"]}>
        <input
          id="auto"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {search && (
        <div className={styles["auto-container"]}>
          {data
            .filter((elem) =>
              elem.nombre.toLowerCase().includes(search.toLowerCase())
            )
            .map((v, i) => {
              return (
                <div
                  key={i}
                  className={styles["autocomplete-item"]}
                  onClick={() => handleAuto(v)}
                >
                  <h4>{v.nombre.toLowerCase()}</h4>
                  <h4>{v.precio.toLowerCase()}</h4>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

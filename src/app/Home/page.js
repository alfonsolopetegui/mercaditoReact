"use client"
import { Button } from "../components/Button";
import { Nav } from "../components/Nav";
import { NewProduct } from "../components/NewProduct";
import { Search } from "../components/Search";
import TestTable from "../components/testTable";
import styles from "../page.module.css";
import DataContext from "../context/DataContext";
import { useContext } from "react";

export default function Home() {
  const { showForm } = useContext(DataContext);

  return (
    <>
      <div className="app-container">
        <div className="controls-container">
          <Search />

          <Nav />

          {showForm && (
            <div className="new-product-container">
              <NewProduct />
            </div>
          )}
        </div>
        <div className="table-container">
          <TestTable />
        </div>
      </div>
    </>
  );
}

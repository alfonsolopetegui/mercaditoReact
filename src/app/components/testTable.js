"use client";
import React, { useContext, useState, useMemo } from "react";
import { TestRow } from "./testRow";
import DataContext from "../context/DataContext";
import styles from "../../styles/testTable.module.css";

const itemsPerPage = 15;

const TestTable = () => {
  const {
    data,
    currentFilter,
    visibleSelected,
    pagination,
    setPagination,
    borrarProducto,
    setRecargar,
  } = useContext(DataContext);

  const [activeBtn, setActiveBtn] = useState(0);

  const pages = useMemo(() => Math.ceil(data.length / itemsPerPage), [data]);

  const selected = useMemo(() => (visibleSelected ? [currentFilter] : []), [visibleSelected, currentFilter]);

  const handlePagination = (pageIndex) => {
    setActiveBtn(pageIndex);
    setPagination({
      currentPage: pageIndex,
      minIndexPage: itemsPerPage * pageIndex,
      maxIndexPage: itemsPerPage * (pageIndex + 1),
    });
  };

  const handleDelete = async (product) => {
    try {
      await borrarProducto(product);
      console.log("Producto eliminado con éxito");
    } catch (error) {
      console.error("Error al borrar el producto");
    } finally {
      if (visibleSelected) {
        await setRecargar(true);
      } else {
        setPagination({
          currentPage: 0,
          maxIndexPage: itemsPerPage,
          minIndexPage: 0,
        });
        setActiveBtn(0);
      }
    }
  };

 
  return (
    <div className={styles["table-content"]}>
      <table className={styles["products-table"]}>
        <tbody>
          <tr className={styles["table-titles"]}>
            <th>Nombre</th>
            <th>Precio Base</th>
            <th>Precio</th>
            
            <th>Categoría</th>
          </tr>
          {selected.map((producto, index) => (
            <TestRow
              key={index}
              product={producto}
              index={index}
              onDeleteProduct={handleDelete}
            />
          ))}
          {!visibleSelected &&
            data.slice(pagination.minIndexPage, pagination.maxIndexPage).map((producto, index) => (
              <TestRow
                key={index}
                product={producto}
                index={index}
                onDeleteProduct={handleDelete}
              />
            ))}
        </tbody>
      </table>

      <div className={styles["pagination"]}>
        {!visibleSelected &&
          Array.from({ length: pages }, (_, index) => (
            <button
              key={index}
              className={`${styles["pagination-item"]} ${index === activeBtn ? styles["active"] : ""}`}
              onClick={() => handlePagination(index)}
            >
              {index + 1}
            </button>
          ))}
      </div>
    </div>
  );
};

export default TestTable;

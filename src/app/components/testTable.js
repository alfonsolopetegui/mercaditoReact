"use client";
import { TestRow } from "./testRow";
import DataContext from "../context/DataContext";
import { useContext, useEffect, useRef, useState } from "react";

const itemsPerPage = 15;

const TestTable = () => {
  const {
    data,
    currentFilter,
    visibleSelected,
    pagination,
    setPagination,
    setTable,
    setVisibleSelected,
    borrarProducto,
  } = useContext(DataContext);

  const [activeBtn, setActiveBtn] = useState(0);

  const pageBtns = useRef(null);

  const pages = data && Math.ceil(data.length / itemsPerPage);

  const postaPages = [];

  for (let i = 0; i < pages; i++) {
    postaPages.push(i);
  }

  const selected = [currentFilter];

  const handlePagination = (e, pageIndex) => {
    const buttons = pageBtns.current.querySelectorAll(".pagination-item");

    // buttons.forEach((button) => {
    //   button.classList.remove("active");
    // });

    // e.target.classList.add("active");

    // Restablece la clase "active" de la página actual
    buttons[activeBtn].classList.remove("active");

    // Actualiza el estado de la página activa con el nuevo índice de página
    setActiveBtn(pageIndex);

    // Agrega la clase "active" al botón de la página seleccionada
    buttons[pageIndex].classList.add("active");

    // if (e.target.value == 0) {
    //   e.target.classList.add("active");
    //   setPagination(initialPagination);
    //   return
    // }

    setPagination({
      currentPage: pageIndex,
      minIndexPage: itemsPerPage * pageIndex,
      maxIndexPage: itemsPerPage * (pageIndex + 1),
    });

    // e.target.classList.add("active");
    //   setPagination({
    //     minIndexPage: initialPagination.minIndexPage + 15 * e.target.value,
    //     maxIndexPage: initialPagination.maxIndexPage + 15 * e.target.value,
    //   });
  };

  const handleDelete = async (product) => {
    try {
      const response = await borrarProducto(product);
      if (response.status === 200) {
        console.log(response.data.msg);
      }
    } catch (error) {
      console.error("Error al borrar el producto");
    } finally {
      if(visibleSelected) {
        await setTable(true);
        setVisibleSelected(false)
        return
      }
      setPagination({
        currentPage: 0,
        maxIndexPage: itemsPerPage,
        minIndexPage: 0,
      });

      const buttons = pageBtns.current.querySelectorAll(".pagination-item");
      buttons[activeBtn].classList.remove("active");
      setActiveBtn(0);
      buttons[0].classList.add("active");
      // setVisibleSelected(false);
      setTable(true);
    }
  };

  return (
    <div className="table-content">
      <table>
        <tbody>
          <tr>
            <th>Nombre</th>
            <th>Marca</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Código</th>
          </tr>
          {visibleSelected
            ? selected.map((producto, index) => {
                return (
                  <TestRow
                    key={index}
                    product={producto}
                    index={index}
                    onDeleteProduct={handleDelete}
                  />
                );
              })
            : data.map((producto, index) => {
                if (
                  index >= pagination.minIndexPage &&
                  index < pagination.maxIndexPage
                )
                  return (
                    <TestRow
                      key={index}
                      product={producto}
                      index={index}
                      onDeleteProduct={handleDelete}
                    />
                  );
              })}
        </tbody>
      </table>

      <div ref={pageBtns} className="pagination">
        {visibleSelected
          ? selected.map((producto, index) => {
              return <button key={index} data={producto} />;
            })
          : postaPages.map((page, index) => {
              return (
                <button
                  className={
                    index == 0 ? "pagination-item active" : "pagination-item"
                  }
                  key={index}
                  onClick={(e) => handlePagination(e, index)}
                  value={index}
                >
                  {index + 1}
                </button>
              );
            })}
      </div>
    </div>
  );
};

export default TestTable;

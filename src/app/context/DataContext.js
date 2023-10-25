"use client";

import { createContext, useState, useEffect } from "react";
import axios from "axios";

// const dataURL = "http://localhost:5000/productos";

//url api externa
const expressURL = "http://localhost:8080/v1/productsList";

export const DataContext = createContext();

const itemsPerPage = 15;

export const DataContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [table, setTable] = useState(false);
  const [edit, setEdit] = useState(false);
  const [search, setSearch] = useState("");
  const [currentFilter, setCurrentFilter] = useState([]);
  const [visibleSelected, setVisibleSelected] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [update, setUpdate] = useState({
    item: "",
    nombre: "",
    marca: "",
    descripcion: "",
    categoria: "",
    precio: {
      base: "",
      moneda: "",
    },
    codigo: "",
    color: "",
    cantidad: "",
  });
  const [pagination, setPagination] = useState({
    currentPage: 0,
    maxIndexPage: itemsPerPage,
    minIndexPage: 0,
  });

  const crearProducto = async (producto) => {
    const options = {
      headers: { "Content-Type": "application/json" },
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/v1/productCreate",
        JSON.stringify(producto),
        options
      );
      return response;
    } catch (error) {
      console.error("Error en la solicitud POST:", error);
    }
  };

  const borrarProducto = async (producto) => {
    const id = producto._id;
    const options = {
      headers: { "content-type": "application/json" },
    };

    try {
      const response = await axios.delete(
        `http://localhost:8080/v1/productDelete/${id}`,
        JSON.stringify(producto),
        options
      );
      return response;
    } catch (error) {
      console.error("Error en la solicitud delete", error);
    }
  };

  const modificarProducto = async (producto) => {
    const id = producto._id;
    const options = {
      headers: { "content-type": "application/json" },
    };

    try {
      const response = await axios.put(
        `http://localhost:8080/v1/productEdit/${id}`,
        JSON.stringify(producto),
        options
      );
      return response;
    } catch (error) {
      console.error("Error en la solicitud put", error);
    }
  };

  useEffect(() => {
    axios.get(expressURL).then((res) => {
      setData(res.data);
      setTable(false);
    });
  }, [table]);

  return (
    <DataContext.Provider
      value={{
        data,
        crearProducto,
        borrarProducto,
        setTable,
        edit,
        setEdit,
        update,
        setUpdate,
        modificarProducto,
        search,
        setSearch,
        currentFilter,
        setCurrentFilter,
        visibleSelected,
        setVisibleSelected,
        pagination,
        setPagination,
        setShowForm,
        showForm,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;

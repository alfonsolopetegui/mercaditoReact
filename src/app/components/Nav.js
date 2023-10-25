"use client";
import React, { useContext } from "react";
import Link from "next/link";
import DataContext from "../context/DataContext";

export const Nav = () => {
  const { setCurrentFilter, setVisibleSelected } = useContext(DataContext);
  const { setShowForm } = useContext(DataContext);

  const handleTodos = () => {
    setCurrentFilter([]);
    setVisibleSelected(false);
  };

  const handleNuevo = () => {
    setShowForm(true);
  };

  return (
    <div className="nav">
      <button onClick={handleTodos}>Todos los productos</button>

      <button onClick={handleNuevo}>Nuevo producto</button>
    </div>
  );
};

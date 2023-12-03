"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import DataContext from "../context/DataContext";
import styles from "../../styles/adminNav.module.css";
import { NewUser } from "./NewUser";

export const AdminNav = () => {
  // const [viewNewUser, setViewNewUser] = useState(false);
  const { setCurrentFilter, setVisibleSelected, setVisibleNewUser } =
    useContext(DataContext);
  const { setShowForm } = useContext(DataContext);

  const handleTodos = () => {
    setCurrentFilter([]);
    setVisibleSelected(false);
  };

  const handleNuevo = () => {
    setShowForm(true);
  };

  const handleCrearUsuario = () => {
    setVisibleNewUser(true);
  };

  return (
    <div className={styles["nav"]}>
      <button onClick={handleTodos}>Todos los productos</button>

      <button onClick={handleNuevo}>Nuevo producto</button>

      <button onClick={handleCrearUsuario}>Crear Usuario</button>
    </div>
  );
};

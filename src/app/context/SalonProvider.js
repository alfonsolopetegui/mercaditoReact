"use client";
import { createContext, useState } from "react";

const SalonContext = createContext({});

export const SalonProvider = ({ children }) => {
  const [mesas, setMesas] = useState([]);
  const [productosMesa, setProductosMesa] = useState([]);
  const [mesaSeleccionada, setMesaSeleccionada] = useState(null);

  return (
    <SalonContext.Provider
      value={{
        mesas,
        setMesas,
        productosMesa,
        setProductosMesa,
        mesaSeleccionada,
        setMesaSeleccionada
      }}
    >
      {children}
    </SalonContext.Provider>
  );
};

export default SalonContext;

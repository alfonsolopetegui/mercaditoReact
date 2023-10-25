"use client";
import SalonContext from "../context/SalonProvider";
import { useContext, useState } from "react";
import Mesa from "./Mesa";
import MesaGrande from "./MesaGrande";

const SalonPrincipal = () => {
  const { mesas, setMesas, mesaSeleccionada } = useContext(SalonContext);

  const closeHandler = (mesa) => {
    const borrarMesas = mesas.filter((el) => el.numeroMesa !== mesa.numeroMesa);

    setMesas(borrarMesas);
  };

  return (
    <>
      <div className="salon-mesas">
        {mesas.length > 0
          ? mesas.map((mesa, i) => {
              return (
                <Mesa key={i} data={mesa} handler={() => closeHandler(mesa)} />
              );
            })
          : "Aun no hay mesas abiertas"}
      </div>
      {mesaSeleccionada && (
        <div className="mesa-grande-container">
          <MesaGrande />
        </div>
      )}
    </>
  );
};

export default SalonPrincipal;

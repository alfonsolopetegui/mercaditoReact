import React, { useContext } from "react";
import SalonContext from "../context/SalonProvider";

const MesaGrande = () => {
  const { mesas, mesaSeleccionada, setMesaSeleccionada } =
    useContext(SalonContext);
  const { numeroMesa, nombreMozo } = mesaSeleccionada;

  const handleClose = () => {
    setMesaSeleccionada(null);
  };

  return (
    <div className="mesa-grande">
      <h3>Mesa N°: {numeroMesa}</h3>
      <h4>Mozo: {nombreMozo}</h4>
      <div>mesa contenido</div>
      <h3>Totales</h3>
      <button>Menu</button>
      <button onClick={handleClose}>Cobrar y cerrar</button>
    </div>
  );
};

export default MesaGrande;

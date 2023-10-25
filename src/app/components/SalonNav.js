"use client";
import { text } from "@fortawesome/fontawesome-svg-core";
import { useContext, useState } from "react";
import SalonContext from "../context/SalonProvider";

const SalonNav = () => {
  const { setMesas, mesas } = useContext(SalonContext);
  const [mesaForm, setMesaForm] = useState(false);
  const [numeroMesa, setNumeroMesa] = useState("");
  const [nombreMozo, setNombreMozo] = useState("");

  const handleAñadirMesa = () => {
    setMesaForm(true);
  };

  const handleCrearMesa = (e) => {
    e.preventDefault();
    setMesas([...mesas, { numeroMesa, nombreMozo }]);
    setMesaForm(false);
    setNumeroMesa("");
    setNombreMozo("");
  };

  const closeForm = () => {
    setMesaForm(false);
  };

  return (
    <>
      <div className="salon-nav-container">
        <div className="salon-nav-btn" onClick={handleAñadirMesa}>
          <h1>Añadir mesa</h1>
        </div>
      </div>

      {mesaForm && (
        <div className="mesa-form-container">
          <div className="mesa-form">
            <h3 onClick={closeForm} style={{ cursor: "pointer" }}>
              x
            </h3>
            <h3>Nueva Mesa</h3>
            <form onSubmit={handleCrearMesa}>
              <label htmlFor="mesaNumber">
                Número de mesa:
                <input
                  id="mesaNumber"
                  name="mesaNumber"
                  type="text"
                  value={numeroMesa}
                  onChange={(e) => setNumeroMesa(e.target.value)}
                ></input>
              </label>

              <label htmlFor="mozo">
                Mozo:
                <input
                  id="mozo"
                  name="mozo"
                  type="text"
                  value={nombreMozo}
                  onChange={(e) => setNombreMozo(e.target.value)}
                ></input>
              </label>
              <button>Aceptar</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SalonNav;

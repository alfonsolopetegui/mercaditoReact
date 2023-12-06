"use client";
import SalonContext from "../context/SalonProvider";
import { useContext, useState } from "react";
import Mesa from "./Mesa";
import MesaGrande from "./MesaGrande";
import styles from "../../styles/salonPrincipal.module.css";
import Loader from "./Loader";

const SalonPrincipal = () => {
  const { mesas, setMesas, openMesaGrande } = useContext(SalonContext);

  // Ordenar los pedidos por número de pedido
  const mesasOrdenadas = [...mesas].sort((a, b) => a.numeroMesa - b.numeroMesa);
  

  return (
    <>
      {mesasOrdenadas.length > 0 ? (
        <div className={styles["salon-mesas"]}>
          {mesasOrdenadas.map((mesa, i) => {
            return (
              <Mesa key={i} data={mesa}/>
            );
          })}
        </div>
      ) : (
        <div className={styles["aun-sin-mesas-container"]}>
          <h1 className={styles["aun-sin-mesas"]}>Aun no hay mesas abiertas</h1>
        </div>
      )}

      {openMesaGrande && (
        <div className={styles["mesa-grande-container"]}>
          <MesaGrande />
        </div>
      )}
    </>
  );
};

export default SalonPrincipal;

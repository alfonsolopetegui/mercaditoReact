"use client";
import { useContext } from "react";
import SalonNav from "../components/SalonNav";
import SalonPrincipal from "../components/SalonPrincipal";
import styles from "../../styles/salon.module.css";
import AuthContext from "../context/AuthProvider";

const Salon = () => {
  const { rutaProhibida, setRutaProhibida } = useContext(AuthContext);

  return (
    <>
      {rutaProhibida && (
        <div className={styles["prohibited-message"]}>
          <h1>No tienes permisos para acceder al administrador</h1>
          <span onClick={() => setRutaProhibida(false)} className={styles["close-button"]}>
            X
          </span>
        </div>
      )}

      <div className={styles["salon-principal-container"]}>
        <SalonNav />
        <SalonPrincipal />
      </div>
    </>
  );
};

export default Salon;

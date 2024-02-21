"use client";
import { text } from "@fortawesome/fontawesome-svg-core";
import { useContext, useEffect, useState } from "react";
import SalonContext from "../context/SalonProvider";
import styles from "../../styles/salonNav.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons";

//modulos de Firebase
import firebaseApp from "@/firebase";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const db = getFirestore(firebaseApp);

const SalonNav = () => {
  const { setMesas, mesas, setRecargarMesas } = useContext(SalonContext);
  const [mesaForm, setMesaForm] = useState(false);
  const [numeroMesa, setNumeroMesa] = useState("");
  const [nombreMozo, setNombreMozo] = useState("");
  const [mesaExistente, setMesaExistente] = useState(false);

  const handleAñadirMesa = () => {
    setMesaForm(true);
  };

  useEffect(() => {
    if (mesaExistente) {
      setTimeout(() => {
        setMesaExistente(false);
      }, 3000);
    }
  }, [mesaExistente, setMesaExistente]);

  //Agregar producto en Firebase
  const handleCrearMesa = async (e) => {
    e.preventDefault();
    const horaDeCreacion = new Date().toLocaleTimeString();
    const fechaDeCreacion = new Date().toLocaleDateString();

    const mesaRepetida = mesas.find((mesa) => mesa.numeroMesa === numeroMesa);

    if (mesaRepetida) {
      setMesaExistente(true);
      setNumeroMesa("");
      setNombreMozo("");
      return;
    }

    try {
      await addDoc(collection(db, "mesas"), {
        numeroMesa,
        nombreMozo,
        contenido: [],
        fechaDeCreacion,
        horaDeCreacion,
      });
      console.log("Mesa creado con éxito");
      //aca agregamos la mesa nueva al estado también para probar
      // setMesas([
      //   ...mesas,
      //   { numeroMesa, nombreMozo, contenido: [], horaDeCreacion },
      // ]);
      // setDato(valorInicial);
      setRecargarMesas(true);
      setMesaForm(false);
      setNumeroMesa("");
      setNombreMozo("");
    } catch (error) {
      console.log(error);
    }
  };

  // const handleCrearMesa = (e) => {
  //   e.preventDefault();

  //   const horaDeCreacion = new Date();

  //   setMesas([
  //     ...mesas,
  //     { numeroMesa, nombreMozo, contenido: [], horaDeCreacion },
  //   ]);
  //   setMesaForm(false);
  //   setNumeroMesa("");
  //   setNombreMozo("");
  // };

  const closeForm = () => {
    setMesaForm(false);
    if(mesaExistente){
      setMesaExistente(false);
    }
  };

  return (
    <>
      <div className={styles["salon-nav-container"]}>
        <div className={styles["salon-nav-btn"]} onClick={handleAñadirMesa}>
          <FontAwesomeIcon className={styles["salon-btn-icon"]} icon={faPlus} />
          <h1>añadir mesa</h1>
        </div>
      </div>

      {mesaForm && (
        <div className={styles["mesa-form-container"]}>
          <div className={styles["mesa-form"]}>
            <div className={styles["close-btn-container"]}>
              <FontAwesomeIcon
                className={styles["close-btn"]}
                onClick={closeForm}
                icon={faRectangleXmark}
              />
            </div>
            <h2>Nueva Mesa</h2>
            <form onSubmit={handleCrearMesa}>
              <div className={styles["form-field"]}>
                <label htmlFor="mesaNumber">Número de mesa:</label>
                <input
                  id="mesaNumber"
                  name="mesaNumber"
                  type="text"
                  value={numeroMesa}
                  onChange={(e) => setNumeroMesa(e.target.value)}
                  required
                ></input>
              </div>

              <div className={styles["form-field"]}>
                <label htmlFor="mozo">Mozo:</label>
                <input
                  id="mozo"
                  name="mozo"
                  type="text"
                  value={nombreMozo}
                  onChange={(e) => setNombreMozo(e.target.value)}
                  required
                ></input>
              </div>
              <div className={styles["mesa-form-btn-container"]}>
                <button>Aceptar</button>
              </div>
              {mesaExistente && (
                <h4 className={styles["mesa-existente"]}>Esa mesa ya existe</h4>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SalonNav;

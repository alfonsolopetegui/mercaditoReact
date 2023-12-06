import React, { useContext, useState } from "react";
import SalonContext from "../context/SalonProvider";
import styles from "../../styles/mesaGrande.module.css";
import Counter from "./Counter";
import Carta from "./Carta";
import { Confirm } from "./Confirm";
//Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark } from "@fortawesome/free-regular-svg-icons";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

//Probando react to print
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

//modulos de Firebase
import firebaseApp from "@/firebase";
import {
  getFirestore,
  doc,
  deleteDoc,
  addDoc,
  collection,
} from "firebase/firestore";
import Recibo from "./Recibo";

const db = getFirestore(firebaseApp);

const MesaGrande = () => {
  const {
    mesas,
    mesaSeleccionada,
    setMesaSeleccionada,
    OpenMesaGrande,
    setOpenMesaGrande,
    setRecargarMesas,
    cartasAbiertas,
    setCartasAbiertas,
    cerrarCarta
  } = useContext(SalonContext);

  //Visualizar la carta
  const [open, setOpen] = useState(false);
  //Visualizar el confirm
  const [confirm, setConfirm] = useState(false);
  //Visualizar cierre de mesa
  const [cerrarMesa, setCerrarMesa] = useState(false);

  const [efectivo, setEfectivo] = useState(0);

  const {
    numeroMesa,
    nombreMozo,
    contenido,
    horaDeCreacion,
    fechaDeCreacion,
    id,
  } = mesaSeleccionada;

  const handleClose = () => {
    setOpenMesaGrande(false);
    // setMesaSeleccionada(null);
  };

  // Calculate the total sum of "Total" values in the contenido array
  const totalSum = contenido.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  //Abre la carta
  const handleMenu = () => {
    setCartasAbiertas((prevCartasAbiertas) => ({
      ...prevCartasAbiertas,
      [numeroMesa]: !prevCartasAbiertas[numeroMesa],
    }));
  };

  //Cierra la mesa
  const handleCash = () => {
    setCerrarMesa(!cerrarMesa);
  };

  //Manejadores del confirm
  const handleCancel = () => {
    setConfirm(false);
  };

  const handleCerrarMesa = () => {
    if (efectivo <= totalSum) {
      setConfirm(true);
    }
  };

  //Borrar mesa y agregarla a archivo
  const handleConfirm = async () => {
    const horaDeCierre = new Date().toLocaleTimeString();
    const fechaDeCierre = new Date().toLocaleDateString();

    const totalTarjeta = totalSum - efectivo; // Calcula el total de tarjeta

    // Guardar en archivos
    try {
      await addDoc(collection(db, "archivo"), {
        nombreMozo,
        contenido,
        horaDeCreacion,
        fechaDeCreacion,
        tipo: "mesa",
        horaDeCierre,
        fechaDeCierre,
        total: totalSum,
        efectivo,
        tarjeta: totalTarjeta,
      });
      console.log("Archivo creado con éxito");
    } catch (error) {
      console.log(error);
      return; // Detener la ejecución si hay un error al guardar en archivos
    }

    // Eliminar de la colección principal
    try {
      await deleteDoc(doc(db, "mesas", id));
      setRecargarMesas(true);
      setConfirm(false);
      setOpenMesaGrande(false);
      console.log("Mesa borrada con éxito");
    } catch (error) {
      console.error(error);
    }
  };
  //Probando react to print
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className={styles["mesa-grande-wrapper"]}>
      <div className={styles["mesa-grande"]}>
        <div className={styles["mesa-grande-header"]}>
          <div className={styles["close-btn-container"]}>
            <FontAwesomeIcon
              className={styles["close-btn"]}
              onClick={handleClose}
              icon={faRectangleXmark}
            />
          </div>
          <h3>Mesa N°: {numeroMesa}</h3>
          <h4>Mozo: {nombreMozo}</h4>
          <h4>
            inicio: {fechaDeCreacion} {horaDeCreacion}
          </h4>
        </div>
        <div className={styles["mesa-grande-contenedor"]}>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Cantidad</th>
                <th>Precio unit.</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {contenido &&
                contenido.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>{item.nombre}</td>
                      <td>
                        <Counter
                          dataMesa={mesaSeleccionada}
                          key={i}
                          dataItem={item}
                        />
                      </td>
                      <td>${item.precio}</td>
                      <td>${item.precio * item.cantidad}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div className={styles["mesa-grande-total"]}>
          <p>Total: ${totalSum.toFixed(2)}</p>
        </div>
        <div className={styles["btn-container"]}>
          <button onClick={handleMenu} className={styles["close-btn"]}>
            <h4>Menú </h4>
            {open ? (
              <FontAwesomeIcon icon={faChevronUp} />
            ) : (
              <FontAwesomeIcon icon={faChevronDown} />
            )}
          </button>
          <button onClick={handleCash} className={styles["close-btn"]}>
            <h4>Cobrar y cerrar</h4>
            {cerrarMesa ? (
              <FontAwesomeIcon icon={faChevronUp} />
            ) : (
              <FontAwesomeIcon icon={faChevronDown} />
            )}
          </button>
        </div>
      </div>
      {confirm && (
        <Confirm
          text={"¿Estás seguro de cerrar esta mesa?"}
          handleCancel={handleCancel}
          handleConfirm={handleConfirm}
        />
      )}

      {cerrarMesa && (
        <div className={styles["cerrar-mesa-container"]}>
          <div className={styles["input-container"]}>
            <label htmlFor="efectivo">
              Efectivo: $
              <input
                type="number"
                id="efectivo"
                onChange={(e) =>
                  setEfectivo(Math.max(0, parseFloat(e.target.value)))
                }
              />
            </label>
            <label htmlFor="tarjeta">
              Tarjeta: $
              <input
                type="text"
                id="tarjeta"
                value={isNaN(efectivo) ? 0 : (totalSum - efectivo).toFixed(2)}
                readOnly
              />
            </label>
          </div>
          <h3 className={styles["cerrar-mesa-total"]}>
            Total: ${totalSum.toFixed(2)}
          </h3>
          {efectivo > totalSum && (
            <h5 style={{ color: "red" }}>
              el pago en efectivo no puede ser mayor al total
            </h5>
          )}
          <div className={styles["cerrar-mesa-btn-container"]}>
            <button onClick={handlePrint}>Imprimir</button>
            <button onClick={handleCerrarMesa}>Cerrar</button>
          </div>
        </div>
      )}
      {open && (
        <div className={styles["mesa-grande-menu"]}>
          <Carta datosMesa={mesaSeleccionada} />
        </div>
      )}

      <div ref={componentRef} className={styles["recibo-container"]}>
        <Recibo contenido={contenido} total={totalSum} />
      </div>
    </div>
  );
};

export default MesaGrande;

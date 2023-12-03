import React, { useContext, useState } from "react";
import { DeliveryContext } from "../context/DeliveryContext";
import styles from "../../styles/mesaGrande.module.css";
import CounterPedidos from "./CounterPedidos";
import CartaPedidos from "./CartaPedidos";
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

const PedidoGrande = () => {
  const {
    pedidos,
    pedidoSeleccionado,
    setPedidoSeleccionado,
    OpenPedidoGrande,
    setOpenPedidoGrande,
    setRecargarPedidos,
  } = useContext(DeliveryContext);

  //Visualizar la carta
  const [open, setOpen] = useState(false);
  //Visualizar el confirm
  const [confirm, setConfirm] = useState(false);
  //Visualizar cierre de mesa
  const [cerrarPedido, setCerrarPedido] = useState(false);

  const [efectivo, setEfectivo] = useState(0);

  const {
    nombreCliente,
    direccion,
    numeroPedido,
    contenido,
    horaDeCreacion,
    fechaDeCreacion,
    id,
  } = pedidoSeleccionado;

  const handleClose = () => {
    setOpenPedidoGrande(false);
    // setMesaSeleccionada(null);
  };

  // Calculate the total sum of "Total" values in the contenido array
  const totalSum = contenido.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  //Abre la carta
  const handleMenu = () => {
    setOpen(!open);
  };

  //Cierra la mesa
  const handleCash = () => {
    setCerrarPedido(!cerrarPedido);
  };

  //Manejadores del confirm
  const handleCancel = () => {
    setConfirm(false);
  };

  const handleCerrarMesa = () => {
    setConfirm(true);
  };

  //Borrar mesa y agregarla a archivo
  const handleConfirm = async () => {
    const horaDeCierre = new Date().toLocaleTimeString();
    const fechaDeCierre = new Date().toLocaleDateString();

    const totalTarjeta = totalSum - efectivo; // Calcula el total de tarjeta

    // Guardar en archivos
    try {
      await addDoc(collection(db, "archivos"), {
        // nombreMozo,
        contenido,
        horaDeCreacion,
        fechaDeCreacion,
        tipo: "pedido",
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
      await deleteDoc(doc(db, "pedidos", id));
      setRecargarPedidos(true);
      setConfirm(false);
      setOpenPedidoGrande(false);
      console.log("Pedido Borrado con éxito");
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
          <h3>Pedido N°: {numeroPedido}</h3>
         
          <h5>
            inicio: {fechaDeCreacion} {horaDeCreacion}
          </h5>
          <h5>Cliente: {nombreCliente}</h5>
          <h5>Dirección: {direccion}</h5>
        </div>
        <table>
          <tbody className={styles["mesa-grande-contenido"]}>
            <tr>
              <th>Item</th>
              {/* <th>Cant.</th> */}
              <th>Cantidad</th>
              <th>Precio unit.</th>
              <th>Total</th>
            </tr>
            {contenido &&
              contenido.map((item, i) => {
                return (
                  <tr key={i}>
                    <td style={{ fontSize: "24px" }}>{item.nombre}</td>
                    {/* <td style={{ fontSize: "24px" }}>x{item.cantidad}</td> */}
                    <td style={{ fontSize: "24px" }}>
                      <CounterPedidos
                        dataPedido={pedidoSeleccionado}
                        key={i}
                        dataItem={item}
                      />
                    </td>
                    <td style={{ fontSize: "24px" }}>${item.precio}</td>
                    <td style={{ fontSize: "24px" }}>
                      ${item.precio * item.cantidad}
                    </td>
                  </tr>
                );
              })}
            <tr></tr>
            <tr>
              <td colSpan={3} style={{ fontSize: "24px" }}>
                <b>Total</b>
              </td>
              <td style={{ fontSize: "24px" }}>
                <b>${totalSum}</b>
              </td>
            </tr>
          </tbody>
        </table>
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
            {cerrarPedido ? (
              <FontAwesomeIcon icon={faChevronUp} />
            ) : (
              <FontAwesomeIcon icon={faChevronDown} />
            )}
          </button>
        </div>
      </div>
      {confirm && (
        <Confirm
          text={"¿Estás seguro de cerrar esta pedido?"}
          handleCancel={handleCancel}
          handleConfirm={handleConfirm}
        />
      )}

      {cerrarPedido && (
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
                value={(totalSum - efectivo).toFixed(2)}
                readOnly
              />
            </label>
          </div>
          <h3 className={styles["cerrar-mesa-total"]}>
            Total: ${totalSum.toFixed(2)}
          </h3>
          <div className={styles["cerrar-mesa-btn-container"]}>
            <button onClick={handlePrint}>Imprimir</button>
            <button onClick={handleCerrarMesa}>Cerrar</button>
          </div>
        </div>
      )}
      {open && (
        <div className={styles["mesa-grande-menu"]}>
          <CartaPedidos datosPedido={pedidoSeleccionado} />
        </div>
      )}

      <div ref={componentRef} className={styles["recibo-container"]}>
        <Recibo contenido={contenido} total={totalSum} />
      </div>
    </div>
  );
};

export default PedidoGrande;

import { useContext, useState } from "react";
import styles from "../../styles/pedido.module.css";
import CounterPedidos from "./CounterPedidos";
import Recibo from "./Recibo";
import { Confirm } from "./Confirm";
import { DeliveryContext } from "../context/DeliveryContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMotorcycle,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";

import CartaPedidos from "./CartaPedidos";

import firebaseApp from "@/firebase";
import {
  doc,
  setDoc,
  getFirestore,
  addDoc,
  collection,
  deleteDoc,
} from "firebase/firestore";
const db = getFirestore(firebaseApp);

//Probando react to print
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const Pedido = ({ data }) => {
  const [visible, setVisible] = useState(false);
  const [verCarta, setVerCarta] = useState(false);
  //modifica el color del select
  const [selectedStatus, setSelectedStatus] = useState(
    data.estado || "en preparacion"
  );
  //Muestra el cierre del pedido
  const [cerrarPedido, setCerrarPedido] = useState(false);

  const [efectivo, setEfectivo] = useState(0);

  //Visualizar el confirm
  const [confirm, setConfirm] = useState(false);

  const {
    pedidos,
    setRecargarPedidos,
    setOpenPedidoGrande,
    setPedidoSeleccionado,
    cartasAbiertasPedidos,
    setCartasAbiertasPedidos,
    cerrarCartaPedidos,
  } = useContext(DeliveryContext);

  // Calculate the total sum of "Total" values in the contenido array
  const totalSum = data.contenido.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  const handleVisible = () => {
    setVisible(!visible);
  };

  const handleMenu = () => {
    setCartasAbiertasPedidos((prevCartasAbiertasPedidos) => ({
      ...prevCartasAbiertasPedidos,
      [data.numeroPedido]: !prevCartasAbiertasPedidos[data.numeroPedido],
    }));
  };

  const handleCerrarCarta = () => {
    cerrarCarta(data.numeroPedido);
  }; 

  const handleSelect = async (e) => {
    const newStatus = e.target.value;
    setSelectedStatus(newStatus);

    const pedidoAModificar = pedidos.find(
      (pedido) => pedido.numeroPedido === data.numeroPedido
    );

    if (pedidoAModificar) {
      const updatedPedido = {
        ...pedidoAModificar,
        estado: newStatus,
      };

      try {
        // Obtener la referencia del documento con el ID correcto
        const pedidoDocRef = doc(db, "pedidos", pedidoAModificar.id);

        // Actualizar el documento en Firestore
        await setDoc(pedidoDocRef, updatedPedido);
        console.log("Pedido actualizado con éxito en la base de datos");
      } catch (error) {
        console.error(
          "Error al actualizar el pedido en la base de datos",
          error
        );
      }

      return updatedPedido;
    }

    return null;
  };

  const handleCerrarVisible = () => {
    setCerrarPedido(!cerrarPedido);
  };
  //Probando react to print
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

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
      await addDoc(collection(db, "archivo"), {
        contenido: data.contenido,
        horaDeCreacion: data.horaDeCreacion,
        fechaDeCreacion: data.fechaDeCreacion,
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
      await deleteDoc(doc(db, "pedidos", data.id));
      setRecargarPedidos(true);
      setConfirm(false);
      setVisible(false);
      setCerrarPedido(false);
      console.log("Pedido borrada con éxito");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSeleccion = () => {
    setPedidoSeleccionado(data);
    setOpenPedidoGrande(true);
  };

  return (
    <div className={styles["pedido-container"]}>
      <div className={styles["pedido-wrapper"]}>
        <div className={styles["pedido-header"]}>
          <div className={styles["pedido-header-left"]}>
            <FontAwesomeIcon
              className={styles["delivery-btn-icon"]}
              icon={faMotorcycle}
            />
            <h3>{data.numeroPedido}</h3>
            <button onClick={handleMenu} className={styles["pedido-btn"]}>
              <h4>Menú </h4>
              {verCarta ? (
                <FontAwesomeIcon icon={faChevronUp} />
              ) : (
                <FontAwesomeIcon icon={faChevronDown} />
              )}
            </button>
            <button onClick={handleSeleccion} className={styles["pedido-btn"]}>
              <h4>Contenido</h4>
              {visible ? (
                <FontAwesomeIcon icon={faChevronUp} />
              ) : (
                <FontAwesomeIcon icon={faChevronDown} />
              )}
            </button>
          </div>
          <select
            name="pedidoSelect"
            value={selectedStatus}
            onChange={handleSelect}
            className={
              selectedStatus === "en preparacion"
                ? styles["preparacion"]
                : selectedStatus === "listo para salir"
                ? styles["salir"]
                : styles["enviado"]
            }
          >
            <option value={"en preparacion"}>en preparacion</option>
            <option value={"listo para salir"}>listo para salir</option>
            <option value={"enviado"}>enviado</option>
          </select>
        </div>
        <div className={styles["datos-cliente"]}>
          <h6>Cliente: {data.nombreCliente}</h6>
          <h6>Hora: {data.horaDeCreacion}</h6>
        </div>
      </div>

      <div className={styles["carta-wrapper"]}>
        {cartasAbiertasPedidos[data.numeroPedido] && (
          <CartaPedidos datosPedido={data} />
        )}
      </div>
    </div>
  );
};

export default Pedido;

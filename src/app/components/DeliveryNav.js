"use client";
import styles from "../../styles/deliveryNav.module.css";
import { useContext, useState } from "react";
import { DeliveryContext } from "../context/DeliveryContext";

//modulos de Firebase
import firebaseApp from "@/firebase";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const db = getFirestore(firebaseApp);

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faRectangleXmark } from "@fortawesome/free-solid-svg-icons";

const DeliveryNav = () => {
  const { pedidos, setPedidos, setRecargarPedidos } =
    useContext(DeliveryContext);

  const [pedidoForm, setPedidoForm] = useState(false);

  const [pedidoExistente, setPedidoExistente] = useState(false);
  //datos del pedido
  const [numeroPedido, setNumeroPedido] = useState("");
  const [nombreCliente, setNombreCliente] = useState("");
  const [direccion, setDireccion] = useState("");

  //Agregar producto en Firebase
  const handleNuevoPedido = async (e) => {
    e.preventDefault();
    const horaDeCreacion = new Date().toLocaleTimeString();
    const fechaDeCreacion = new Date().toLocaleDateString();
    const estado = "en preparacion";

    const pedidoRepetido = pedidos.find(
      (pedido) => pedido.numeroPedido === numeroPedido
    );

    if (pedidoRepetido) {
      setPedidoExistente(true);

      return;
    }

    try {
      await addDoc(collection(db, "pedidos"), {
        contenido: [],
        fechaDeCreacion,
        horaDeCreacion,
        numeroPedido,
        estado,
        nombreCliente,
        direccion,
      });
      console.log("Pedido creado con éxito");
      setPedidoForm(false);
      setRecargarPedidos(true);
      setPedidoExistente(false);
      setNumeroPedido("");
      setNombreCliente("");
      setDireccion("");
    } catch (error) {
      console.log(error);
    }
  };

  const handlePedidoForm = () => {
    setPedidoForm(true);
  };

  const closeForm = () => {
    setPedidoForm(false);
    setNumeroPedido("");
    setNombreCliente("");
    setDireccion("");
    setPedidoExistente(false);
  };
  return (
    <div>
      <div className={styles["delivery-nav-container"]}>
        <div className={styles["delivery-nav-btn"]} onClick={handlePedidoForm}>
          <FontAwesomeIcon
            className={styles["delivery-btn-icon"]}
            icon={faPlus}
          />
          <h1>nuevo pedido</h1>
        </div>
      </div>

      {pedidoForm && (
        <div className={styles["mesa-form-container"]}>
          <div className={styles["mesa-form"]}>
            <div className={styles["close-btn-container"]}>
            <FontAwesomeIcon
                className={styles["close-btn"]}
                onClick={closeForm}
                icon={faRectangleXmark}
              />
            </div>
            <h2>Nuevo Pedido</h2>
            <form onSubmit={handleNuevoPedido}>
              <div className={styles["form-field"]}>
                <label htmlFor="numeroPedido">
                  Número de pedido:
                  <input
                    id="numeroPedido"
                    name="numeroPedido"
                    type="number"
                    value={numeroPedido}
                    onChange={(e) => setNumeroPedido(e.target.value)}
                    required
                  ></input>
                </label>
              </div>

              <div className={styles["form-field"]}>
                <label htmlFor="nombreCliente">
                  Nombre cliente:
                  <input
                    id="nombreCliente"
                    name="nombreCliente"
                    type="text"
                    value={nombreCliente}
                    onChange={(e) => setNombreCliente(e.target.value)}
                    required
                  ></input>
                </label>
              </div>

              <div className={styles["form-field"]}>
                <label htmlFor="direccion">
                  Dirección:
                  <input
                    id="direccion"
                    name="direccion"
                    type="text"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    required
                  ></input>
                </label>
              </div>

              <div className={styles["mesa-form-btn-container"]}>
                <button>Aceptar</button>
              </div>
              {pedidoExistente && (
                <h4 className={styles["mesa-existente"]}>
                  Ese pedido ya existe
                </h4>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryNav;

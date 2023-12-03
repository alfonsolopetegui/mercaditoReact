"use client";
import { useContext, useState } from "react";
import styles from "../../styles/counter.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SalonContext from "../context/SalonProvider";

import firebaseApp from "@/firebase";
import { doc, setDoc, getFirestore } from "firebase/firestore";
const db = getFirestore(firebaseApp);

import { faSquarePlus, faSquareMinus } from "@fortawesome/free-solid-svg-icons";

const Counter = (props) => {
  const { dataItem, dataMesa } = props;
  const { setMesaSeleccionada, mesas, setMesas, setRecargarMesas } =
    useContext(SalonContext);
  const [counter, setCounter] = useState(dataItem.cantidad);

  const handleAdd = async () => {
    const mesaAModificar = mesas.find(
      (mesa) => mesa.numeroMesa === dataMesa.numeroMesa
    );
    if (mesaAModificar) {
      // Clona la mesa encontrada y actualiza la cantidad del ítem específico
      const updatedMesa = {
        ...mesaAModificar,
        contenido: mesaAModificar.contenido.map((item) => {
          if (item.id === dataItem.id) {
            return {
              ...item,
              cantidad: item.cantidad + 1,
            };
          }
          return item;
        }),
      };

      try {
        // Obtener la referencia del documento con el ID correcto
        const mesaDocRef = doc(db, "mesas", dataMesa.id);

        // Actualizar el documento en Firestore
        await setDoc(mesaDocRef, updatedMesa);
        console.log("Mesa actualizada con éxito en la base de datos");

        // Actualizar el estado local
        setRecargarMesas(true);
        setMesaSeleccionada(updatedMesa);
      } catch (error) {
        console.error("Error al actualizar la mesa en la base de datos", error);
      }
      // Clona el array de mesas y actualiza la mesa modificada
      const updatedMesas = mesas.map((mesa) =>
        mesa.numeroMesa === dataMesa.numeroMesa ? updatedMesa : mesa
      );

      // Actualiza el estado mesas con el nuevo array

      // setMesas(updatedMesas);
      setMesaSeleccionada(updatedMesa);
    }
  };

  const handleSubtract = async () => {
    const mesaAModificar = mesas.find(
      (mesa) => mesa.numeroMesa === dataMesa.numeroMesa
    );

    if (mesaAModificar) {
      // Clona la mesa encontrada y actualiza la cantidad del ítem específico restando 1
      const updatedMesa = {
        ...mesaAModificar,
        contenido: mesaAModificar.contenido
          .map((item) => {
            if (item.id === dataItem.id) {
              return {
                ...item,
                cantidad: item.cantidad - 1,
              };
            }
            return item;
          })
          .filter((item) => item.cantidad > 0),
      };

      try {
        // Obtener la referencia del documento con el ID correcto
        const mesaDocRef = doc(db, "mesas", dataMesa.id);

        // Actualizar el documento en Firestore
        await setDoc(mesaDocRef, updatedMesa);
        console.log("Mesa actualizada con éxito en la base de datos");

        // Actualizar el estado local
        setRecargarMesas(true);
        setMesaSeleccionada(updatedMesa);
      } catch (error) {
        console.error("Error al actualizar la mesa en la base de datos", error);
      }

      // Clona el array de mesas y actualiza la mesa modificada
      const updatedMesas = mesas.map((mesa) =>
        mesa.numeroMesa === dataMesa.numeroMesa ? updatedMesa : mesa
      );

      // Actualiza el estado mesas con el nuevo array
      setMesas(updatedMesas);
      setMesaSeleccionada(updatedMesa);
    }
  };

  //   console.log(data)
  return (
    <div className={styles["counter-container"]}>
      <button className={styles["btn-counter"]}>
        <FontAwesomeIcon
          className={styles["icono-counter"]}
          onClick={handleAdd}
          icon={faSquarePlus}
        />
      </button>
      x{dataItem.cantidad}
      <button className={styles["btn-counter"]}>
        <FontAwesomeIcon
          onClick={handleSubtract}
          className={styles["icono-counter"]}
          icon={faSquareMinus}
        />
      </button>
    </div>
  );
};

export default Counter;

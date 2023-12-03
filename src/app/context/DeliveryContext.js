"use client";
import { createContext, useState, useEffect, useContext } from "react";

//modulos de Firebase
import firebaseApp from "@/firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const db = getFirestore(firebaseApp);

import { getAuth, onAuthStateChanged } from "firebase/auth";

const DeliveryContext = createContext({});

const DeliveryProvider = ({ children }) => {
  //Guarda los pedidos activos
  const [pedidos, setPedidos] = useState([]);
  //Recarga los pedidos
  const [RecargarPedidos, setRecargarPedidos] = useState(false);

  //Prueba de Pedido grande
  const [openPedidoGrande, setOpenPedidoGrande] = useState(false);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(false);

  const auth = getAuth(firebaseApp);

  //leer data de Firebase
  useEffect(() => {
    onAuthStateChanged(auth, async (usuarioFirebase) => {
      if (usuarioFirebase) {
        try {
          const querySnapshot = await getDocs(collection(db, "pedidos"));
          const docs = [];
          querySnapshot.forEach((doc) => {
            docs.push({ ...doc.data(), id: doc.id });
          });
          setPedidos(docs);
        } catch (error) {
          console.log(error);
        }
      }
    });

    setRecargarPedidos(false);
  }, [RecargarPedidos]);

  return (
    <DeliveryContext.Provider
      value={{
        pedidos,
        setPedidos,
        setRecargarPedidos,
        openPedidoGrande,
        setOpenPedidoGrande,
        pedidoSeleccionado,
        setPedidoSeleccionado,
      }}
    >
      {children}
    </DeliveryContext.Provider>
  );
};

export { DeliveryContext, DeliveryProvider };

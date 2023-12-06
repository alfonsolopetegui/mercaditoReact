"use client";
import { createContext, useState, useEffect, useContext } from "react";

//modulos de Firebase
import firebaseApp from "@/firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import AuthContext from "./AuthProvider";

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

  // Estado para la carta abierta en cada mesa
  const [cartasAbiertasPedidos, setCartasAbiertasPedidos] = useState({});

  const { user } = useContext(AuthContext);

  const auth = getAuth(firebaseApp);

  //leer data de Firebase
  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "pedidos"));
          const docs = [];
          querySnapshot.forEach((doc) => {
            docs.push({ ...doc.data(), id: doc.id });
          });
          setPedidos(docs);
          console.log("fetch desde pedidos");
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }

    setRecargarPedidos(false);
  }, [RecargarPedidos, user]);

  const cerrarCartaPedidos = () => {
    setCartasAbiertasPedidos({});
  };

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
        cartasAbiertasPedidos,
        setCartasAbiertasPedidos,
        cerrarCartaPedidos,
      }}
    >
      {children}
    </DeliveryContext.Provider>
  );
};

export { DeliveryContext, DeliveryProvider };

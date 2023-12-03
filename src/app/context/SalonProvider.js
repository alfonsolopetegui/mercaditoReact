"use client";
import { createContext, useState, useEffect } from "react";

//modulos de Firebase
import firebaseApp from "@/firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const db = getFirestore(firebaseApp);

import { getAuth, onAuthStateChanged } from "firebase/auth";

const SalonContext = createContext({});

export const SalonProvider = ({ children }) => {
  //Guarda las mesas activas
  const [mesas, setMesas] = useState([]);
  const [productosMesa, setProductosMesa] = useState([]);
  const [mesaSeleccionada, setMesaSeleccionada] = useState(null);
  const [openMesaGrande, setOpenMesaGrande] = useState(false);
  //recarga el estado mesas
  const [recargarMesas, setRecargarMesas] = useState(false);
  //muestra el confirm
  const [confirm, setConfirm] = useState(false);

  const auth = getAuth(firebaseApp);

  //leer data de Firebase
  useEffect(() => {
    onAuthStateChanged(auth, async (usuarioFirebase) => {
      if (usuarioFirebase) {
        try {
          const querySnapshot = await getDocs(collection(db, "mesas"));
          const docs = [];
          querySnapshot.forEach((doc) => {
            docs.push({ ...doc.data(), id: doc.id });
          });
          setMesas(docs);
          // setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
    });

    setRecargarMesas(false);
  }, [recargarMesas]);

  return (
    <SalonContext.Provider
      value={{
        mesas,
        setMesas,
        productosMesa,
        setProductosMesa,
        mesaSeleccionada,
        setMesaSeleccionada,
        openMesaGrande,
        setOpenMesaGrande,
        setRecargarMesas,
        setConfirm,
      }}
    >
      {children}
    </SalonContext.Provider>
  );
};

export default SalonContext;

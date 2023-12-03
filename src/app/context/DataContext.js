"use client";
import { createContext, useState, useEffect } from "react";

import AuthContext from "./AuthProvider";

//modulos de Firebase
import firebaseApp from "@/firebase";
import { signOut } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDocs,
  getDoc,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

const db = getFirestore(firebaseApp);

import { getAuth, onAuthStateChanged } from "firebase/auth";

// const dataURL = "http://localhost:5000/productos";

//url api externa
const expressURL = "http://localhost:8080/v1/productsList";

export const DataContext = createContext();

const itemsPerPage = 15;

export const DataContextProvider = ({ children }) => {
  //guarda la data de Firebase
  const [data, setData] = useState([]);
  //Vuelve a llamar a Firebase ante cambios
  const [recargar, setRecargar] = useState(false);
  //Manejador del Loader
  const [isLoading, setIsLoading] = useState(true);
  //Cambia el formulario de creación a edición
  const [edit, setEdit] = useState(false);
  //guarda lo ingresado en la búsqueda
  const [search, setSearch] = useState("");
  const [currentFilter, setCurrentFilter] = useState([]);
  const [visibleSelected, setVisibleSelected] = useState(false);
  //Muestra u oculta el formulario de creación de producto
  const [showForm, setShowForm] = useState(false);
//Muestra el formulario de New User
  const [visibleNewUser, setVisibleNewUser] = useState(false);
  //guarda el producto a editar
  const [update, setUpdate] = useState(null);
  //COntrola la paginación
  const [pagination, setPagination] = useState({
    currentPage: 0,
    maxIndexPage: itemsPerPage,
    minIndexPage: 0,
  });

  const auth = getAuth(firebaseApp);

  //Agregar producto en Firebase
  const crearProducto = async (product) => {
    try {
      await addDoc(collection(db, "productos"), {
        ...product,
      });
      console.log("Producto creado con éxito");
      // setDato(valorInicial);
    } catch (error) {
      console.log(error);
    }
  };
  //Borrar producto de Firebase
  const borrarProducto = async (product) => {
    try {
      await deleteDoc(doc(db, "productos", product.id));
      setRecargar(true);
    } catch (error) {
      console.error(error);
    }
  };

  //Actualizar producto de Firebase
  const actualizarProducto = async (product) => {
    try {
      const docRef = doc(db, "productos", product.id); // subId contiene el ID del documento que deseas actualizar
      await setDoc(docRef, product); // actualProduct contiene los nuevos valores a actualizar
      setRecargar(true); // Esto puede ayudar a recargar la lista de productos después de la actualización.
      // También puedes limpiar el estado actualProduct si es necesario.
      // setActualProduct(null);
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };

  //leer data de Firebase
  useEffect(() => {
    onAuthStateChanged(auth, async (usuarioFirebase) => {
      if (usuarioFirebase) {
        try {
          const querySnapshot = await getDocs(collection(db, "productos"));
          const docs = [];
          querySnapshot.forEach((doc) => {
            docs.push({ ...doc.data(), id: doc.id });
          });
          setData(docs);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
    });

    setRecargar(false);
  }, [recargar]);

  return (
    <DataContext.Provider
      value={{
        data,
        crearProducto,
        borrarProducto,
        edit,
        setEdit,
        update,
        setUpdate,
        actualizarProducto,
        search,
        setSearch,
        currentFilter,
        setCurrentFilter,
        visibleSelected,
        setVisibleSelected,
        pagination,
        setPagination,
        setShowForm,
        showForm,
        recargar,
        setRecargar,
        setIsLoading,
        visibleNewUser,
        setVisibleNewUser
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;

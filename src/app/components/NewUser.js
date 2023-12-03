"use client";
import { useContext, useEffect, useRef, useState } from "react";
import DataContext from "../context/DataContext";
import styles from "../../styles/newProduct.module.css";

//Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark } from "@fortawesome/free-regular-svg-icons";

//Firebase
import firebaseApp from "@/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export const NewUser = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("");

  const { setShowForm, setVisibleNewUser } = useContext(DataContext);

  const form = useRef();
  const {
    crearProducto,
    setRecargar,
    edit,
    setEdit,
    update,
    setUpdate,
    actualizarProducto,
    currentFilter,
    setCurrentFilter,
  } = useContext(DataContext);

  // console.log(product)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const infoUsuario = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      ).then((usuarioFirebase) => {
        return usuarioFirebase;
      });
      console.log("usuario creado con éxito", infoUsuario);

      const docRef = doc(db, `usuarios/${infoUsuario.user.uid}`);
      setDoc(docRef, { nombre, apellido, email, rol });
      console.log("usuario guardado en db");
    } catch (error) {
      console.log(error);
    }
  };

  //Boton cerrar formulario
  const closeForm = () => {
    setVisibleNewUser(false);
  };

  return (
    <div>
      <form
        ref={form}
        className={styles["form-new-product"]}
        onSubmit={handleSubmit}
      >
        <div className={styles["close-btn-container"]}>
          <FontAwesomeIcon
            className={styles["close-btn"]}
            onClick={closeForm}
            icon={faRectangleXmark}
          />
        </div>
        <label htmlFor="nombre">
          nombre
          <input
            type="text"
            name="nombre"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          ></input>
        </label>

        <label htmlFor="apellido">
          apellido
          <input
            type="text"
            name="apellido"
            id="apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          ></input>
        </label>

        <label htmlFor="email">
          email
          <input
            autoComplete="on"
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </label>

        <label htmlFor="password">
          password
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </label>

        <label htmlFor="rol">
          rol
          <input
            type="text"
            name="rol"
            id="rol"
            value={rol}
            onChange={(e) => setRol(e.target.value)}
          ></input>
        </label>

        <button className={styles["formBtn"]}>crear usuario</button>
      </form>
    </div>
  );
};

"use client";
import { useState, useEffect, useContext } from "react";
import firebaseApp from "@/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AuthContext from "./context/AuthProvider";
import Loader from "./components/Loader";
import Link from "next/link";
import Login from "./components/Login";
import styles from "./page.module.css";
import DataContext from "./context/DataContext";
import { DeliveryContext } from "./context/DeliveryContext";
import SalonContext from "./context/SalonProvider";

export default function LoginPage() {
  const auth = getAuth(firebaseApp);
  const { user } = useContext(AuthContext);

  const { setRecargar } = useContext(DataContext);
  const { setRecargarPedidos } = useContext(DeliveryContext);
  const { setRecargarMesas } = useContext(SalonContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      setRecargar(true);
      setRecargarPedidos(true);
      setRecargarMesas(true);
    });

    // Limpiar el listener cuando el componente se desmonta
    return () => unsubscribe();
  }, [auth, setRecargar, setRecargarPedidos, setRecargarMesas]);

  return (
    <>
      <div className={styles["welcome"]}>
        {loading ? (
          <Loader />
        ) : user ? (
          <div className={styles["titulos-wrapper"]}>
            <div className={styles["titulos"]}>
              <h1>Barcito</h1>
              <h4>de la esquina</h4>
              <h5>Bienvenido {user.email}</h5>
              <Link href={"/Salon"} className={styles["comenzar-btn"]}>
                Comenzar
              </Link>
            </div>
          </div>
        ) : (
          !loading && (
            <div className={styles["login-wrapper"]}>
              <Login auth={auth} />
            </div>
          )
        )}
      </div>
    </>
  );
}

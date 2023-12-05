"use client";
import Link from "next/link";
import styles from "../../styles/navPrincipal.module.css";
import { getAuth, signOut } from "firebase/auth";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthProvider";
import { useRouter, usePathname } from "next/navigation";

const NavPrincipal = () => {
  const { user } = useContext(AuthContext);
  const { push } = useRouter();
  const currentPage = usePathname();
  const [paginaActiva, setPaginaActiva] = useState("");

  const router = useRouter();

  useEffect(() => {
    setPaginaActiva(currentPage);
  }, [currentPage]);

  const handleSignOut = async () => {
    const auth = getAuth(); // Obtiene la instancia de autenticación de Firebase
    try {
      await signOut(auth); // Realiza el cierre de sesión

      push("/");

      console.log("Cierre de sesión exitoso");
    } catch (error) {
      console.error("Error al cerrar la sesión", error);
    }
  };

  const handleLogin = () => {
    router.push("/");
  };

  const handleLinkClick = (e, pathname) => {
    e.preventDefault();
    push(pathname);
    setPaginaActiva(pathname);
  };

  return (
    <>
      {user ? (
        <div className={styles["nav-principal-container"]}>
          <div className={styles["nav-principal-items"]}>
            <Link href={"/Salon"}>
              <h4
                className={paginaActiva === "/Salon" ? styles.active : ""}
                onClick={(e) => handleLinkClick(e, "/Salon")}
              >
                Salon
              </h4>
            </Link>
            <Link href={"/Delivery"}>
              <h4
                className={paginaActiva === "/Delivery" ? styles.active : ""}
                onClick={(e) => handleLinkClick(e, "/Delivery")}
              >
                Delivery
              </h4>
            </Link>
            <Link href={"/Home"}>
              <h4
                className={paginaActiva === "/Home" ? styles.active : ""}
                onClick={(e) => handleLinkClick(e, "/Home")}
              >
                Administrador
              </h4>
            </Link>
          </div>
          {user ? (
            <h2 onClick={handleSignOut}>Log out</h2>
          ) : (
            <h2 onClick={handleLogin}>Log in</h2>
          )}
        </div>
      ) : null}
    </>
  );
};

export default NavPrincipal;

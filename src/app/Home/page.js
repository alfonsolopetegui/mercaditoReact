"use client";
import { Button } from "../components/Button";
import { AdminNav } from "../components/AdminNav";
import { NewProduct } from "../components/NewProduct";
import { Search } from "../components/Search";
import TestTable from "../components/testTable";
import styles from "../../styles/home.module.css";
import DataContext from "../context/DataContext";
import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthProvider";
import { useRouter } from "next/navigation";
import { NewUser } from "../components/NewUser";

export default function Home() {
  const { showForm, visibleNewUser } = useContext(DataContext);
  const { userRole, setRutaProhibida, userLoading } = useContext(AuthContext);

  const router = useRouter();
  const { push } = router;

  useEffect(() => {
    // Verifica si el usuario está cargando
    if (userLoading) {
      return; // Espera a que la información del usuario esté disponible
    }

    console.log(userRole);
    if (userRole !== "admin") {
      setRutaProhibida(true);
      router.push("/Salon");
    }
  }, [userRole, userLoading, setRutaProhibida, router]);

  return (
    <>
      <div className={styles["app-container"]}>
        <div className={styles["controls-container"]}>
          <Search />

          <AdminNav />

          {showForm && (
            <div className={styles["new-product-container"]}>
              <NewProduct />
            </div>
          )}
          {visibleNewUser &&
            <div className={styles["new-product-container"]}>
              <NewUser />
            </div>
          }
        </div>
        <div className={styles["table-container"]}>
          <TestTable />
        </div>
      </div>
    </>
  );
}

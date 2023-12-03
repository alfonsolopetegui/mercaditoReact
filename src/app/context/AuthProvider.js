"use client";
import { createContext, useState, useEffect } from "react";
import firebaseApp from "@/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore(firebaseApp);

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  //guarda el rol
  const [userRole, setUserRole] = useState(null);
  //visibilidad del div ruta prohibida
  const [rutaProhibida, setRutaProhibida] = useState(false);

  const [userLoading, setUserLoading] = useState(true);

  const auth = getAuth(firebaseApp);

  const getUserData = async (uid) => {
    const docRef = doc(db, `usuarios/${uid}`);
    const docuCifrada = await getDoc(docRef);
    const infoFinal = docuCifrada.data();
    return infoFinal;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (usuarioFirebase) => {
      try {
        if (usuarioFirebase) {
          const DataUsuarioDb = await getUserData(usuarioFirebase.uid);

          if (DataUsuarioDb) {
            const userData = {
              uid: usuarioFirebase.uid,
              email: usuarioFirebase.email,
              nombre: DataUsuarioDb.nombre,
              apellido: DataUsuarioDb.apellido,
              rol: DataUsuarioDb.rol,
            };
            console.log(auth.currentUser)
            setUser(userData);
            setUserRole(DataUsuarioDb.rol);
          } else {
            // Tratar el caso donde DataUsuarioDb es undefined o null
            console.error("Los datos del usuario no están disponibles.");
          }
        } else {
          setUser(null);
        }

        setUserLoading(false);
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
      }
    });
    // Devuelve una función de limpieza
    return () => unsubscribe();
  }, [auth]);

  return (
    <AuthContext.Provider
      value={{ user, setUser, userRole, setRutaProhibida, rutaProhibida, userLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

"use client";
import { useEffect, useRef, useState, useContext } from "react";
import Link from "next/link";
import styles from '../../styles/login.module.css'
import { signInWithEmailAndPassword } from "firebase/auth"; // Importa la función de inicio de sesión de Firebase



const Login = ({auth}) => {

  const correoRef = useRef();
  // const errRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  // const [success, setSuccess] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      await signInWithEmailAndPassword(auth, email, password); // Realiza el inicio de sesión
      console.log('inicio de sesión exitosa')
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      
        <section className={styles["login-container"]}>
          
          <h1>Log In</h1>
          <form onSubmit={handleLogin} className={styles["login-form"]}>
            <label htmlFor="email">Correo:</label>
            <input
              type="text"
              id="email"
              ref={correoRef}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            ></input>

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            ></input>

            <button>Log In</button>
          </form>
         
          {error && <p className="text-danger">{error}</p>}

        </section>
      
    </>
  );
};

export default Login;

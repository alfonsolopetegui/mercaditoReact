"use client";
import { useEffect, useRef, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthProvider";
import Link from "next/link";

const LOGIN_URL = "http://localhost:8080/user/loginjwt";

const login = () => {
  const { setAuth } = useContext(AuthContext);
  const correoRef = useRef();
  const errRef = useRef();

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    correoRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [correo, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ correo, password }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(JSON.stringify(response?.data));

      const token = response?.data.token;
      const userName = response?.data.userName;
      setAuth({ correo, userName, token });
      setCorreo("");
      setPassword("");
      setSuccess(true);
    } catch (error) {
      if (!error?.response) {
        setErrMsg("No server response");
      } else if (error.response?.status === 400) {
        setErrMsg("Missing email or password");
      } else if (error.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <Link href="/Home">Go to Home</Link>
          </p>
        </section>
      ) : (
        <section className="login-container">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit} className="login-form">
            <label htmlFor="correo">Correo:</label>
            <input
              type="text"
              id="correo"
              ref={correoRef}
              autoComplete="off"
              onChange={(e) => setCorreo(e.target.value)}
              value={correo}
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

            <button>Sign In</button>
          </form>
          <p>
            Need an acount?
            <br />
            <span className="line">
              {/* put router link here */}
              <a href="#">Sign Up</a>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default login;

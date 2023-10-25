import { Button } from "./components/Button";
import { Nav } from "./components/Nav";
import { NewProduct } from "./components/NewProduct";
import { Search } from "./components/Search";
import TestTable from "./components/testTable";
import styles from "./page.module.css";
import Login from "./components/Login";

export default function LoginPage() {
  return (
    <>
      <div className="login-wrapper">
        <Login />
      </div>
    </>
  );
}

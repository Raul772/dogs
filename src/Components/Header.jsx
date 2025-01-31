import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Dogs from "../Assets/dogs.svg?react";
import { UserContext } from "../UserContext";
import Button from "./Forms/Button";
import styles from "./Header.module.css";

const Header = () => {
  const { data, userLogout } = useContext(UserContext);

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link className={styles.logo} to="/" aria-label="Dogs - Home">
          <Dogs />
        </Link>

        {data ? (
          <>
            <Link className={styles.login} to="/conta">
              {data.nome}
            </Link>
            <Button className={styles.login} onClick={userLogout}>Logout</Button>
          </>
        ) : (
          <Link className={styles.login} to="/login">
            Login / Criar
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;

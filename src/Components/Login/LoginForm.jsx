import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import useForm from "../../Hooks/useForm";
import { UserContext } from "../../UserContext";
import Button from "../Forms/Button";
import stylesBtn from "../Forms/Button.module.css";
import Input from "../Forms/Input";
import Error from "../Helper/Error";
import { Head } from "../Helper/Head";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const { getUser, userLogin, error, loading, login } = useContext(UserContext);
  const username = useForm();
  const password = useForm();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) getUser();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (username.validate() && password.validate())
      userLogin(username.value, password.value);
  }

  return (
    <section className="animeLeft">
      <Head title="Login" />
      <h1 className="title">Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input type="text" name="username" label="Usuário" {...username} />
        <Input type="password" name="password" label="Senha" {...password} />
        <Error>{error}</Error>
        <Button disabled={!!loading}>Entrar</Button>
      </form>

      <Link className={styles.perdeu} to="/login/perdeu">
        Perdeu a senha?
      </Link>
      <div className={styles.cadastro}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se no site.</p>
      </div>
      <Link className={stylesBtn.button} to="/login/criar">
        Cadastro
      </Link>
    </section>
  );
};

export default LoginForm;

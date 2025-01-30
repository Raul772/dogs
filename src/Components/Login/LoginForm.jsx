import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import useForm from "../../Hooks/useForm";
import { UserContext } from "../../UserContext";
import Button from "../Forms/Button";
import Input from "../Forms/Input";

const LoginForm = () => {
  
  const { userLogin } = useContext(UserContext);
  const username = useForm();
  const password = useForm();


  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (!token) getUser();
  }, []);


  async function handleSubmit(e) {
    e.preventDefault();

    if (username.validate() && password.validate())
      userLogin(username.value, password.value);
  }

  return (
    <section>
      <h1>Login</h1>
      <form action="" onSubmit={handleSubmit}>
        <Input type="text" name="username" label="Usuário" {...username} />
        <Input type="password" name="password" label="Senha" {...password} />

        <Button>Entrar</Button>
      </form>

      <Link to="/login/criar">Cadastro</Link>
    </section>
  );
};

export default LoginForm;

import { useContext } from "react";
import useFetch from "../../Hooks/useFetch";
import useForm from "../../Hooks/useForm";
import { UserContext } from "../../UserContext";
import { USER_POST } from "../../api";
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import Error from "../Helper/Error";

const LoginCreate = () => {
  const username = useForm();
  const email = useForm("email");
  const password = useForm();

  const { userLogin } = useContext(UserContext);
  const { error, loading, request } = useFetch();

  async function handleSubmit(e) {
    e.preventDefault();

    const { url, options } = USER_POST({
      username: username.value,
      email: email.value,
      password: password.value,
    });

    const { response } = await request(url, options);

    if (response.ok) userLogin(username.value, password.value);
  }

  return (
    <section className="animeLeft">
      <h1 className="title">Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Usuário" name="username" type="text" {...username} />
        <Input label="E-mail" name="email" type="email" {...email} />
        <Input label="Senha" name="password" type="password" {...password} />
        <Button disabled={loading}>Cadastrar</Button>
      </form>
      <Error>{error}</Error>
    </section>
  );
};

export default LoginCreate;

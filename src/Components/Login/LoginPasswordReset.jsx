import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PASSWORD_RESET } from "../../api";
import useFetch from "../../Hooks/useFetch";
import useForm from "../../Hooks/useForm";
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import Error from "../Helper/Error";
import { Head } from "../Helper/Head";

const LoginPasswordReset = () => {
  const [login, setLogin] = useState("");
  const [key, setKey] = useState("");
  const { error, loading, request } = useFetch();
  const navigate = useNavigate();

  const password = useForm();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get("key");
    const login = params.get("login");

    if (key) setKey(key);
    if (login) setLogin(login);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (password.validate()) {
      const { url, options } = PASSWORD_RESET({
        key,
        login,
        password: password.value,
      });

      const { response } = await request(url, options);

      if (response.ok) {
        navigate("/login");
      }
    }
  }

  return (
    <section className="animeLeft">
      <Head title="Resete a senha" />
      <h1 className="title">Resete a senha</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Nova senha"
          type="password"
          name="password"
          {...password}
        />
        <Button disabled={loading}>
          {loading ? "Resetando..." : "Resetar"}
        </Button>
      </form>
      <Error>{error}</Error>
    </section>
  );
};

export default LoginPasswordReset;

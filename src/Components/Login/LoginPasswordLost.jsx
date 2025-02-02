import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import Button from "../Forms/Button";
import Error from "../Helper/Error";
import Input from "../Forms/Input";
import { PASSWORD_LOST } from "../../api";

const LoginPasswordLost = () => {
  const login = useForm();
  const { data, loading, error, request } = useFetch();

  async function handleSubmit(e) {
    e.preventDefault();

    if (login.validate()) {
      const { url, options } = PASSWORD_LOST({
        login: login.value,
        url: window.location.href.replace("perdeu", "resetar"),
      });

      await request(url, options);
    }
  }

  return (
    <section>
      <h1 className="title">Perdeu a senha?</h1>
      {data ? (
        <p style={{ color: "#4c1" }}>{data}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <Input
            label="E-mail ou usuário"
            type="text"
            name="login"
            {...login}
          />
          <Button disabled={loading}>
            {loading ? "Enviando e-mail..." : "Enviar e-mail"}
          </Button>
        </form>
      )}

      <Error>{error}</Error>
    </section>
  );
};

export default LoginPasswordLost;

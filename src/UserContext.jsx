import { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from "./api";

export const UserContext = createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = useState(null);
  const [login, setLogin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const userLogout = useCallback(
    async function () {
      setData(null);
      setError(null);
      setLoading(false);
      setLogin(false);
      window.localStorage.removeItem("token");
    },
    []
  );

  async function getUser(token) {
    try {
      const { url, options } = USER_GET(token);
      const response = await fetch(url, options);

      if (!response.ok) throw new Error("Erro ao processar requisição");

      const dataResponse = await response.json();
      setData(dataResponse);
      setLogin(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function userLogin(username, password) {
    const { url, options } = TOKEN_POST({ username, password });

    try {
      setError(null);
      setLoading(true);

      const response = await fetch(url, options);

      if (!response.ok) throw new Error("Erro: " + response.statusText);

      const { token } = await response.json();

      window.localStorage.setItem("token", token);
      await getUser(token);

      navigate("/conta");
    } catch (error) {
      setError(error.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem("token");
      if (token) {
        const { url, options } = TOKEN_VALIDATE_POST(token);

        try {
          setError(null);
          setLoading(true);
          const response = await fetch(url, options);

          if (!response.ok) throw new Error("Token inválido");

          await getUser(token);
        } catch (e) {
          userLogout();
        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false);
      }
    }

    autoLogin();
  }, [userLogout]);

  const value = {
    userLogin,
    userLogout,
    getUser,
    data,
    error,
    loading,
    login,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

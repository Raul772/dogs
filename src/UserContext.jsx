import { createContext, useState } from "react";
import { TOKEN_POST, USER_GET } from "./api";

export const UserContext = createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = useState(null);
  const [login, setLogin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      const response = await fetch(url, options);
      if (!response.ok) throw new Error("Erro ao processar requisição");

      const { token } = await response.json();

      window.localStorage.setItem("token", token);
      getUser(token);
    } catch (error) {
      console.log(error);
    }
  }

  const value = {
    userLogin,
    data,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

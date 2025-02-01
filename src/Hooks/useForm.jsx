import { useState } from "react";

const types = {
  email: {
    regex: /^[a-z0-9.+-]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i,
    message: "E-mail inválido",
  },
  password: {
    regex: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    message:
      "A senha precisa possuir no mínimo um caracter maiúsculo, um caracter minúsculo, um dígito, um caracter especial e 8 caracteres no total.",
  },
  number: {
    regex: /^\d+$/,
    message:
      "Utilize apenas números.",
  },
};

const useForm = (type) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState(null);

  function validate(value) {
    if (type === false) return true;

    if (value.length === 0) {
      setError("Preencha um valor");
      return false;
    } else if (types[type] && !types[type].regex.test(value)) {
      setError(types[type].message);
      return false;
    }

    setError(null);
    return true;
  }

  function onChange({ target }) {
    if (error) validate(target.value);

    setValue(target.value);
  }

  return {
    value,
    error,
    setValue,
    onChange,
    validate: () => validate(value),
    onBlur: () => validate(value),
  };
};

export default useForm;

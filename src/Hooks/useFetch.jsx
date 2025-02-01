import { useCallback, useState } from "react";

const useFetch = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const request = useCallback(async (url, options) => {
    let response;
    let dataResponse;

    try {
      setError(null);
      setLoading(true);

      response = await fetch(url, options);
      dataResponse = await response.json();
      
      if (!response.ok) throw new Error(dataResponse.message);
    } catch (error) {
      dataResponse = null;
      setError(error.message);
    } finally {
      setData(dataResponse);
      setLoading(false);
      return { response, dataResponse };
    }
  }, []);

  return {
    data,
    loading,
    error,
    request,
  };
};

export default useFetch;

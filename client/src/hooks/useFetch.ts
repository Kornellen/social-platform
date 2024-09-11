import { useEffect, useState } from "react";
import axios, { AxiosError, AxiosHeaderValue, AxiosResponse } from "axios";

export function useFetch<T = any>(
  url: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  token?: AxiosHeaderValue,
  data?: any
) {
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  async function fetchData() {
    setLoading(true);

    try {
      let result: AxiosResponse<T>;
      switch (method) {
        case "GET":
          result = await axios.get(url, {
            headers: { Authorization: `Bearer ${token}` },
          });
          break;
        case "POST":
          result = await axios.post(url, data, {
            headers: { Authorization: `Bearer ${token}` },
          });
          break;
        case "PUT":
          result = await axios.put(url, data, {
            headers: { Authorization: `Bearer ${token}` },
          });
          break;
        case "PATCH":
          result = await axios.patch(url, data, {
            headers: { Authorization: `Bearer ${token}` },
          });
          break;
        case "DELETE":
          result = await axios.delete(url, {
            data: data,
            headers: { Authorization: `Bearer ${token}` },
          });
          break;

        default:
          throw new Error(`Invalid HTTP method`);
      }
      setResponse(result.data);
    } catch (error) {
      setError(error as AxiosError);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [url, method, data]);

  return { response, error, isLoading };
}

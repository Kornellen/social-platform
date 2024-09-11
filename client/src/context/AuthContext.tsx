import { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";

interface FormData {
  username: string;
  password: string;
}

interface AuthContextType {
  token: string;
  login: (formData: FormData) => any;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  token: "",
  login: () => {},
  logout: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem("token");
    return storedToken || "";
  });

  const login = async (formData: FormData) => {
    try {
      const { data } = await axios.post("http://localhost:5174/api/signin", {
        username: formData.username,
        password: formData.password,
      });

      setToken(data.token);
      localStorage.setItem("token", data.token);
      return { data: data, error: null };
    } catch (error: any) {
      console.error(error.response.data);
      return { data: null, error: error.response.data };
    }
  };

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

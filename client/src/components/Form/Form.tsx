import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { decodeJWT } from "../../utils/decodeJWT";
import { useFetch } from "../../hooks/useFetch";
import { getFormVariant, getVariant } from "../../assets/Themes/themes";
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

interface FormData {
  username: string;
  password: string;
  email?: string;
  phoneNumber?: string;
}

export default function Form({
  theme,
  mode,
}: {
  theme: "dark" | "light";
  mode: "login" | "register";
}) {
  const naviagate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    email: mode === "register" ? "" : undefined,
    phoneNumber: mode === "register" ? "" : undefined,
  });

  const [error, setError] = useState<any>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (mode === "login") {
      const { error, data } = await login(formData);

      if (error) {
        setError(error);
      } else if (data !== null) {
        const decodedToken = decodeJWT(data.token);
        naviagate(`/profile/${decodedToken?.userID}`);
      }
    } else if (mode === "register") {
      try {
        useFetch(
          "http://localhost:5174/api/signup",
          "POST",
          undefined,
          formData
        );
        naviagate(`/login`);
      } catch (error) {
        setError("Registration failed");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = () => {
    setShowPassword(!showPassword);
  };

  const variant = getVariant(theme);
  const formVariant = getFormVariant(theme);

  return (
    <main
      className={`text-xl h-full flex justify-center flex-wrap rounded-sm ${variant}`}
    >
      <section>
        <form
          onSubmit={handleSubmit}
          className={` p-2 h-full shadow-lg ${formVariant} rounded-xl flex justify-center items-center flex-wrap text-2xl `}
        >
          <div className="username w-full text-center relative">
            <label className="absolute -top-8">Username: </label>
            <input
              type="text"
              onChange={handleChange}
              name="username"
              id="username"
              className="outline-none rounded-md bg-slate-600 text-white p-1"
            />
          </div>
          {mode === "register" && (
            <>
              <div className="w-full relative text-center">
                <label className="absolute -top-8">Email: </label>
                <input
                  type="email"
                  name="email"
                  id=""
                  onChange={handleChange}
                  className="outline-none relative rounded-md bg-slate-600 text-white p-1"
                />
              </div>
              <div className="w-full relative text-center">
                <label className="absolute -top-8">
                  Phone Number: <sup className="">*Optional</sup>
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  id=""
                  onChange={handleChange}
                  className="outline-none relative rounded-md bg-slate-600 text-white p-1"
                />
              </div>
            </>
          )}
          <div className="password w-full text-center relative">
            <label className="absolute -top-8">Password: </label>
            <input
              type={showPassword ? "text" : "password"}
              onChange={handleChange}
              name="password"
              id="password"
              className="outline-none relative rounded-md bg-slate-600 text-white p-1"
            />
            <Button
              theme={theme}
              className="absolute ml-2"
              type="button"
              onClick={handleClick}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </Button>
          </div>
          <div className="submit">
            <button
              type="submit"
              className=" bg-slate-600 text-white p-2 rounded-md ease-in shadow-md w-44 hover:bg-slate-800"
            >
              {mode === "login" ? "Login" : "Register"}
            </button>
          </div>
        </form>
      </section>
      <section className="error">
        <div className="">
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </section>
      <section className="w-full text-center mt-10">
        <div>
          <Link
            className=" bg-slate-600 text-white rounded-md p-2 hover:bg-slate-700"
            to={mode === "register" ? "/login" : "/register"}
          >
            {mode === "register"
              ? "Already have account? Login Here!"
              : "Register here!"}
          </Link>
        </div>
      </section>
    </main>
  );
}

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import React, { useState } from "react";
import { decodeJWT } from "../../../utils/decodeJWT";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../components/Button/Button";
import { getFormVariant, getVariant } from "../../../assets/Themes/themes";

interface FormData {
  username: string;
  password: string;
}

export default function Form({
  theme,
}: {
  theme: "light" | "dark";
}): JSX.Element {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<any>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(
      (prevFormData): FormData => ({
        ...prevFormData,
        [e.target.name]: e.target.value,
      })
    );
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error, data } = await login(formData);

    if (error) {
      setError(error);
    }
    if (data !== null) {
      const decodedToken = decodeJWT(data.token);
      navigate(`/profile/${decodedToken?.userID}`);
    }
  };

  const handleClick = () => {
    setShowPassword(!showPassword);
  };

  const variant = getVariant(theme);

  const formVariant = getFormVariant(theme);

  return (
    <section
      className={`text-xl h-full flex justify-center flex-wrap rounded-sm ${variant}`}
    >
      <form
        onSubmit={handleSubmit}
        className={`h-1/2 shadow-lg ${formVariant} rounded-xl flex justify-center items-center flex-wrap text-2xl `}
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
            Login
          </button>
        </div>
      </form>
      <div className="text-red-500">
        {error
          ? error.length >= 1
            ? error?.errors.map((error: any) => <p>{error.msg}</p>)
            : error?.error
          : null}
      </div>
      <section className="w-full text-center m-4 h-1/3">
        <Link
          className=" bg-slate-600 text-white rounded-md p-2 hover:bg-slate-700"
          to={"/register"}
        >
          You can register here!
        </Link>
      </section>
    </section>
  );
}

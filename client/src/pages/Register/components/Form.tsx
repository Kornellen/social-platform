import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { getFormVariant, getVariant } from "../../../assets/Themes/themes";

interface FormData {
  username: string;
  email: string;
  password: string;
  phoneNumber?: string;
}

export default function Form({
  theme,
}: {
  theme: "light" | "dark";
}): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const variant = getVariant(theme);

  const formVaraint = getFormVariant(theme);

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

    const { data } = await axios.post(
      "http://localhost:5174/api/signup",
      formData
    );

    return data;
  };

  return (
    <main
      className={`text-xl h-full flex justify-center flex-wrap rounded-sm ${variant}`}
    >
      <section>
        <form
          onSubmit={handleSubmit}
          className={`h-1/2 shadow-lg ${formVaraint} rounded-xl flex justify-center items-center flex-wrap text-2xl text-center`}
        >
          <div className="w-full relative">
            <label className="absolute -top-8">Username:</label>
            <input
              type="text"
              name="username"
              onChange={handleChange}
              className="outline-none relative rounded-md bg-slate-600 text-white p-1"
            />
          </div>
          <div className="w-full relative">
            <label className="absolute -top-8">Email: </label>
            <input
              type="email"
              name="email"
              id=""
              onChange={handleChange}
              className="outline-none relative rounded-md bg-slate-600 text-white p-1"
            />
          </div>
          <div className="w-full relative">
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
          <div className="w-full relative">
            <label className="absolute -top-8">Password:</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              className="outline-none relative rounded-md bg-slate-600 text-white p-1"
            />
          </div>
          <div className=" bg-slate-600 p-2 rounded-md ease-in shadow-md w-44 hover:bg-slate-800 text-white">
            <button type="submit" className="w-full">
              Register
            </button>
          </div>
        </form>
        <section className="p-2 mt-2 text-center">
          <Link
            className=" bg-slate-600 text-white rounded-md p-2 hover:bg-slate-700"
            to={"/login"}
          >
            Already have account?
          </Link>
        </section>
      </section>
    </main>
  );
}

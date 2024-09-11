import { ThemesVariants } from "../../context/ThemeContext";

export const getVariant = (theme: ThemesVariants): string => {
  return theme == "light"
    ? "bg-slate-500 text-black"
    : "bg-dark-700 text-light-200";
};

export const getFormVariant = (theme: ThemesVariants): string => {
  return theme == "light"
    ? "bg-light-300 text-black"
    : "bg-dark-500 text-white";
};

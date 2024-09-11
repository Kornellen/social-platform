import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type ThemesVariants = "light" | "dark";

interface ThemeContextType {
  theme: ThemesVariants;
  changeTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  changeTheme: () => {},
});

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme") as ThemesVariants;
    return storedTheme || "light";
  });

  const changeTheme = (): void => {
    setTheme(
      (current): ThemesVariants => (current === "light" ? "dark" : "light")
    );
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

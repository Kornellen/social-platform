import { getVariant } from "../../assets/Themes/themes";
import Form from "../../components/Form/Form";
import { useTheme } from "../../context/ThemeContext";
// import Form from "./components/Form";

export default function Register(): JSX.Element {
  const { theme } = useTheme();

  const variant = getVariant(theme);

  return (
    <div className={`h-screen w-full text-2xl ${variant}`}>
      <h1 className="text-3xl text-center p-2">Register</h1>
      {/* <Form theme={theme} /> */}
      <Form theme={theme} mode="register" />
    </div>
  );
}

import { getVariant } from "../../assets/Themes/themes";
import Form from "../../components/Form/Form";
import { useTheme } from "../../context/ThemeContext";

export default function Login(): JSX.Element {
  const { theme } = useTheme();

  const variant = getVariant(theme);

  return (
    <main className={`h-screen p-2 ${variant} w-full`}>
      <h1 className="text-3xl text-center p-2">Login</h1>
      <Form theme={theme} mode="login" />
    </main>
  );
}

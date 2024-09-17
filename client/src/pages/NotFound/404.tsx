import { getVariant } from "../../assets/Themes/themes";
import Button from "../../components/Button/Button";
import { useTheme } from "../../context/ThemeContext";

export default function NotFound(): JSX.Element {
  const { theme } = useTheme();

  const variant = getVariant(theme);
  return (
    <div
      className={`flex flex-wrap text-center text-4xl justify-center ${variant} items-center h-full`}
    >
      <div className="w-full">
        <h1>404: Page Not Found</h1>
        <Button onClick={(): void => window.history.back()} theme={theme}>
          Go Home
        </Button>
      </div>
    </div>
  );
}

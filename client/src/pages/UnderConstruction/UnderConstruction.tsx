import Button from "../../components/Button/Button";
import { useTheme } from "../../context/ThemeContext";

export default function UnderConstrucionPage(): JSX.Element {
  const { theme } = useTheme();
  return (
    <div className="h-screen p-2 w-full text-2xl text-center bg-slate-400 text-white">
      <h1>Page Under Construction</h1>
      <br />
      <pre>
        This page is currently under construction. Please check back later.
      </pre>
      <br />
      <pre>Thank you for your understanding.</pre>
      <div className="m-2">
        <Button theme={theme} onClick={() => history.back()}>
          Go Back
        </Button>
      </div>
    </div>
  );
}

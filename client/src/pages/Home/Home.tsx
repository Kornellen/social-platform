import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

import Post from "../../components/Post/Post";
import { getVariant } from "../../assets/Themes/themes";

export default function Home(): JSX.Element {
  const { theme } = useTheme();
  const { token } = useAuth();

  const variant = getVariant(theme);

  return (
    <div className={`w-full h-full p-2 ${variant}`}>
      <div className="">
        <h1 className="text-3xl font-bold underline">Home</h1>
      </div>
      <div className="">
        <p className="text-2xl">Welcome to the home page</p>
      </div>
      <div className="">
        <Post token={token} />
      </div>
    </div>
  );
}

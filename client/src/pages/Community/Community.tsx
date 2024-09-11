import { useAuth } from "../../context/AuthContext";
import Post from "../../components/Post/Post";
import User from "./components/User";
import { useTheme } from "../../context/ThemeContext";
import { getVariant } from "../../assets/Themes/themes";

export default function Community(): JSX.Element {
  const { token } = useAuth();
  const { theme } = useTheme();

  const variant = getVariant(theme);

  return (
    <main className={`h-screen w-full ${variant}`}>
      <h1 className="text-3xl text-center p-2">Community</h1>
      <section className="flex">
        <section className="h-full w-1/2">
          <h1 className="text-3xl text-center p-2">Posts</h1>
          <Post token={token} />
        </section>
        <section className="h-full">
          <h1 className="text-3xl text-center p-2">Users</h1>
          <User token={token} />
        </section>
      </section>
    </main>
  );
}

//Hooks
import { useAuth } from "../../../context/AuthContext";
import { useTheme } from "../../../context/ThemeContext";
import { useNavigate } from "react-router";
import { useFetch } from "../../../hooks/useFetch";

//Utils
import { decodeJWT } from "../../../utils/decodeJWT";

//Components
import Button from "../../../components/Button/Button";
import Anchor from "../../../components/Link/Link";

//Themes
import { getVariant } from "../../../assets/Themes/themes";

interface FetchResult {
  user: {
    id: string;
    email: string;
    password: string;
    phoneNumber: string;
    role: string;
    username: string;
  };
  userProfile: {
    id: string;
    avatar: string;
    bio: string;
    location: string;
    userId: string;
    website: string;
  };
}

export default function DynamicDashboard(): JSX.Element {
  const { token, logout } = useAuth();
  const { theme } = useTheme();
  const decodedToken = token ? decodeJWT(token) : null;
  const navigate = useNavigate();

  const { response, error, isLoading } = useFetch<FetchResult>(
    `http://localhost:5174/api/profile/${decodedToken?.userID}`,
    "GET",
    token
  );

  const variant = getVariant(theme);

  if (!response?.user || isLoading) {
    return <div className="">Loading...</div>;
  }

  const { user, userProfile } = response;

  if (decodedToken?.userID != response.user.id) {
    navigate(`/community/user/${user.id}`);
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <main
      className={`flex w-full h-full justify-center text-3xl p-2 ${variant} `}
    >
      <section className="w-full">
        <nav className="flex justify-end w-full">
          <Button
            theme={theme}
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            Logout
          </Button>{" "}
          {user.id == decodedToken?.userID && (
            <Button
              theme={theme}
              onClick={() => navigate(`/profile/${user.id}/settings`)}
            >
              Settings
            </Button>
          )}
        </nav>
        <header>
          <h1>
            Welcome <code>{user.username}</code>!
          </h1>
        </header>
        <section>
          <section>
            <div className="bio">
              <pre>Bio: {userProfile.bio}</pre>
            </div>
          </section>
          <section>
            <div className="role">Role: {user.role}</div>
          </section>
          <section>
            <div className="location">
              {userProfile.location && `Location: ${userProfile.location}`}
            </div>
            <div className="website">
              {userProfile.website && (
                <Anchor to={userProfile.website} theme={theme}>
                  Website: {userProfile.website}
                </Anchor>
              )}
            </div>
          </section>
        </section>
      </section>
    </main>
  );
}

import { useParams } from "react-router";
import { useFetch } from "../../hooks/useFetch";
import { useTheme } from "../../context/ThemeContext";
import { getVariant } from "../../assets/Themes/themes";

interface userProfile {
  id: string;
  userId: string;
  bio: string;
  location: string;
  user: {
    username: string;
  };
  website: string;
}

export default function User(): JSX.Element {
  const { userId } = useParams();
  const { theme } = useTheme();

  const { response, error, isLoading } = useFetch(
    `http://localhost:5174/api/profile/${userId}`,
    "GET"
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (response === null) {
    return <div>User not found</div>;
  }

  const userProfile: userProfile = response?.userProfile;

  const varaint = getVariant(theme);

  return (
    <div className={`h-screen text-2xl w-full ${varaint}`}>
      <div className="">
        <h1>{userProfile.user.username}</h1>
      </div>
      <div className="">{userProfile.bio}</div>
      <div className="">{userProfile.location}</div>
      <div className="">{userProfile.website}</div>
    </div>
  );
}

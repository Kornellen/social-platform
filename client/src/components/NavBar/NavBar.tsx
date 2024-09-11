import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { Link, Outlet } from "react-router-dom";
import { decodeJWT } from "../../utils/decodeJWT";
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoon,
  faRightToBracket,
  faSun,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

export default function NavBar() {
  const { theme, changeTheme } = useTheme();
  const { token } = useAuth();

  const decodedToken = decodeJWT(token);

  const routes = [
    {
      path: "community",
      name: "Community",
      icon: <FontAwesomeIcon icon={faUsers} />,
    },
  ];

  if (token == "") {
    routes.push({
      path: "/login",
      name: "Login",
      icon: <FontAwesomeIcon icon={faRightToBracket} />,
    });
  } else {
    routes.push({
      path: `/profile/${decodedToken?.userID}`,
      name: "Profile",
      icon: <FontAwesomeIcon icon={faUser} />,
    });
  }

  const variant =
    theme == "light"
      ? "bg-light-300 text-dark-400"
      : "bg-dark-900 text-light-200";

  return (
    <>
      <nav className={`sticky p-2 top-0 flex text-2xl w-full ${variant} z-30`}>
        <div className="logo w-72 justify-center flex items-center">
          <Link to={"/"}>Logo</Link>
        </div>
        <div className="nav-links w-full">
          <ul className="flex justify-end items-center">
            <Button
              theme={theme}
              className="border-2 h-12 rounded-md p-2 items-center flex duration-700 justify-center"
              onClick={changeTheme}
            >
              {theme == "light" ? (
                <FontAwesomeIcon icon={faSun} />
              ) : (
                <FontAwesomeIcon icon={faMoon} />
              )}
            </Button>
            {routes.map((route, index) => {
              return (
                <Link
                  className="border-2 gap-5 m-2 rounded p-2"
                  to={route.path}
                  key={index}
                  title={route.name}
                >
                  {route.icon} {route.name}
                </Link>
              );
            })}
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

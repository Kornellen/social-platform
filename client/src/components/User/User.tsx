import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import { decodeJWT } from "../../utils/decodeJWT";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

export default function User({ token }: { token: string }): JSX.Element {
  const [users, setUsers] = useState<any[]>([]);

  const usersFetch = useFetch("http://localhost:5174/api/users", "GET", token);

  const decoded = decodeJWT(token);

  useEffect(() => {
    if (usersFetch.response) {
      setUsers(usersFetch.response.users);
    }
  }, [usersFetch.response]);

  if (usersFetch.isLoading) {
    return <div>Loading...</div>;
  }
  if (usersFetch.error) {
    return <div>Error: {usersFetch.error?.message}</div>;
  }

  return (
    <div className="users flex">
      {users.map((user) => (
        <div
          key={user.id}
          className="relative text-2xl p-2 m-2 h-60 w-80 rounded-md bg-dark-600 hover:bg-dark-500 text-white"
        >
          <div className="h-full -left-0 top-0 bg-dark-900 w-2 absolute rounded-tl-md rounded-bl-md"></div>
          <div className="p-2 bg-transparent text-center">
            <div className="w-full">
              <pre>
                <Link to={`/community/user/${user.userId}`}>
                  {user.user.username}{" "}
                </Link>
                {decoded?.userID === user.userId && (
                  <Link
                    className="absolute right-7"
                    to={`/profile/${decoded?.userID}/settings`}
                  >
                    <FontAwesomeIcon icon={faGear} />
                  </Link>
                )}
              </pre>
            </div>
            <div className="">{user.bio || "User don't have bio"}</div>
            <div className="border-2 h-36 p-2 m-2">
              <img src={user.avatar} alt="User Avatar" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

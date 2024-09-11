import { useState, useEffect } from "react";
import { useFetch } from "../../../hooks/useFetch";
import { Link } from "react-router-dom";
import { decodeJWT } from "../../../utils/decodeJWT";

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
        <div key={user.id} className="text-2xl border-2 p-2 m-2 w-80">
          <div className="">
            <pre>
              <Link to={`/community/user/${user.userId}`}>
                {user.user.username} {decoded?.userID == user.userId && "(You)"}
              </Link>
            </pre>
          </div>
          <div className="">{user.bio || "User don't have bio"}</div>
          <div className=""></div>
        </div>
      ))}
    </div>
  );
}

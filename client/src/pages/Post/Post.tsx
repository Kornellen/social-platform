import { useParams } from "react-router";
import { useFetch } from "../../hooks/useFetch";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import { useTheme } from "../../context/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Form from "./components/Form";
import { getVariant } from "../../assets/Themes/themes";

export default function Post(): JSX.Element {
  const { theme } = useTheme();
  const { token } = useAuth();
  const { postId } = useParams();
  const { response, error, isLoading } = useFetch(
    `http://localhost:5174/api/post?id=${postId}`,
    "GET",
    token
  );

  const [likes, setLikes] = useState<number>(0);

  useEffect(() => {
    if (response) {
      setLikes(response.likes);
    }
  }, [response]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !response) {
    console.error(error ? error : "No data");

    return <div>Something went wrong...</div>;
  }

  const handleClick = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5174/api/like/${postId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.info == "Liked") {
        setLikes((prev) => prev + 1);
      } else if (data.info == "Like removed") {
        setLikes((prev) => prev - 1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const variant = getVariant(theme);

  const addedAt = new Date(response.addedAt);

  return (
    <div className={`h-screen p-2 w-full text-2xl ${variant}`}>
      <div className="post h-full p-2">
        <header>
          <h1>{response.title}</h1>
          <pre>
            <Link to={`/community/user/${response.authorId}`}>
              {response.author}
            </Link>
          </pre>
        </header>
        <main>
          <div className="">
            <p>{addedAt.toLocaleString()}</p>
          </div>
          <div className="">
            <p>{response.content}</p>
          </div>
          <div className="">
            <Button theme={theme} onClick={handleClick}>
              <div className="flex gap-2">
                <div className="">
                  <FontAwesomeIcon icon={faHeart} className={`text-pink-400`} />
                </div>
                <div className="">
                  <p>{likes}</p>
                </div>
              </div>
            </Button>
          </div>
        </main>
        <footer>
          <details>
            <summary>{response.comments.length} Comments</summary>
            {response.comments.length > 0
              ? response.comments.map(
                  (comment: { id: string; content: string; user: string }) => (
                    <div
                      className="comment bg-dark-600 text-white gap-2 border-b-2 m-2 hover:bg-dark-300 hover:text-dark-600 p-2 rounded-md shadow-md"
                      key={comment.id}
                    >
                      <p>{comment.content}</p>
                      <pre>{comment.user}</pre>
                    </div>
                  )
                )
              : "There's no comments!"}
            <Form postId={String(postId)} />
          </details>
        </footer>
      </div>
    </div>
  );
}

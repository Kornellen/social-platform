import { Link } from "react-router-dom";
import axios from "axios";

//Hookes
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useFetch } from "../../hooks/useFetch";

export default function Post({ token }: { token: string }): JSX.Element {
  const { response, error, isLoading } = useFetch(
    "http://localhost:5174/api/posts",
    "GET",
    token
  );
  const navigate = useNavigate();

  const [likes, setLikes] = useState<number[]>(
    response ? response?.posts.map((post: any) => post.likes) : []
  );

  const handleLike = async (postId: string, i: number) => {
    try {
      const response = await axios.get(
        `http://localhost:5174/api/like/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.info === "Like removed") {
        setLikes((prev) =>
          prev.map((like, index) => (i === index ? like - 1 : like))
        );
      } else if (response.data.info === "Liked") {
        setLikes((prev) =>
          prev.map((like, index) => (i === index ? like + 1 : like))
        );
      }
    } catch (error) {
      console.error(error);
      throw new Error("Something went wrong...");
    }
  };

  useEffect(() => {
    if (response && response.posts) {
      setLikes(response.posts.map((post: any) => post.likes));
    }
  }, [response]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || response == null || response.posts == undefined) {
    return <div>Something went wrong...</div>;
  }

  return (
    <div className="posts">
      {response?.posts.map((post: any, key: any) => (
        <div
          key={key}
          className="text-2xl border-2 border-dark-500 rounded-md hover:cursor-pointer hover:border-dark-300 hover:bg-dark-500 p-2 m-2"
        >
          <header>
            <h1
              className=""
              onClick={() => navigate(`/community/post/${post.id}`)}
            >
              {post.title}
            </h1>
          </header>
          <main>
            <aside>
              <pre>
                Author{" "}
                <Link to={`/community/user/${post.authorId}`}>
                  {post.user.username}
                </Link>
              </pre>
            </aside>
            <section>
              <div className="">
                <p className="text-md">{post.content}</p>
              </div>
              <div className="">
                Likes{" "}
                <button onClick={() => handleLike(post.id, key)}>
                  {likes[key]}
                </button>
              </div>
            </section>
          </main>
        </div>
      ))}
    </div>
  );
}

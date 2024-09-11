import { useAuth } from "../../../context/AuthContext";
import { FormEvent, ChangeEvent, useState } from "react";
import axios from "axios";
import Button from "../../../components/Button/Button";
import { useTheme } from "../../../context/ThemeContext";

interface Error {
  response: {
    data: {
      errors: [];
    };
  };
}

interface Success {
  info: string;
}

export default function Form({ postId }: { postId: string }): JSX.Element {
  const { token } = useAuth();
  const { theme } = useTheme();

  const [form, setForm] = useState({
    content: "",
    postId: postId,
  });

  const [error, setError] = useState<null | Error>(null);
  const [success, setSuccess] = useState<Success | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:5174/api/comment",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);

      setSuccess(data);
    } catch (error: any) {
      setError(error);
    }
  };

  return (
    <div className="">
      <form action="" onSubmit={handleSubmit}>
        <h1>Add Comment</h1>
        <div className="">
          <input
            type="text"
            onChange={handleChange}
            name="content"
            placeholder="Comment max(125)"
            maxLength={125}
            className="bg-dark-700 outline-none rounded-md p-2 border-b-2 text-white placeholder:text-white"
          />
        </div>
        <div className="">
          <Button theme={theme} type="submit">
            Submit
          </Button>
        </div>
      </form>
      <div className="">
        {error && (
          <p className="text-red-500">
            {error.response.data?.errors.map((error: any): any => error.msg)}
          </p>
        )}
        {success && <p className="text-green-500">{success.info}</p>}
      </div>
    </div>
  );
}

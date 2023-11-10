import { FC, FormEvent, useEffect, useState } from "react";
import Header from "../components/Header";
import { useMe } from "../hooks";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Create: FC = () => {
  const { account, getMe } = useMe();

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const navigate = useNavigate();

  const onSubmitCreate = async (e: FormEvent) => {
    try {
      e.preventDefault();
      if (!title || !content) {
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_BACK_URL!}/post`,
        { title, content },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setTitle("");
      setContent("");

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  return (
    <>
      <Header account={account} />
      <main className="max-w-screen-md mx-auto text-center py-24">
        <h1 className="text-center font-bold py-8 text-2xl">New Post</h1>
        <form
          className="flex flex-col items-end px-20"
          onSubmit={onSubmitCreate}
        >
          <label htmlFor="title" className="mb-2 self-start">
            Title
          </label>
          <input
            className="w-full text-xl px-4 py-2 focus:outline-none focus:border-blue-300  border-2 rounded-md"
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="content" className="mt-4 mb-2 self-start">
            Content
          </label>
          <textarea
            className="w-full px-4 py-2 h-96 focus:outline-none focus:border-blue-300  border-2 rounded-md resize-none"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <input className="mt-4 button-style" type="submit" value="Create" />
        </form>
      </main>
    </>
  );
};

export default Create;

import { FC, FormEvent, useEffect, useState } from "react";
import { useMe } from "../hooks";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import { IPost } from "./home";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

export interface IComments {
  content: string;
  createdAt: Date;
  id: number;
  updatedAt: Date;
  user: { account: string };
  userId: number;
}
const Detail: FC = () => {
  const [post, setPost] = useState<IPost>();
  const [comments, setComments] = useState<IComments[]>();
  const { account, getMe } = useMe();
  const { postId } = useParams();

  const [content, setContent] = useState<string>();
  const onSubmitCreate = async (e: FormEvent) => {
    try {
      e.preventDefault();
      if (!content) {
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_BACK_URL!}/comment`,
        { content, postId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setContent("");
      getComment();
    } catch (error) {
      console.error(error);
    }
  };

  const getPost = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACK_URL!}/post/${postId}`
      );

      setPost(response.data.post);
    } catch (error) {
      console.error(error);
    }
  };

  const getComment = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACK_URL!}/comment/?postId=${postId}`
      );
      setComments(response.data.comments);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMe();
    getPost();
    getComment();
  }, []);

  return (
    <>
      <Header account={account} />
      <main className="max-w-screen-md mx-auto py-24">
        {post ? (
          <>
            <div className="border-b-2">
              <h1 className="text-center font-bold py-8 text-2xl">
                {post.title}{" "}
              </h1>
              <div className="text-right pb-2 text-sm px-20">
                <span>{post.user.account}, </span>
                <span>
                  {formatDistanceToNow(new Date(post.createdAt), {
                    locale: ko,
                    addSuffix: true,
                  })}
                </span>
              </div>
            </div>
            <div className="px-20 pt-12 min-h-[360px]">{post.content}</div>
            <form
              className="flex flex-col px-20 pt-4"
              onSubmit={onSubmitCreate}
            >
              <textarea
                className="px-4 py-2 h-28 focus:outline-none focus:border-blue-300 border-2 rounded-md resize-none"
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />
              <input
                type="submit"
                className="self-end mt-2 button-style"
                value="Create"
              ></input>
            </form>
            {comments && (
              <ul className="px-20 mt-2">
                {comments.map((v, i) => (
                  <li key={i} className="flex mb-2">
                    <span className="inline-block w-20 text-right">
                      {v.user.account}
                    </span>
                    <span className="inline-block w-96 pl-2 truncate">
                      {v.content}
                    </span>
                    <span className="pl-2">
                      {formatDistanceToNow(new Date(v.createdAt), {
                        locale: ko,
                        addSuffix: true,
                      })}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          "Loading..."
        )}
      </main>
    </>
  );
};

export default Detail;

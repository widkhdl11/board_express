import axios from "axios";
import { FC, FormEvent } from "react";

const Login: FC = () => {
  const onSubmitLogIn = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        `${process.env.REACT_APP_BACK_URL!}/user`,
        {
          account: "abcd5",
          password: "1234",
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="bg-pink-100 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold">Jaewon Board Log In</h1>
      <form className="mt-4 flex items-end gap-4" onSubmit={onSubmitLogIn}>
        <div className="flex flex-col gap-2">
          <input className="input-style" type="text"></input>
          <input className="input-style" type="text"></input>
        </div>
        <input className="button-style" type="submit" value="Log In"></input>
      </form>
    </main>
  );
};

export default Login;

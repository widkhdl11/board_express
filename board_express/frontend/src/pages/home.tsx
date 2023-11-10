import { FC, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
const Home: FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log("홈");
    //<Navigate to="/log-in" replace={true}></Navigate>;
    navigate("/log-in");
  }, []);
  return <main>Home</main>;
};

export default Home;

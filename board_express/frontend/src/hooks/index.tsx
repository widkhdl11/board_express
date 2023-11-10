import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const useMe = () => {
  const [account, setAccount] = useState<string>("");
  const navigate = useNavigate();

  const getMe = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACK_URL!}/user/me`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setAccount(response.data.user.account);
    } catch (error) {
      console.error(error);

      navigate("/log-in");
    }
  };

  return { account, getMe };
};

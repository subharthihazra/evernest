import { useDispatch } from "react-redux";
import { setUser } from "../redux/user";
import axios from "axios";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

async function getUser() {
  return await axios.post(
    "http://localhost:5000/auth/isauth",
    {},
    {
      withCredentials: true,
    }
  );
}

function useAuth(req) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isAuth, setIsAuth] = useState(false);

  const mutation = useMutation({
    mutationFn: getUser,
    onError: (error, variables, context) => {
      if (req === true) {
        navigateSignin();
      }
    },
    onSuccess: (data, variables, context) => {
      if (data?.data?.success === true) {
        console.log("hoho");
        console.log(data);
        const { name } = data?.data?.data;
        dispatch(setUser({ name: name }));
        setIsAuth(true);
      } else {
        console.log("Error Occurred");
        if (req === true) {
          navigateSignin();
        }
      }
    },
  });

  useEffect(() => {
    mutation.mutate();
  }, []);

  function navigateSignin() {
    navigate("/signin");
  }
  return { isAuth, isLoading: mutation.isLoading };
}

export default useAuth;

import useAuth from "../components/useAuth";
import { useDispatch } from "react-redux";
import { unsetUser } from "../redux/user";
import axios from "axios";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

function LogoutUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationFn: async () =>
      await axios.post(
        "http://localhost:5000/auth/logout",
        {},
        {
          withCredentials: true,
        }
      ),
    onError: (error, variables, context) => {},
    onSuccess: (data, variables, context) => {
      if (data?.data?.success === true) {
        dispatch(unsetUser());
        navigateSignin();
      } else {
        console.log("Error Occurred");
      }
    },
  });

  function navigateSignin() {
    navigate("/signin");
  }
  return <button onClick={() => mutation.mutate()}>Logout</button>;
}

function Dashboard() {
  const { isAuth, isLoading } = useAuth(true);
  return (
    <>
      <div className="h-[84px] sm:h-32"></div>
      <div>
        gog {isLoading ? "Loading ..." : isAuth ? <LogoutUser /> : "noauth"}
      </div>
    </>
  );
}

export default Dashboard;

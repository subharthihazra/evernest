import React, { useState } from "react";
import * as Form from "@radix-ui/react-form";
import { useNavigate } from "react-router";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

async function getUser({ email, password }) {
  return await axios.post("http://localhost:5000/auth/signin", {
    email,
    password,
  });
}

function Signin() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState(null);
  const mutation = useMutation({
    mutationFn: getUser,
    onError: (error, variables, context) => {
      if (error.response?.status === 401) {
        console.log(error.response?.data?.message);
        setErrorMsg("Invalid Email or Password");
      } else {
        console.log("Error: ", error.message);
        setErrorMsg("Error Occurred");
      }
    },
    onSuccess: (data, variables, context) => {
      if (data?.data?.success === true) {
        console.log("hoho");
        navigateToPreviousPage();
      } else {
        setErrorMsg("Error Occurred");
      }
    },
  });

  function navigateToPreviousPage() {
    // later change it ***
    navigate("/");
  }

  function navigateSignup() {
    navigate("/signup");
  }

  function navigateForgotPassword() {
    navigate("/forgotpassword");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    mutation.mutate({
      email: e.target.email.value?.trim(),
      password: e.target.password.value,
    });
  }

  return (
    <div className="absolute top-1/2 sm:left-1/2 sm:translate-x-[-50%] translate-y-[-50%] text-base w-full">
      <Form.Root
        className="w-auto sm:w-[350px] mx-3 sm:mx-auto p-6 rounded-xl flex flex-col gap-2 bg-[rgba(255,255,255,0.8)] dark:bg-[rgba(15,96,77,0.39)] shadow-[0_0_15px_3px_rgba(0,0,0,0.1),0_0_3px_1px_rgba(0,0,0,0.05)]"
        onSubmit={handleSubmit}
      >
        <div className="text-center text-2xl">Signin</div>
        <div className="text-center">{errorMsg}</div>
        <Form.Field className="grid mb-[10px] gap-1" name="email">
          <div className="flex items-baseline justify-between">
            <Form.Label className="font-medium leading-[35px]">
              Email
            </Form.Label>
            <Form.Message
              className="text-[13px] opacity-[0.8]"
              match="valueMissing"
            >
              Enter your email
            </Form.Message>
            <Form.Message
              className="text-[13px] opacity-[0.8]"
              match="typeMismatch"
            >
              Provide a valid email
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="box-border w-full inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-base leading-none shadow-[0_0_0_1px_rgba(0,0,0,0.5)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.5)] outline-none hover:shadow-[0_0_0_1px_black]  focus:shadow-[0_0_0_2px_black] dark:hover:shadow-[0_0_0_1px_white]  dark:focus:shadow-[0_0_0_2px_white] bg-white dark:bg-black transition-all"
              type="email"
              required
            />
          </Form.Control>
        </Form.Field>
        <Form.Field className="grid mb-[10px] gap-1" name="password">
          <div className="flex items-baseline justify-between">
            <Form.Label className="font-medium leading-[35px]">
              Password
            </Form.Label>
            <Form.Message
              className="text-[13px] opacity-[0.8]"
              match="valueMissing"
            >
              Enter your password
            </Form.Message>
            <Form.Message
              className="text-[13px] opacity-[0.8]"
              match="typeMismatch"
            >
              Provide a valid password
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="box-border w-full inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-base leading-none shadow-[0_0_0_1px_rgba(0,0,0,0.5)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.5)] outline-none hover:shadow-[0_0_0_1px_black]  focus:shadow-[0_0_0_2px_black] dark:hover:shadow-[0_0_0_1px_white]  dark:focus:shadow-[0_0_0_2px_white] bg-white dark:bg-black transition-all"
              type="password"
              required
            />
          </Form.Control>
        </Form.Field>
        <div className="bg-aqua flex justify-between items-end">
          <div className="flex flex-col gap-2">
            <div onClick={navigateSignup} className="cursor-pointer">
              Sign up
            </div>
            <div onClick={navigateForgotPassword} className="cursor-pointer">
              Forgot password
            </div>
          </div>
          <Form.Submit asChild>
            <input
              type="submit"
              className="box-border inline-flex items-center justify-center rounded-[4px] bg-[rgb(15,96,77)] px-[18px] py-[12px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px] shadow-[0_0_15px_3px_rgba(0,0,0,0.1),0_0_3px_1px_rgba(0,0,0,0.05)] text-white cursor-pointer"
              value={mutation.isLoading ? "Loading" : "Signin"}
            />
          </Form.Submit>
        </div>
      </Form.Root>
    </div>
  );
}

export default Signin;

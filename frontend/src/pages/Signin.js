import React, { useState } from "react";
import * as Form from "@radix-ui/react-form";
import { useNavigate } from "react-router";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import * as EmailValidator from "email-validator";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/user";
import useAuth from "../components/useAuth";

async function getUser({ email, password }) {
  return await axios.post(
    `${String(process.env.REACT_APP_BACKEND_URL)}/auth/signin`,
    {
      email,
      password,
    },
    {
      withCredentials: true,
    }
  );
}

function Signin() {
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState(null);
  const dispatch = useDispatch();
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
        console.log(data);
        const { name } = data?.data?.data;
        dispatch(setUser({ name: name }));
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

  function navigateDashboard() {
    navigate("/dashboard");
  }

  if (isAuth) {
    navigateDashboard();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    mutation.mutate({
      email: e.target.email.value?.trim(),
      password: e.target.password.value,
    });
  }

  return (
    <>
      <div className="h-32"></div>
      <div className="text-base w-full my-6">
        <Form.Root
          className="w-auto sm:w-[400px] mx-3 sm:mx-auto p-7 rounded-xl flex flex-col gap-2 bg-[rgba(255,255,255,0.8)] dark:bg-[rgba(54,54,54)] shadow-[0_0_15px_3px_rgba(0,0,0,0.1),0_0_3px_1px_rgba(0,0,0,0.05)]"
          onSubmit={handleSubmit}
        >
          <div className="text-center text-2xl">Sign in</div>
          <div className="text-center">{errorMsg}</div>
          <Form.Field className="grid mb-[10px] gap-1" name="email">
            <div className="flex items-baseline justify-between">
              <Form.Label className="font-medium leading-[35px]">
                Email
              </Form.Label>
              <FormMessage match="valueMissing">Enter your email</FormMessage>
              <FormMessage
                match={(value, formData) => !EmailValidator.validate(value)}
              >
                Provide a valid email
              </FormMessage>
            </div>
            <Form.Control asChild>
              <input
                className="box-border w-full inline-flex appearance-none items-center justify-center rounded-[4px] px-[12px] py-2 text-base leading-none shadow-[0_0_0_1px_rgba(0,0,0,0.5)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.5)] outline-none hover:shadow-[0_0_0_1px_black]  focus:shadow-[0_0_0_2px_black] dark:hover:shadow-[0_0_0_1px_white]  dark:focus:shadow-[0_0_0_2px_white] bg-white dark:bg-slate-900 transition-all"
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
              <FormMessage match="valueMissing">
                Enter your password
              </FormMessage>
              <FormMessage match={(value, formData) => value.length < 6}>
                Minimum password length 6
              </FormMessage>
            </div>
            <Form.Control asChild>
              <input
                className="box-border w-full inline-flex appearance-none items-center justify-center rounded-[4px] px-[12px] py-2 text-base leading-none shadow-[0_0_0_1px_rgba(0,0,0,0.5)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.5)] outline-none hover:shadow-[0_0_0_1px_black]  focus:shadow-[0_0_0_2px_black] dark:hover:shadow-[0_0_0_1px_white]  dark:focus:shadow-[0_0_0_2px_white] bg-white dark:bg-slate-900 transition-all"
                type="password"
                required
              />
            </Form.Control>
          </Form.Field>
          <div className="bg-aqua flex justify-between items-end">
            <div className="flex flex-col gap-2 mt-3">
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
                className="box-border inline-flex items-center justify-center rounded-[4px] bg-[rgb(15,96,77)] px-[18px] py-[12px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px] shadow-[0_0_15px_3px_rgba(0,0,0,0.1),0_0_3px_1px_rgba(0,0,0,0.05)] text-white text-lg cursor-pointer"
                value={mutation.isLoading ? "Loading" : "Sign in"}
              />
            </Form.Submit>
          </div>
        </Form.Root>
      </div>
    </>
  );
}

function FormMessage({ children, className, ...props }) {
  return (
    <Form.Message
      className={`text-[13px] opacity-[0.8] text-right ${className}`}
      {...props}
    >
      {children}
    </Form.Message>
  );
}

export default Signin;

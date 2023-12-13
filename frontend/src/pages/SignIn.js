import React from "react";
import * as Form from "@radix-ui/react-form";
import { useNavigate } from "react-router";

function SignIn() {
  const navigate = useNavigate();

  function navigateSignup(url) {
    navigate("/signup");
  }

  function navigateForgotPassword(url) {
    navigate("/forgotpassword");
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div>
      <Form.Root className="w-[260px] m-auto" onSubmit={handleSubmit}>
        <Form.Field className="grid mb-[10px]" name="email">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-[15px] font-medium leading-[35px]">
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
              className="box-border w-full inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black]"
              type="email"
              required
            />
          </Form.Control>
        </Form.Field>
        <Form.Field className="grid mb-[10px]" name="password">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-[15px] font-medium leading-[35px]">
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
              className="box-border w-full inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black]"
              type="password"
              required
            />
          </Form.Control>
        </Form.Field>
        <div className="bg-aqua flex justify-between">
          <div>
            <div onClick={navigateSignup}>Sign up</div>
            <div onClick={navigateForgotPassword}>Forgot password</div>
          </div>
          <Form.Submit asChild>
            <input
              type="submit"
              className="box-border text-violet11 shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px]"
              value="Signin"
            />
          </Form.Submit>
        </div>
      </Form.Root>
    </div>
  );
}

export default SignIn;

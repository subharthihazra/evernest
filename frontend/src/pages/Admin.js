import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";

async function authAdmin({ username, password }) {
  return await axios.post(
    "http://localhost:5000/admin/signin",
    {
      username,
      password,
    },
    {
      withCredentials: true,
    }
  );
}
function AdminSignIn({ setIsAuth }) {
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: authAdmin,
    onError: (error, variables, context) => {
      if (error.response?.status === 401) {
        console.log(error.response?.data?.message);
        setError("Invalid Username or Password");
      } else {
        console.log("Error: ", error.message);
        setError("Error Occurred");
      }
    },
    onSuccess: (data, variables, context) => {
      if (data?.data?.success === true) {
        setIsAuth(true);
      } else {
        setError("Error Occurred");
      }
    },
  });

  const handleSignIn = (e) => {
    e.preventDefault();
    const {
      username: { value: username },
      password: { value: password },
    } = e.target;
    console.log(username);
    if (username && password) {
      mutation.mutate({ username, password });
    }
  };

  return (
    <div>
      <h2>Admin Sign In</h2>
      <form onSubmit={handleSignIn}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div>
          <button type="submit">Sign In</button>
        </div>
      </form>
    </div>
  );
}

function getProduct() {}

function ModProducts() {
  const [curtab, setCurtab] = useState(null);
  return (
    <div>
      <div>
        <button>Add Product</button>
        <button>Update Product</button>
        <button>Remove Product</button>
      </div>
      <div>{curtab === "add" && <div>Add</div>}</div>
      <div>{curtab === "update" && <div>Update</div>}</div>
      <div>{curtab === "del" && <div>Del</div>}</div>
    </div>
  );
}
function Admin() {
  const [isAuth, setIsAuth] = useState(false);
  return isAuth ? <ModProducts /> : <AdminSignIn setIsAuth={setIsAuth} />;
}

export default Admin;

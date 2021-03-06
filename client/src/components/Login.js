import React, { useState } from "react";
import { get, post } from "../http/actions";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    post("/users/login", {
      username: username,
      password: password,
    })
      .then((results) => {
        console.log("RESULTS", results.data);
        if (results.data.success) {
          localStorage.clear();
          localStorage.setItem("token", results.data.token);
        }
      })
      .catch((err) => {
        console.log("Something went wrong", err);
      });
  };
  return (
    <div className="Login">
      <label>Username</label>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      ></input>
      <label>Password</label>
      <input
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button onClick={login}>Login</button>
    </div>
  );
};

export default Login;

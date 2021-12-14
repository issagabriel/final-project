import React, { useState } from "react";
import { get, post } from "../http/actions";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const signUp = () => {
    post("/users/sign-up", {
      username: username,
      password: password,
      email: email,
    })
      .then((results) => {
        console.log("RESULTS", results.data);
        if (results.data.success) {
          localStorage.setItem("token", results.data.token);
        }
      })
      .catch((err) => {
        console.log("Something went wrong", err);
      });
  };
  return (
    <div>
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
      <label>Email</label>
      <input value={email} onChange={(e) => setEmail(e.target.value)}></input>
      <button onClick={signUp}>Sign Up</button>
    </div>
  );
};

export default SignUp;

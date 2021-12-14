import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UserProfile from "./components/UserProfile";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import SignUp from "./components/SignUp";

function App() {
  return (
    <div>
      <Header />
      <Navbar />
      <Switch>
        <Route exact path="/" component={(props) => <Home {...props} />} />
        <Route
          exact
          path="/login"
          component={(props) => <Login {...props} />}
        />
        <Route
          exact
          path="/sign-up"
          component={(props) => <SignUp {...props} />}
        />
        <Route
          exact
          path="/my-profile/:id"
          component={(props) => <UserProfile {...props} />}
        />
      </Switch>
      <Footer />
    </div>
  );
}
export default App;

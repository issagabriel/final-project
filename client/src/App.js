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
import ViewProfile from "./components/ViewProfile";
import About from "./components/About";
import Scores from "./components/Scores";

function App() {
  return (
    <div className="App">
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
          path="/my-profile"
          component={(props) => <UserProfile {...props} />}
        />
        <Route
          exact
          path="/profile/:id"
          component={(props) => <ViewProfile {...props} />}
        />
        <Route
          exact
          path="/about"
          component={(props) => <About {...props} />}
        />
        <Route
          exact
          path="/headlines"
          component={(props) => <Scores {...props} />}
        />
      </Switch>
      <Footer />
    </div>
  );
}
export default App;

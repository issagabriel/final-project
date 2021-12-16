import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="Header">
      <h1>Sports Hub</h1>
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/sign-up">Sign Up</Link>
        </li>
        <li>
          <Link to="/">Log Out</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;

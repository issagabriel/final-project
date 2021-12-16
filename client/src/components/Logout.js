import React from "react";

const Logout = () => {
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  return <div>{logout}</div>;
};

export default Logout;

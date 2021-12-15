import React from "react";
import { get } from "../http/actions";

import UserCard from "./UserCard";

const ViewProfile = (props) => {
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    get(`/users/profile/${props.match.params.id}`)
      .then((results) => {
        console.log("RESULTS", results);
        setUser(results.data);
      })
      .catch((err) => {
        console.log("Something went wrong", err.message);
      });
  }, []);

  return (
    <div>
      <h1>Someone Else's Profile</h1>
      <UserCard attributes={user} />
    </div>
  );
};

export default ViewProfile;

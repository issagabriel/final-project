import React from "react";
import { get, put, deleteComp, post } from "../http/actions";

import UserCard from "./UserCard";

const UserProfile = (props) => {
  const [user, setUser] = React.useState({});
  const [updatedUser, setUpdatedUser] = React.useState({});
  const [deletedUser, setDeletedUser] = React.useState({});

  React.useEffect(() => {
    get(`/users/my-profile/${props.match.params.id}`)
      .then((results) => {
        console.log("RESULTS", results);
        setUser(results.data);
      })
      .catch((err) => {
        console.log("Something went wrong", err.message);
      });
  }, []);

  const updateUser = () => {
    put(`/users/profile/${props.match.params.id}`)
      .then((results) => {
        setUpdatedUser(results.data);
      })
      .catch((err) => {
        console.log("Something went wrong", err.message);
      });
  };

  const deleteUser = () => {
    deleteComp(`/users/delete/${props.match.params.id}`)
      .then((results) => {
        setDeletedUser(results.data);
      })
      .catch((err) => {
        console.log("Something went wrong", err.message);
      });
  };

  return (
    <div>
      <h1>User Profile</h1>
      <UserCard attributes={user} />
      <button onClick={updateUser}>Edit Profile</button>
      <button onClick={deleteUser}>Delete Profile</button>
    </div>
  );
};

export default UserProfile;

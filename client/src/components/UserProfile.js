import React from "react";
import { get, put, deleteComp, post } from "../http/actions";
import { useHistory } from "react-router-dom";

import UserCard from "./UserCard";

const UserProfile = (props) => {
  const [user, setUser] = React.useState({});
  const [favTeams, setFavTeams] = React.useState([]);
  const [favPlayers, setFavPlayers] = React.useState([]);
  const [deletedUser, setDeletedUser] = React.useState({});

  const history = useHistory();

  React.useEffect(() => {
    get(`/users/my-profile`)
      .then((results) => {
        console.log("RESULTS", results);
        setUser(results.data);
      })
      .catch((err) => {
        console.log("Something went wrong", err.message);
      });
  }, [props]);

  const updateUser = () => {
    put(`/users/profile`, {
      favPlayers: favPlayers,
      favTeams: favTeams,
    })
      .then((results) => {
        console.log(results.data);
        localStorage.setItem(results.data.favPlayers);
        localStorage.setItem(results.data.favTeams);
      })
      .catch((err) => {
        console.log("Something went wrong", err.message);
      });
  };

  const deleteUser = () => {
    console.log("about to delete");
    deleteComp(`/users/delete`)
      .then((results) => {
        setDeletedUser(results.data);
        localStorage.clear();
        console.log("user deleted");
        history.push("/");
      })
      .catch((err) => {
        console.log("Something went wrong", err.message);
      });
  };

  return (
    <div>
      <h1>User Profile</h1>
      <UserCard attributes={user} />
      <label>List Your Favorite Players Here</label>
      <input
        value={favPlayers}
        onChange={(e) => setFavPlayers(e.target.value)}
      ></input>
      <label>List Your Favorite Teams Here</label>
      <input
        value={favTeams}
        onChange={(e) => setFavTeams(e.target.value)}
      ></input>
      <button onClick={updateUser}>Edit Profile</button>
      <button onClick={deleteUser}>Delete Profile</button>
    </div>
  );
};

export default UserProfile;

import React from "react";
import axios from "axios";
import { get } from "../http/actions";

const AllUsers = () => {
  const [usersArr, setUsersArr] = React.useState([]);

  React.useEffect(() => {
    get("/all-users")
      .then((results) => {
        console.log("these are all the users", results);
        setUsersArr(results.data);
      })
      .catch((err) => {
        console.log("something went wrong", err);
      });
  }, []);
  return (
    <div>
      <h1>All The Users</h1>
      {usersArr.map((users) => {
        return (
          <div>
            <h3>{users.username}</h3>
            <h4>{users.favTeams}</h4>
            <h4>{users.favPlayers}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default AllUsers;

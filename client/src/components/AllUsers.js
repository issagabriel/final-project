import React from "react";
import axios from "axios";
import { get } from "../http/actions";
import Comment from "./Comment";

const AllUsers = (props) => {
  const [usersArr, setUsersArr] = React.useState([]);

  React.useEffect(() => {
    get("/users/all-users")
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
        console.log(users);
        return (
          <div className="UserFeed">
            <h3>{users.username}</h3>
            <h4>{users.favTeams}</h4>
            <h4>{users.favPlayers}</h4>
            <Comment id={users._id} />
          </div>
        );
      })}
    </div>
  );
};

export default AllUsers;

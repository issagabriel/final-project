import React from "react";

const UserCard = (props) => {
  console.log(props.attributes);
  return (
    <div className="Profile">
      <h1>{props.attributes.username}</h1>

      <h2>{props.attributes.username}'s Favorite Teams</h2>
      {props.attributes.favTeams &&
        props.attributes.favTeams?.map((team) => {
          return (
            <div className="ProfileDetails">
              <p>{team}</p>
            </div>
          );
        })}
      <h2>{props.attributes.username}'s Favorite Players</h2>
      {props.attributes.favPlayers &&
        props.attributes.favPlayers?.map((player) => {
          return (
            <div className="ProfileDetails">
              <p>{player}</p>
            </div>
          );
        })}
    </div>
  );
};

export default UserCard;

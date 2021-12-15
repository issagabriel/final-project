import React from "react";

const UserCard = (props) => {
  return (
    <div>
      <h2>{props.attributes.username}</h2>

      {props.attributes.favTeams &&
        props.attributes.favTeams?.map((team) => {
          return <p>{team}</p>;
        })}
      {props.attributes.favPlayers &&
        props.attributes.favPlayers?.map((player) => {
          return <p>{player}</p>;
        })}
    </div>
  );
};

export default UserCard;

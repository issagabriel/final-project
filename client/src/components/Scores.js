import React from "react";
import axios from "axios";

const Scores = () => {
  const [headline, setHeadline] = React.useState("...loading");

  React.useEffect(() => {
    axios
      .get(
        "https://api.sportsdata.io/v3/nfl/scores/json/ScoresByWeek/2021/15?key=686dfe0fe13a472a902133ac6b33a1af"
      )
      .then((info) => {
        console.log(info.data);
        setHeadline(info.data);
      });
  }, []);

  return (
    <div>
      <table className="api">
        {headline.map((game) => {
          return (
            <div>
              <th>
                {game.AwayTeam} vs. {game.HomeTeam}
              </th>
              <td>{game.Channel}</td>
              <td>{game.PointSpread}</td>
            </div>
          );
        })}
      </table>
    </div>
  );
};

export default Scores;

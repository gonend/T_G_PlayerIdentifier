const axios = require("axios");

const playerApi = "https://balldontlie.io/api/v1/players/?search=";
const seasonalStatsApi = "https://www.balldontlie.io/api/v1/season_averages";

const getPlayerId = (playerName) => {
  let config = {
    method: "get",
    url: playerApi + playerName,
    headers: {},
  };

  axios(config)
    .then((response) => {
      let playerId = JSON.stringify(response.data.data[0].id);
      console.log(playerId);
      return playerId;
    })
    .catch((error) => {
      console.log(error);
    });
};

const getPlayerSeasonStats = (playerName) => {
  let playerId = getPlayerId(playerName);
  playerId.then((playerId2) => {
    playerId = playerId2;
  });
  //   console.log("====================================");
  //   console.log(playerId);
  //   console.log("====================================");
  //   var config = {
  //     method: "get",
  //     url: seasonalStatsApi + playerId,
  //     headers: {},
  //   };
  //   let playerStats = {};
  //   axios(config)
  //     .then(function (response) {
  //       playerStats = JSON.stringify(response.data);
  //       console.log(playerStats);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  //playerStats;
};
module.exports = { getPlayerSeasonStats };

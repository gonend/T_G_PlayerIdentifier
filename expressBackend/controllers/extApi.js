const axios = require("axios");

const playerApi = "https://balldontlie.io/api/v1/players/?search=";
const seasonalStatsApi = `https://www.balldontlie.io/api/v1/season_averages?season=`;

const getPlayerId = async (playerName) => {
  let config = {
    method: "get",
    url: playerApi + playerName,
    headers: {},
  };
  try {
    let response = await axios(config);
    let playerId = JSON.stringify(response.data.data[0].id);
    // console.log(playerId);
    return playerId;
  } catch (error) {
    console.log(error);
  }
};

const getPlayerSeasonStats = async (playerName, seasonYear) => {
  try {
    let playerId = await getPlayerId(playerName);
    console.log(playerId);
    let config = {
      method: "get",
      url: `${seasonalStatsApi}${seasonYear}&player_ids[]=${playerId}`,
      headers: {},
    };

    let response = await axios(config);
    let playerStats = JSON.stringify(response.data);
    console.log(playerStats);
  } catch (error) {
    console.log(error);
  }
};
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

module.exports = { getPlayerSeasonStats };

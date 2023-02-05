const axios = require("axios");

const playerApi = "https://balldontlie.io/api/v1/players/?search=";
const seasonalStatsApi = `https://www.balldontlie.io/api/v1/season_averages?season=`;

const getPlayerInfo = async (playerName) => {
  let config = {
    method: "get",
    url: playerApi + playerName,
    headers: {},
  };
  try {
    let response = await axios(config);
    let playerInfo = JSON.stringify(response.data.data[0]);
    // console.log(playerId);
    return playerInfo;
  } catch (error) {
    console.log(error);
  }
};

const getPlayerSeasonStats = async (playerName, seasonYear) => {
  try {
    let playerInfo = await getPlayerInfo(playerName);
    let parsedPlayerInfo = JSON.parse(playerInfo);

    let config = {
      method: "get",
      url: `${seasonalStatsApi}${seasonYear}&player_ids[]=${parsedPlayerInfo.id}`,
      headers: {},
    };

    let response = await axios(config);
    let playerStats = response.data.data[0];
    const {
      first_name,
      last_name,
      height_feet,
      height_inches,
      position,
      team,
    } = parsedPlayerInfo;
    const finalPlayerJson = {
      playerInfo: {
        fullName: first_name + " " + last_name,
        height: `${height_feet}'${height_inches}`,
        position: position,
        teamFullName: team.full_name,
      },
      playerStats: playerStats,
    };
    // console.log(playerStats);
    return finalPlayerJson;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getPlayerSeasonStats };

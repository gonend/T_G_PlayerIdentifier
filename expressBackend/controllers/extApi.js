const axios = require("axios");

const { db, firestore } = require("../db");

const playerApi = "https://balldontlie.io/api/v1/players/?search=";
const seasonalStatsApi = `https://www.balldontlie.io/api/v1/season_averages?season=`;

async function checkPlayerInfoFromFirestore(playerName) {
  var playerInfoRef = firestore.collection("playersInfo").doc(playerName);

  let objectFromFirestore = await playerInfoRef.get();

  playerInfoFromFirebase = objectFromFirestore.data();

  return playerInfoFromFirebase;
}

function parsePlayerInfo(playerInfo) {
  const { id, first_name, last_name, height_feet, height_inches, position } =
    playerInfo;
  const parsedPlayerInfo = {
    id: id,
    first_name: first_name,
    last_name: last_name,
    height_feet: height_feet,
    height_inches: height_inches,
    position: position,
  };
  return parsedPlayerInfo;
}

function parsePlayerStats(playerStats) {
  const {
    games_played,
    season,
    min,
    fgm,
    fga,
    fg3m,
    ftm,
    fta,
    oreb,
    dreb,
    reb,
    ast,
    stl,
    blk,
    turnover,
    pts,
    fg_pct,
    fg3_pct,
    ft_pct,
  } = playerStats;
  const parsedPlayerStats = {
    gmp: games_played,
    ssn: season,
    min,
    fgm,
    fga,
    fg3m,
    ftm,
    // fta,
    oreb,
    dreb,
    reb,
    ast,
    stl,
    blk,
    TO: turnover,
    pts,
    "fg%": fg_pct,
    "fg3%": fg3_pct,
    "ft%": ft_pct,
  };
  return parsedPlayerStats;
}

const getPlayerInfo = async (playerName) => {
  let config = {
    method: "get",
    url: playerApi + playerName,
    headers: {},
  };
  try {
    //check if we have the info for that specific player in firestore

    let playerInfo = await checkPlayerInfoFromFirestore(playerName);

    if (playerInfo === undefined) {
      //if playerInfo doesnt exist in firestore ==>use to API to import playerInfo
      let response = await axios(config);
      // console.log(response.data.data[0]);
      // playerInfo = JSON.stringify(response.data.data[0]);
      playerInfo = response.data.data[0];

      playerInfo = parsePlayerInfo(playerInfo);

      await firestore
        .collection("playersInfo")
        .doc("" + playerInfo.id)
        .set(playerInfo);
    }

    return playerInfo;
  } catch (error) {
    console.log(error);
  }
};

const getPlayerSeasonStats = async (playerName, seasonYear) => {
  try {
    playerName = playerName.toLowerCase();
    console.log(playerName);
    let playerInfo = await getPlayerInfo(playerName);
    console.log(playerInfo);

    let config = {
      method: "get",
      url: `${seasonalStatsApi}${seasonYear}&player_ids[]=${playerInfo.id}`,
      headers: {},
    };

    let response = await axios(config);
    let playerStats = response.data.data[0];

    playerStats = parsePlayerStats(playerStats);

    const finalPlayerJson = {
      playerInfo: playerInfo,
      playerStats: playerStats,
    };
    // console.log(playerStats);
    return finalPlayerJson;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getPlayerSeasonStats };

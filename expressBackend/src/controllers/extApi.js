const axios = require("axios");

const { db, firestore } = require("../db");
const playersData = require("./data/PlayersData.json");

const playerApi = "https://balldontlie.io/api/v1/players/?search=";
const seasonalStatsApi = `https://www.balldontlie.io/api/v1/season_averages?season=`;

const playersHeadshotDictionary = require("../../data/playerName_to_headshotId.json");

async function getPlayerInfoFromFirestore(playerName) {
  var playerInfoRef = firestore.collection("playersInfo").doc(playerName);

  let objectFromFirestore = await playerInfoRef.get();
  console.log(objectFromFirestore.exists);
  if (objectFromFirestore.exists) {
    playerInfoFromFirebase = objectFromFirestore.data();
    console.log(playerInfoFromFirebase);

    return playerInfoFromFirebase;
  }
  return undefined;
}

async function parsePlayerInfo(playerInfo) {
  const {
    id,
    first_name,
    last_name,
    height_feet,
    height_inches,
    position,
    // img_uri,
  } = playerInfo;

  // console.log("name to look is:");
  keyInDict = `${first_name} ${last_name}`.toLowerCase();

  // console.log(keyInDict);
  // console.log("dict is:");
  // console.log(playersHeadshotDictionary[keyInDict]);
  let headshot_id = playersHeadshotDictionary[keyInDict];
  const img_uri = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${headshot_id}.png`;

  const parsedPlayerInfo = {
    id: id,
    first_name: first_name,
    last_name: last_name,
    height_feet: height_feet,
    height_inches: height_inches,
    position: position,
    img_uri: img_uri,
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
const getPlayerHeadshot = async (playerName) => {
  console.log("nameeeee: ", playerName);
  const playerId = playersData[playerName];
  console.log("idddddddd: ", playerId);
  return `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${playerId}.png`;
};
const getPlayerInfo = async (playerName) => {
  let config = {
    method: "get",
    url: playerApi + playerName,
    headers: {},
  };
  try {
    //check if we have the info for that specific player in firestore
    let playerInfo = await getPlayerInfoFromFirestore(playerName);
    // console.log(playerInfo);
    if (playerInfo === undefined) {
      //if playerInfo doesnt exist in firestore ==>use to API to import playerInfo
      let response = await axios(config);
      playerInfo = response.data.data[0];
      console.log(playerInfo);
      if (playerInfo) {
        playerInfo = parsePlayerInfo(playerInfo);
        playerKey =
          `${playerInfo.first_name} ${playerInfo.last_name}`.toLowerCase();
        await firestore
          .collection("playersInfo")
          .doc(playerKey)
          .set(playerInfo);
      }
    }
    return playerInfo;
  } catch (error) {
    console.log(error);
  }
};

const getSeasonStats = async (playerId, seasonYear) => {
  let config = {
    method: "get",
    url: `${seasonalStatsApi}${seasonYear}&player_ids[]=${playerId}`,
    headers: {},
  };

  let response = await axios(config);
  return response.data.data[0];
};

// const getLastActiveSeasonStats = async (playerId) => {
//   const [left, right] = [1979];
//   let stats = await getSeasonStats(playerId, right);
//   if (stats !== undefined) {
//     return stats;
//   } else {
//   }
//   mid = (right - left) / 2;
// };
const buildPlayerObj = async (playerName, prevYear) => {
  try {
    console.log("before info: ", playerName);
    let playerInfo = await getPlayerInfo(playerName);
    console.log(playerInfo);
    if (playerInfo === undefined) {
      throw new Error("couldnt get playerInfo using API or Firebase");
    }
    let playerStats = await getSeasonStats(playerInfo.id, prevYear);

    if (playerStats) playerStats = parsePlayerStats(playerStats);

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

module.exports = { buildPlayerObj, getSeasonStats };

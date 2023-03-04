import axios from "axios";
const cheerio = require("cheerio");

// {raceName}/{raceType}.html
var resultUrl = "https://www.formula1.com/en/results.html/2023/races/1141/";

export const getRaceResults = async (raceName, raceType) => {
  const resultUrl = `https://www.formula1.com/en/results.html/2023/races/1141/${raceName}/${raceType}.html`;
  axios.get(resultUrl).then((response) => {
    console.log(response);
  });
};

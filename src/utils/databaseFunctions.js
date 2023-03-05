import { db } from "../firebase";
import { setDoc, doc, collection } from "firebase/firestore";
import { raceFiles, placeholderRaceData } from "../assets/arrays";
import { splitBet } from "./utils";

export const addRace = async (raceName) => {
  //const raceRef = collection(db, `2023/Races/${raceName}`);
  for (const raceFile of raceFiles) {
    await setDoc(
      doc(db, `2023/Races/${raceName}/${raceFile}`),
      placeholderRaceData
    );
  }
  document.getElementById("raceNameInput").value = "";
  console.log("Docs created for " + raceName + " Grand Prix");
};

export const addBet = async (betData) => {
  const [name, data] = splitBet(betData);
  console.log(data);
  await setDoc(db, `2023/Bets/Tailes/${name}`, data);
  console.log("Bet added to database");
};

import { db } from "../firebase";
import { setDoc, doc, collection, getDoc } from "firebase/firestore";
import {
  raceFiles,
  placeholderRaceData,
  raceNames,
  driverNames,
} from "../assets/arrays";
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

export const updateDriverPlacements = async () => {
  for (const driver of driverNames) {
    const driverRef = doc(db, `2023/Drivers/${driver}/Bharain`);
    var driverPlacements = {};
    for (const session of raceFiles) {
      const docRef = doc(db, `2023/Races/Bahrain/${session}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        for (const temp in data) {
          if (driver === data[temp]) {
            driverPlacements[session] = temp;
            break;
          }
        }
      }
    }
    await setDoc(driverRef, driverPlacements);
  }
};

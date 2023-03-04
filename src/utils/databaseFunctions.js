import { db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { raceFiles, placeholderRaceData } from "../assets/arrays";

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

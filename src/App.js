import logo from "./logo.svg";
import {
  collection,
  getDocs,
  listCollections,
  batch,
  setDoc,
  addDoc,
  doc,
} from "firebase/firestore";
import "./App.css";
import { db } from "./firebase";
import { useState } from "react";

const raceFiles = ["FP1", "FP2", "FP3", "Qualifying", "Race"];

const placeholderRaceData = {
  1: "",
  2: "",
  3: "",
  4: "",
  5: "",
  6: "",
  7: "",
  8: "",
  9: "",
  10: "",
  11: "",
  12: "",
  13: "",
  14: "",
  15: "",
  16: "",
  17: "",
  18: "",
  19: "",
  20: "",
};

function App() {
  const [raceName, setRaceName] = useState("");

  const addRace = async () => {
    //const raceRef = collection(db, `2023/Races/${raceName}`);
    for (const raceFile of raceFiles) {
      await setDoc(
        doc(db, `2023/Races/${raceName}/${raceFile}`),
        placeholderRaceData
      );
    }
    console.log("Docs created for " + raceName + "Grand Prix");
  };
  const getRaces = async () => {
    //const raceRef = collection(db, "2023", "Races", "Bahrain");
    /*
    await getDocs(collection(db, "2023")).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        getDocs(collection(db, "2023", doc.id)).then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
          });
        });
      });
    });
    */
  };

  const handleChange = (e) => {
    setRaceName(e.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>
          <input
            type="text"
            id="raceName"
            name="raceName"
            onChange={handleChange}
            value={raceName}
          />
          <input type="button" onClick={addRace}></input>
        </div>
      </header>
    </div>
  );
}

export default App;

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
import {
  raceFiles,
  placeholderRaceData,
  raceTypeUrls,
  raceNames,
} from "./assets/arrays";
import { addRace } from "./utils/databaseFunctions";
import Select from "react-select";
import { getRaceResults } from "./utils/raceResults";

function App() {
  const [addRaceName, setAddRaceName] = useState("");
  const [selectRaceName, setSelectRaceName] = useState("");
  const [selectRaceType, setSelectRaceType] = useState("");
  var raceTypeSelectOptions = [];
  var raceNamesSelectOptions = [];

  for (const raceType of raceTypeUrls) {
    raceTypeSelectOptions.push({ value: raceType, label: raceType });
  }
  for (const raceName of raceNames) {
    raceNamesSelectOptions.push({ value: raceName, label: raceName });
  }

  const handleRaceAdd = async () => {
    addRace(addRaceName);
  };

  const handleRaceUpdate = async () => {
    getRaceResults(selectRaceName, selectRaceType);
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

  const handleRaceNameChange = (e) => {
    setAddRaceName(e.target.value);
  };

  const handleSelectRaceNameChange = (e) => {
    setSelectRaceName(e.value);
  };

  const handleSelectRaceTypeChange = (e) => {
    setSelectRaceType(e.value);
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
            id="raceNameInput"
            name="raceNameInput"
            onChange={handleRaceNameChange}
            value={addRaceName}
          />
          <input type="button" onClick={handleRaceAdd} value="Add Race"></input>
        </div>
        <div>
          <Select
            options={raceNamesSelectOptions}
            onChange={handleSelectRaceNameChange}
          ></Select>
          <Select
            options={raceTypeSelectOptions}
            onChange={handleSelectRaceTypeChange}
          ></Select>
          <input
            type="button"
            onClick={handleRaceUpdate}
            value="Update Race"
          ></input>
        </div>
      </header>
    </div>
  );
}

export default App;

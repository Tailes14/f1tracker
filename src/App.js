import logo from "./logo.svg";
import {
  collection,
  getDocs,
  listCollections,
  batch,
  setDoc,
  addDoc,
  getDoc,
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
  var databaseSessions = [];
  var databaseData = [];

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

  const handleRaceNameChange = (e) => {
    setAddRaceName(e.target.value);
  };

  const handleSelectRaceNameChange = (e) => {
    setSelectRaceName(e.value);
  };

  const handleSelectRaceTypeChange = (e) => {
    setSelectRaceType(e.value);
  };

  const getDataForTable = async () => {
    const colRef = collection(db, "2023/Races/Bahrain");
    const colSnap = await getDocs(colRef);
    colSnap.forEach((doc) => {
      databaseSessions.push(doc.id);
      databaseData.push(doc.data());
      console.log(doc.id, "=>", doc.data());
    });
  };

  getDataForTable();

  return (
    <div className="App">
      <header>
        <h1>Formula 1 Database</h1>
      </header>
      <div>
        <table>
          <thead>
            <tr>
              <th>Position</th>
              {databaseSessions.map((session) => {
                return <th>{session}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {databaseData.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <input
          type="button"
          value="Update Table"
          onClick={getDataForTable}
        ></input>
      </div>
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
      {/*<div>
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
        </div>*/}
    </div>
  );
}

export default App;

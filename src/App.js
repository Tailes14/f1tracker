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
import { raceFiles, placeholderRaceData } from "./assets/arrays";
import { addRace } from "./utils/databaseFunctions";

function App() {
  const [raceName, setRaceName] = useState("");

  const handleRaceAdd = async () => {
    addRace(raceName);
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
            id="raceNameInput"
            name="raceNameInput"
            onChange={handleChange}
            value={raceName}
          />
          <input type="button" onClick={handleRaceAdd} value="Add Race"></input>
        </div>
      </header>
    </div>
  );
}

export default App;

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
import { useState, useEffect } from "react";
import {
  raceFiles,
  placeholderRaceData,
  raceTypeUrls,
  raceNames,
} from "./assets/arrays";
import {
  addRace,
  addBet,
  updateDriverPlacements,
} from "./utils/databaseFunctions";
import Select from "react-select";
import { getRaceResults } from "./utils/raceResults";
import { todaysDate } from "./utils/utils";

function App() {
  const [addRaceName, setAddRaceName] = useState("");
  const [selectRaceName, setSelectRaceName] = useState("");
  const [selectRaceType, setSelectRaceType] = useState("");
  const [betData, setBetData] = useState([]);
  const [newBet, setNewBet] = useState({
    bet: "",
    wager: 0,
    odds: 0,
    freeBet: false,
    payOut: 0,
    date: todaysDate(),
    race: "",
    outcome: "",
  });
  const [sessionsData, setSessionsData] = useState([]);
  const [raceData, setRaceData] = useState([]);
  var raceTypeSelectOptions = [];
  var raceNamesSelectOptions = [];
  var databaseSessions = [];
  var databaseData = [];

  useEffect(() => {
    getBetData();
    getDataForTable();
  }, []);

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
      setSessionsData((lastSession) => [
        ...lastSession,
        {
          session: doc.id,
          results: doc.data(),
        },
      ]);

      //setRaceData((lastRace) => [...lastRace, doc.data()]);
    });
  };

  //getDataForTable();
  const getBetData = async () => {
    const colRef = collection(db, "2023/Bets/Tailes");
    const colSnap = await getDocs(colRef);

    colSnap.forEach((doc) => {
      setBetData((lastBet) => [
        ...lastBet,
        {
          bet: doc.id,
          wager: doc.data()["Wager"],
          odds: doc.data()["Odds"],
          freeBet: doc.data()["FreeBet"],
          payOut: doc.data()["Payout"],
          date: doc.data()["Date"],
          race: doc.data()["Race"],
          outcome: doc.data()["Outcome"],
        },
      ]);
    });
  };

  const handleChangeBetForm = (e) => {
    const { name, value } = e.target;
    setNewBet({ ...newBet, [name]: value });
  };

  const handleAddBet = async (e) => {
    addBet(newBet);
    e.preventDefault();
  };

  return (
    <div className="App">
      <header>
        <h1>Formula 1 Database</h1>
      </header>
      <div>
        <table id="Races">
          <thead>
            <tr>
              <th>Position</th>
              {sessionsData.map((val, key) => {
                return <th key={key}>{val.session}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {sessionsData.map((session, key) => {
              //console.log(session.results);
              return <tr key={session.session}>{key}</tr>;
            })}
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
      <div>
        <h1>Bets</h1>
        <table id="Bets">
          <thead>
            <tr>
              <th>Bet</th>
              <th>Wager</th>
              <th>Odds</th>
              <th>FreeBet</th>
              <th>Race</th>
              <th>Date</th>
              <th>Payout</th>
            </tr>
          </thead>
          <tbody>
            {betData.map((bet, i) => {
              return (
                <tr key={i}>
                  <td>{bet.bet}</td>
                  <td>{bet.wager}</td>
                  <td>{bet.odds}</td>
                  {bet.freeBet ? <td>Yes</td> : <td>No </td>}
                  <td>{bet.race}</td>
                  <td>{}</td>
                  <td>{bet.payOut}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <form onSubmit={handleAddBet}>
          <label for="betName">
            Bet Name:{" "}
            <input type="text" name="bet" onChange={handleChangeBetForm} />
          </label>
          <label for="betWager">
            Wager:{" "}
            <input type="number" name="wager" onChange={handleChangeBetForm} />
          </label>
          <label for="betOdds">
            Odds:{" "}
            <input type="number" name="odds" onChange={handleChangeBetForm} />
          </label>
          <label for="betFreeBet">
            Free Bet:{" "}
            <input
              type="checkbox"
              name="freeBet"
              onChange={handleChangeBetForm}
            />
          </label>
          <label for="betRace">
            Race: <Select options={raceNamesSelectOptions} />
          </label>
          <label for="betDate">
            Date:{" "}
            <input
              type="date"
              defaultValue={todaysDate()}
              name="date"
              onChange={handleChangeBetForm}
            />
          </label>
          <label for="betPayout">
            Payout:{" "}
            <input type="number" name="payOut" onChange={handleChangeBetForm} />
          </label>
          <input type="submit" value="Add Bet" />
        </form>
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

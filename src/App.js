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
  docRef,
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
  const [driverPlacements, setDriverPlacements] = useState([]);
  var raceTypeSelectOptions = [];
  var raceNamesSelectOptions = [];
  var databaseSessions = [];
  var databaseData = [];
  let driverData = {
    1: { FP1: "", FP2: "", FP3: "", Qualifying: "", Race: "" },
    2: { FP1: "", FP2: "", FP3: "", Qualifying: "", Race: "" },
    3: { FP1: "", FP2: "", FP3: "", Qualifying: "", Race: "" },
    4: { FP1: "", FP2: "", FP3: "", Qualifying: "", Race: "" },
    5: { FP1: "", FP2: "", FP3: "", Qualifying: "", Race: "" },
    6: { FP1: "", FP2: "", FP3: "", Qualifying: "", Race: "" },
    7: { FP1: "", FP2: "", FP3: "", Qualifying: "", Race: "" },
    8: { FP1: "", FP2: "", FP3: "", Qualifying: "", Race: "" },
    9: { FP1: "", FP2: "", FP3: "", Qualifying: "", Race: "" },
    10: { FP1: "", FP2: "", FP3: "", Qualifying: "", Race: "" },
    11: { FP1: "", FP2: "", FP3: "", Qualifying: "", Race: "" },
    12: { FP1: "", FP2: "", FP3: "", Qualifying: "", Race: "" },
    13: { FP1: "", FP2: "", FP3: "", Qualifying: "", Race: "" },
    14: { FP1: "", FP2: "", FP3: "", Qualifying: "", Race: "" },
    15: { FP1: "", FP2: "", FP3: "", Qualifying: "", Race: "" },
    16: { FP1: "", FP2: "", FP3: "", Qualifying: "", Race: "" },
    17: { FP1: "", FP2: "", FP3: "", Qualifying: "", Race: "" },
    18: { FP1: "", FP2: "", FP3: "", Qualifying: "", Race: "" },
    19: { FP1: "", FP2: "", FP3: "", Qualifying: "", Race: "" },
    20: { FP1: "", FP2: "", FP3: "", Qualifying: "", Race: "" },
  };

  useEffect(() => {
    getBetData();
    //getDataForTable();
    getDriverPlacements();
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

  const getDriverPlacements = async () => {
    const fp1Ref = doc(db, "2023/Races/Bahrain/FP1");
    const fp2Ref = doc(db, "2023/Races/Bahrain/FP2");
    const fp3Ref = doc(db, "2023/Races/Bahrain/FP3");
    const qualRef = doc(db, "2023/Races/Bahrain/Qualifying");
    const raceRef = doc(db, "2023/Races/Bahrain/Race");

    const fp1Snap = await getDoc(fp1Ref);
    const fp2Snap = await getDoc(fp2Ref);
    const fp3Snap = await getDoc(fp3Ref);
    const qualSnap = await getDoc(qualRef);
    const raceSnap = await getDoc(raceRef);

    const fp1Data = fp1Snap.data();
    const fp2Data = fp2Snap.data();
    const fp3Data = fp3Snap.data();
    const qualData = qualSnap.data();
    const raceData = raceSnap.data();

    for (let i = 1; i < 21; i++) {
      setDriverPlacements((lastPlacements) => [
        ...lastPlacements,
        {
          place: i,
          FP1: fp1Data[i],
          FP2: fp2Data[i],
          FP3: fp3Data[i],
          Qualifying: qualData[i],
          Race: raceData[i],
        },
      ]);
    }

    /*
    for (const session of raceFiles) {
      const docRef = doc(db, `2023/Races/Bahrain/${session}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        for (const place in data) {
          driverData[place][session] = data[place];
        }
      }
    }*/
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
              {raceFiles.map((val, key) => {
                return <th key={key}>{val}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {driverPlacements.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.place}</td>
                  <td>{val.FP1}</td>
                  <td>{val.FP2}</td>
                  <td>{val.FP3}</td>
                  <td>{val.Qualifying}</td>
                  <td>{val.Race}</td>
                </tr>
              );
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

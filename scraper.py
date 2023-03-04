from bs4 import BeautifulSoup
import pandas as pd
import requests
import firebase_admin
from firebase_admin import firestore
from firebase_admin import credentials

# arrays
RACENAMES = [
    "Abu Dhabi",
    "Austrailia",
    "Azerbaijan",
    "Austria",
    "Bahrain",
    "Belgian",
    "Brazil",
    "British",
    "Canadian",
    "Dutch",
    "Emilia Romagna",
    "Hungarian",
    "Italian",
    "Japan",
    "Las Vegas",
    "Mexico",
    "Miami",
    "Monaco",
    "Qatar",
    "Saudi Arabia",
    "Singapore",
    "Spanish",
    "United States",
]
RACETYPEURLS = ["practice-1", "practice-2", "practice-3", "qualifying"]


def mapRaceTypes(url):
    if url == "practice-1":
        return "FP1"
    elif url == "practice-2":
        return "FP2"
    elif url == "practice-3":
        return "FP3"
    elif url == "qualifying":
        return "Qualifying"


def mapRaceNameNum(raceName):
    if raceName == "Abu Dhabi":
        return "1226"
    elif raceName == "Austrailia":
        return "1143"
    elif raceName == "Azerbaijan":
        return "1207"
    elif raceName == "Bahrain":
        return "1141"
    elif raceName == "Belgian":
        return "1216"
    elif raceName == "Brazil":
        return "1224"
    elif raceName == "British":
        return "1214"
    elif raceName == "Canadian":
        return "1212"
    elif raceName == "Dutch":
        return "1217"
    elif raceName == "Emilia Romagna":
        return "1209"
    elif raceName == "Hungarian":
        return "1215"
    elif raceName == "Italian":
        return "1218"
    elif raceName == "Japan":
        return "1220"
    elif raceName == "Las Vegas":
        return "1225"
    elif raceName == "Mexico":
        return "1223"
    elif raceName == "Miami":
        return "1208"
    elif raceName == "Monaco":
        return "1210"
    elif raceName == "Qatar":
        return "1221"
    elif raceName == "Saudi Arabia":
        return "1142"
    elif raceName == "Singapore":
        return "1219"
    elif raceName == "Spanish":
        return "1211"
    elif raceName == "United States":
        return "1222"
    elif raceName == "Austria":
        return "1213"


def scrapeResults(raceName, raceType):
    # getting the data from website
    url = f"https://www.formula1.com/en/results.html/2023/races/{mapRaceNameNum(raceName)}/{raceName}/{raceType}.html"
    page = requests.get(url)
    soup = BeautifulSoup(page.text, 'lxml')
    # finding the table with drivers and creating the dataframe
    table = soup.find('table', class_="resultsarchive-table")
    if table is None:
        return None

    headers = [header.text for header in table.find_all('th')]
    data = pd.DataFrame(columns=headers)
    for j in table.find_all('tr')[1:]:
        rowData = j.find_all('td')
        row = [i.text for i in rowData]
        length = len(data)
        data.loc[length] = row
    # cleaning the data to a format thats better
    for driver in data['Driver']:
        temp = driver
        driver = driver[1:]
        driver = driver[:-5]
        driver = driver.replace("\n", " ")
        data = data.replace(to_replace=temp, value=driver)
    # setting up the data to be put into the database
    preppedData = {}
    for i in range(len(data)):
        preppedData[str(i+1)] = data['Driver'][i]

    return preppedData


def postToDatabase(db, raceName, raceType, data):
    # adding the data to the database
    raceRef = db.collection(u'2023').document(u'Races').collection(raceName)
    raceRef.document(mapRaceTypes(raceType)).set(data)


if __name__ == "__main__":
    # setting up connection to database
    dbFlag = False
    try:
        cred = credentials.Certificate("tokens.json")
        app = firebase_admin.initialize_app(cred)
        db = firestore.client()
        print("Connected to database")
        dbFlag = True
    except:
        print("Error connecting to database")

    if dbFlag:
        count = 0
        for race in RACENAMES:
            print(f"Checking {race} GP")

            i = 0
            for session in RACETYPEURLS:
                print(f"Checking {session}")
                data = scrapeResults(race, session)
                if data is None:
                    count += len(RACETYPEURLS) - i
                    break
                postToDatabase(db, race, session, data)
                i += 1
                count += 1

            print(f"{(count / len(RACENAMES * len(RACETYPEURLS))  * 100):.2f}%")

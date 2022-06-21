import requests
import csv
import json
import os

# Edit Here
entriesToRemove = ["Warrior", "Paladin",
                   "Archer", "Hunter", "Wizard", "Priest"]
headers = ["ID", "Hero", "Ignore", "Upgrade 1", "Upgrade 2", "Ignore", "Ignore", "Ignore", "Ignore", "Set Name", "Ignore", "Ignore", "Endgame 1",
           "Endgame 2", "Ignore", "Ignore", "Midgame 1", "Midgame 2", "Ignore", "Ignore", "Earlygame 1", "Earlygame 2", "Note"]

# FILEPATHS
jsonFilePath = './src/data/sigil_suggestions.json'
csvFilePath = './scripts/csvtest.csv'


def make_json(csvFilePath, jsonFilePath):
    data = []
    with open(csvFilePath, encoding='utf-8') as csvf:
        csvReader = csv.DictReader(csvf)
        for row in csvReader:
            if row['Hero'] in entriesToRemove:
                continue

            row.pop("Ignore")
            row.pop("")
            name = row["Hero"].replace(' - ', '-')
            row.pop("ID")
            row.pop("Hero")

            setData = row
            entry = {
                "Hero": name,
                "Sets": [setData]
            }

            if name == '(ALT.)':
                prevEntry = data[-1]
                prevEntry["Sets"].append(setData)
                data[-1] = prevEntry
            else:
                data.append(entry)
    with open(jsonFilePath, 'w', encoding='utf-8') as jsonf:
        jsonf.write(json.dumps(data, indent=4))


response = requests.get(
    'https://docs.google.com/spreadsheet/ccc?key=1CAAUx5Z0nPdjavGpYhFbAgO_4LdQ9GWBpGBx1Muv4gc&gid=1174540630&output=csv')
assert response.status_code == 200, 'Wrong status code'

insertedHeaders = ''
for header in headers:
    insertedHeaders += header + ","
insertedHeaders += "\n"

text = insertedHeaders + \
    str(response.content)[502:].replace(
        '\\xe2\\x98\\x86', '☆').replace('\\\'', '\'')
lines = text.split('\\r\\n')

with open(csvFilePath, 'w') as csvf:
    for line in lines:
        csvf.write(line + "\n")
make_json(csvFilePath, jsonFilePath)
os.remove(csvFilePath)

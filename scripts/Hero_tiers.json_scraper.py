import requests
import csv
import json
import os

weirdCharacters = ["\\xe2\\x8f\\xb5", "\\xc3\\x97",
                   "\\xe2\\x8f\\xbf", "\\xe2\\x9a\\x94", "\\xe2\\x9b\\xa8"]

entriesToRemove = ["", "Warrior", "Paladin",
                   "Archer", "Hunter", "Wizard", "Priest"]

# EDIT FILEPATHS HERE (USE RELATIVE FILEPATHS)
jsonFilePath = './src/data/Hero_tiers.json'
csvFilePath = './scripts/csvtest.csv'


def make_json(csvFilePath, jsonFilePath):
    data = []
    with open(csvFilePath, encoding='utf-8') as csvf:
        csvReader = csv.DictReader(csvf)
        for row in csvReader:
            row.pop('ID')
            if ' - ' in row['Name']:
                row['Name'] = row['Name'].replace(' - ', '-')
            row.pop('')

            if row['Name'] not in entriesToRemove:
                data.append(row)
    with open(jsonFilePath, 'w', encoding='utf-8') as jsonf:
        jsonf.write(json.dumps(data, indent=4))


response = requests.get(
    'https://docs.google.com/spreadsheet/ccc?key=1CAAUx5Z0nPdjavGpYhFbAgO_4LdQ9GWBpGBx1Muv4gc&gid=380597452&output=csv')
assert response.status_code == 200, 'Wrong status code'

text = str(response.content).replace('b\'ID,,,Colo,Arena,ChE4,ChE5,Umrat,Sera,|,,,,Damage Type,Archetype,Quirk,,Note',
                                     'ID,Name,,Colo,Arena,ChE4,ChE5,Umrat,Sera,,,,,Damage Type,Archetype,Quirk,Quirk2,Note')
text = text.replace('\\"', "\"").replace(
    '\\xc3\\xa9', 'e').replace('\\xc3\\x89', 'E').replace('\\\'', '\'')

for char in weirdCharacters:
    text = text.replace(char, ' ')

lines = text.split('\\r\\n')

with open(csvFilePath, 'w') as csvf:
    for line in lines:
        csvf.write(line + "\n")
make_json(csvFilePath, jsonFilePath)
os.remove(csvFilePath)

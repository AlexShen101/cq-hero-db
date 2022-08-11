import requests
import csv
import json
import os

entriesToRemove = ["Warrior", "Paladin",
                   "Archer", "Hunter", "Wizard", "Priest"]

# EDIT FILEPATHS HERE (USE RELATIVE FILEPATHS)
jsonFilePath = './src/data/hero_skill_suggestions.json'
csvFilePath = './scripts/csvtest.csv'

skillSubstitutions = [
    {
        "match": "Flames of Avarice",
        "sub": "Flame of Avarice"
    }
]

def make_json(csvFilePath, jsonFilePath):
    data = []
    with open(csvFilePath, encoding='utf-8') as csvf:
        csvReader = csv.DictReader(csvf)
        for row in csvReader:
            if row['Hero'] not in entriesToRemove:
                for i, sub in enumerate(skillSubstitutions):
                    if sub['match'] == row['Skill 1']:
                        row['Skill 1'] = sub['sub']
                    elif sub['match'] == row['Skill 2']:
                        row['Skill 2'] = sub['sub']
                    elif sub['match'] == row['Skill 3']:
                        row['Skill 3'] = sub['sub']
                entry = {
                    "Hero": row['Hero'].replace(' - ', '-'),
                    "Skill 1": row['Skill 1'],
                    "Skill 2": row['Skill 2'],
                    "Skill 3": row['Skill 3']
                }
                data.append(entry)
    with open(jsonFilePath, 'w', encoding='utf-8') as jsonf:
        jsonf.write(json.dumps(data, indent=4))


# https://docs.google.com/spreadsheets/d/1CAAUx5Z0nPdjavGpYhFbAgO_4LdQ9GWBpGBx1Muv4gc/edit#gid=904073273
response = requests.get(
    'https://docs.google.com/spreadsheet/ccc?key=1CAAUx5Z0nPdjavGpYhFbAgO_4LdQ9GWBpGBx1Muv4gc&gid=904073273&output=csv')
assert response.status_code == 200, 'Wrong status code'

text = str(response.content).replace('b\'ID,Hero,,,,,,,',
                                     'ID,Hero,Hero Icon (Remove),Img1,Skill 1,Img2,Skill 2,Img3,Skill 3').replace('\\\'', '\'')

lines = text.split('\\r\\n')

with open(csvFilePath, 'w') as csvf:
    for line in lines:
        csvf.write(line + "\n")
make_json(csvFilePath, jsonFilePath)
os.remove(csvFilePath)

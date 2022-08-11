import requests
import csv
import json
import os
import re

weirdCharacters = ["\\xe2\\x8f\\xb5", "\\xc3\\x97",
                   "\\xe2\\x8f\\xbf", "\\xe2\\x9a\\x94", "\\xe2\\x9b\\xa8"]

entriesToRemove = ["", "Warrior", "Paladin",
                   "Archer", "Hunter", "Wizard", "Priest"]
headersToRemove = ["ID", "Damage Type", "Quirk", "Quirk2", "Note", ""]

# EDIT FILEPATHS HERE (USE RELATIVE FILEPATHS)
jsonFilePath = './src/data/Hero_tiers.json'
csvFilePath = './scripts/csvtest.csv'
heroTablePath = './scripts/Hero_tiers.json_scraper.py'

headers = []


def make_json(csvFilePath, jsonFilePath):
    data = []
    with open(csvFilePath, encoding='utf-8') as csvf:
        csvReader = csv.DictReader(csvf)
        for row in csvReader:
            if row['ID'] == '1':
                global headers
                headers = list(row.keys())
                for heading in headersToRemove:
                    headers.remove(heading)
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

text = re.sub('b\'([A-z]*),', 'ID,Name', str(response.content))
text = re.sub('\|,', ',', text)
text = re.sub('Quirk,', 'Quirk,Quirk2', text)

text = text.replace('\\"', "\"").replace(
    '\\xc3\\xa9', 'e').replace('\\xc3\\x89', 'E').replace('\\\'', '\'')

for char in weirdCharacters:
    text = text.replace(char, ' ')

csvLines = text.split('\\r\\n')

with open(csvFilePath, 'w') as csvf:
    for line in csvLines:
        csvf.write(line + "\n")
make_json(csvFilePath, jsonFilePath)
os.remove(csvFilePath)

heroTableLines = ""

with open(heroTablePath, 'r') as file:
    heroTableLines = file.readlines()

with open(heroTablePath, 'w') as file:
    for line in heroTableLines:
        if re.search('const headers = [A-z0-9\[\]\"\', ]*;', line) != None:
            line = re.sub(
                'const headers = [A-z0-9\[\]\"\', ]*;', 'const headers = '+str(headers)+';', line)
        elif re.search('headers = [A-z0-9\[\]\"\', ]*;', line) != None:
            minHeaders = headers
            minHeaders.remove("Name")
            minHeaders.remove("Archetype")
            line = re.sub(
                'headers = [A-z0-9\[\]\"\', ]*;', 'headers = '+str(minHeaders)+';', line)
        file.write(line)

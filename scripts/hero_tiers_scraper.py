import requests
import csv
import json
import os

weirdCharacters = ["\\xe2\\x8f\\xb5", "\\xc3\\x97",
                   "\\xe2\\x8f\\xbf", "\\xe2\\x9a\\x94", "\\xe2\\x9b\\xa8"]


def make_json(csvFilePath, jsonFilePath):
    data = {}
    with open(csvFilePath, encoding='utf-8') as csvf:
        csvReader = csv.DictReader(csvf)
        for rows in csvReader:
            key = rows['Name']
            data[key] = rows
    with open(jsonFilePath, 'w', encoding='utf-8') as jsonf:
        jsonf.write(json.dumps(data, indent=4))


jsonFilePath = './scripts/jsontest2.json'
csvFilePath = './scripts/csvtest.csv'
response = requests.get(
    'https://docs.google.com/spreadsheet/ccc?key=1Hyoy4wi7he1IOtULVWNJgx83ddO6gaM-mwhBIS1x82o&gid=380597452&output=csv')
assert response.status_code == 200, 'Wrong status code'

text = str(response.content).replace('b\',Colo,Arena,ChE4,ChE5,Umrat,Sera,Archetype,Quirk,,',
                                     'Name,Colo,Arena,ChE4,ChE5,Umrat,Sera,Archetype,Quirk,Quirk2,Note')
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

import requests
import json
import re
import sys

newFilePath = './src/data/translator_en_us.json'
keepItems = ["_CHA_", "_SKILL_", "_WEP_",
             "_STONE_", "_EXCLUSIVE", "_STONE", "_SKILL_"]
trimmed_data = {}

response = requests.get(
    'https://raw.githubusercontent.com/cq-pandora/assets/master/information/translations/en_us.json')
assert response.status_code == 200, 'Wrong status code'

lines = response.content.decode('utf-8')
lines = re.sub('\\\\{1,4}n', ' ', lines)

data = json.loads(lines, strict=True)

for key in dict(data):
    for item in keepItems:
        if item in key:
            trimmed_data[key] = data[key]
            break

with open(newFilePath, 'w') as newFile:
    newFile.write(json.dumps(trimmed_data, indent=4, ensure_ascii=False))

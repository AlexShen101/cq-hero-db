import requests
import json
import re

filePath = './src/data/heros.json'

response = requests.get(
    'https://raw.githubusercontent.com/cq-pandora/assets/master/information/heroes.json')
assert response.status_code == 200, 'Wrong status code'

responseText = str(response.content)[2:-1].replace('\\"', "\"").replace(
    '\\xc3\\xa9', 'e').replace('\\xc3\\x89', 'E').replace('\\\'', '\'')

lines = responseText.split('\\n')

with open(filePath, 'w') as file:
    for line in lines:
        file.write(line + "\n")

# code to only include 4 stars (which usually includes 5 and 6 star chars) in json
file = open(filePath)
data = json.load(file)

forms = []
regex = '\_([1-6])_'

new_data = []

for index, item in enumerate(data):
    for form in item['forms']:
        stars = re.findall(regex, form['id'])
        forms.append(stars[0])
    if '4' in forms:
        new_data.append(item)
    forms = []


with open(filePath, 'w') as file:
    json.dump(new_data, file)

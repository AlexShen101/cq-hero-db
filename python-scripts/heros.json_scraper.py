import requests
import json
import re

filePath = './src/data/heros.json'

response = requests.get(
    'https://raw.githubusercontent.com/cq-pandora/assets/master/information/heroes.json')
assert response.status_code == 200, 'Wrong status code'

lines = response.content.decode('utf-8').replace('\\u00e9', 'é')
lines = re.sub('\\\\{1,4}n', ' ', lines)

data = json.loads(lines)

forms = []
regex = '\_([1-6])_'

new_data = []

for index, item in enumerate(data):
    print(item['id'])
    item['readable_id'] = item['readable_id']

    for form in item['forms']:
        stars = re.findall(regex, form['id'])
        forms.append(stars[0])
    if '4' in forms:
        new_data.append(item)
    forms = []


with open(filePath, 'w') as file:
    file.write(json.dumps(new_data, indent=4, ensure_ascii=False))

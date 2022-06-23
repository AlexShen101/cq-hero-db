import requests
import re

filePath = './src/data/sigils.json'

response = requests.get(
    'https://raw.githubusercontent.com/cq-pandora/assets/master/information/sigils.json')
assert response.status_code == 200, 'Wrong status code'

lines = response.content.decode('utf-8')
lines = re.sub('\\\\{1,4}n', ' ', lines)

with open(filePath, 'w') as file:
    file.write(lines)

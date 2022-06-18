import requests

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

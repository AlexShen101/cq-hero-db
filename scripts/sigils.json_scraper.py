import requests

filePath = './src/data/sigils.json'

response = requests.get(
    'https://raw.githubusercontent.com/cq-pandora/assets/master/information/sigils.json')
assert response.status_code == 200, 'Wrong status code'

responseText = str(response.content)[2:]
lines = responseText.split('\\n')

with open(filePath, 'w') as file:
    for line in lines:
        file.write(line + "\n")

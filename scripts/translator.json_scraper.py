import requests

filePath = './src/data/translator_en_us.json'

response = requests.get(
    'https://raw.githubusercontent.com/cq-pandora/assets/master/information/translations/en_us.json')
assert response.status_code == 200, 'Wrong status code'

responseText = str(response.content)[2:]
lines = responseText.split('\\n')

with open(filePath, 'w') as file:
    for line in lines:
        file.write(line + "\n")

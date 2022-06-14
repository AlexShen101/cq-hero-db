import requests

classes = ["Warrior", "Paladin", "Archer", "Hunter", "Wizard", "Priest"]
weirdCharacters = ["\\xe2\\x8f\\xb5", "\\xc3\\x97",
                   "\\xe2\\x8f\\xbf", "\\xe2\\x9a\\x94", "\\xe2\\x9b\\xa8"]


def csvJSON(csv):

    csv = csv.replace('b\'', 'Name')
    csv = csv.encode("ascii", "ignore").decode()
    lines = csv.split("\\r\\n")
    result = []
    headers = ['Name', 'Colo', 'Arena', 'ChE4', 'ChE5', 'Umrat',
               'Umrat', 'Archetype', 'Quirk', 'Quirk2', 'Note']

    for i in range(len(lines)):
        obj = {}
        currentLine = lines[i].split(",")
        if currentLine[0] in classes:
            continue
        else:
            for character in weirdCharacters:
                if character in currentLine[7]:
                    currentLine[7] = currentLine[7].replace(character, '')
                if character in currentLine[8]:
                    currentLine[8] = currentLine[8].replace(character, '')
            currentLine[10] = ''.join(
                currentLine[10:len(currentLine)]).replace('\"', '').replace('\\', '').replace('\\xc3\\xa9', 'e')
            currentLine = currentLine[:11]
            print(currentLine)

            for j in range(len(headers)):
                obj[headers[j]] = currentLine[j]

            result.append(obj)
    result.pop(0)
    return result


response = requests.get(
    'https://docs.google.com/spreadsheet/ccc?key=1Hyoy4wi7he1IOtULVWNJgx83ddO6gaM-mwhBIS1x82o&gid=380597452&output=csv')
assert response.status_code == 200, 'Wrong status code'

text = csvJSON(str(response.content))

# for item in text:
#     if "\\" in item['Quirk']:
#         if all(character not in item['Quirk'] for character in weirdCharacters):
#             print("not found in weirdCharacters: " + item['Quirk'])
#         else:
#             print(item['Quirk'])
#     if "\\" in item['Quirk2']:
#         if all(character not in item['Quirk2'] for character in weirdCharacters):
#             print("not found in weirdCharacters: " + item['Quirk2'])
#         else:
#             print(item['Quirk2'])

with open('./scripts/jsontest.txt', 'w') as file:
    file.write(str(text))

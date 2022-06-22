import json

filePath = './scripts/test_outputs/translator_en_us.json'
newFilePath = './scripts/test_outputs/new_translator_en_us.json'

with open(filePath, 'r') as file:
    data = json.load(file)
    
    for key in dict(data):
        if "TEXT_DIALOGUE" in key:
            del data[key]
        elif "TEXT_ACHV" in key:
            del data[key]
        elif "TEXT_FISH" in key:
            del data[key]
        elif "TEXT_FOOLSDAY" in key:
            del data[key]

    with open(newFilePath, 'w') as newFile:
        newFile.write(json.dumps(data, indent=4))
    
    



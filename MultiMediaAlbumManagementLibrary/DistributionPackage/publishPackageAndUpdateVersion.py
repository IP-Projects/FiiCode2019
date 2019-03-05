import json,subprocess
def updateJsonFile():
    jsonFile = open("package.json", "r") # Open the JSON file for reading
    data = json.load(jsonFile) # Read the JSON into the buffer
    jsonFile.close() # Close the JSON file

    ## Working with buffered content
    data["version"] = input("Input version, current version is: " + data["version"] +"\n")

    ## Save our changes to JSON file
    jsonFile = open("package.json", "w+")
    jsonFile.write(json.dumps(data,indent=2))
    jsonFile.close()

def publishPackage():
    subprocess.call(['npm','run','publish:library'])

updateJsonFile()
publishPackage()

import requests
import json

url = "https://data.nba.net/data/10s/prod/v1/2022/players.json" # replace with your URL
response = requests.get(url)

if response.status_code == 200:
    data = json.loads(response.text)
    players = {}
    for player in data['league']['standard']:
        key = ' '.join([player['firstName'], player['lastName']]).lower()
        players[key] = player['personId']
    fileName = 'PlayersData.json'
    with open(fileName,'w') as f:
        json.dump(players,f)
else:
    print("Failed to retrieve data from the URL")

import json

# Open the input and output files
with open('PlayersData.json', 'r') as f_in, open('./playerName_to_headshotId.json', 'w') as f_out:
    # Load the JSON data from the input file
    data = json.load(f_in)
    allPlayers=data['league']['standard']
    print(allPlayers)
    # Create an empty dictionary to hold the new data
    new_data = {}

    # Iterate over the objects in the input data
    for player in allPlayers:
        # Extract the id and fullname fields
        id_field = player['personId']
        fullname = player['firstName']+" "+player['lastName']
        fullname = fullname.lower()

        # Add the id and fullname to the new data dictionary
        new_data[fullname] = id_field
    #
    # # Write the new data to the output file as JSON
    json.dump(new_data, f_out)

import json
from dotenv import load_dotenv
import os

# Load environment variables from the .env file
load_dotenv()

# Specify the path to your JSON config file
config_file_path = 'package.json'

# config 
port = os.getenv("VITE_PORT")


# Read the existing config data from the file
with open(config_file_path, 'r') as json_file:
    data = json.load(json_file)

# Update the age of "scripts"
if "scripts" in data:
    run = "solid-start start --port"
    data["scripts"]["start"] = " ".join([run, port])
else:
    print("running 'scripts' not found.")

# Write the modified data back to the file
with open(config_file_path, 'w') as json_file:
    json.dump(data, json_file, indent=2)

print("Package json file updated successfully.")

import subprocess

# --------------part 1 :getting pip list and saving it into variable--------------
import subprocess

# Run the pip list command and capture its output
output = subprocess.check_output(['pip', 'list'])

# Decode the output bytes to a string
output_str = output.decode('utf-8')

# Split the output string into lines
lines = output_str.split('\n')

# Remove the first two lines, which contain the column headers
lines = lines[2:]

# Initialize an empty list to hold the objects
packages = []

# Iterate over each line and split it into a package name and version number
for line in lines:
    if line:
        package, version = line.split()
        packages.append(f"{package}=={version}")

# Print the list of objects
print(packages)



# ----------part 2: saving each line into requirements text file-----------------

# open a file for writing
with open('requierments.txt', 'w') as f:
    # loop through each line in the array
    for line in packages:
        # write the line to the file
        f.write(line + '\n')



#!/bin/bash
# To run the script do the following 2 steps in command line
#  chmod 700 generate-CSV-With-PseudoEmails.sh
#  ./generate-CSV-With-PseudoEmails.sh

# Define the output file name
output_file="pseudo_emails.csv"

# Define the domain for the email addresses
domain="@example.com"

# Define the number of pseudo emails to generate
count=3500

# Generate the CSV file with pseudo emails
for i in $(seq 1 $count); do
    # Generate a random string for the username part of the email
    username=$(LC_ALL=C tr -dc 'a-z0-9' < /dev/urandom | fold -w 8 | head -n 1)
    
    # Combine the username with the domain and append to the CSV
    echo "${username}${domain}" >> $output_file
done

echo "Generated $count pseudo emails in $output_file"
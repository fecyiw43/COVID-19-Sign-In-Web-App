# WDC-Group-Project-Covid-19-KYD-

~~~~~~ DATABASE SETUP ~~~~~~

Enter the following commands in sequence:
    sql_start
    mysql --host=127.0.0.1
    create database KYD_DB
    use KYD_DB
    source KYD_DB.sql

The above commands should set up the database and populate test data.

~~ HOW TO START SERVER ~~
Enter the following commands in sequence:
    npm install
    sql_start
    npm start

Once you have started the server,npm start

NOTE:
MOST OF THE TIME IT WORKS, BUT SOMETIMES YOU NEED TO RESTART THE SERVER. SOMETIMES,
WHEN LOGGING IN,THE ID WE STORE IN THE SESSION DOESN'T WORK PROPERLY.
TO FIX THIS,RESTART THE SERVER AND IT SHOULD STORE THE ID CORRECTLY.

SOMETIMES THE GPS LOCATION HAS AN OFFSET.
MAYBE ITS DUE TO THE MAPBOX API, GEO LOCATION ISSUES




## This Library is for filtering the Open Government Data of the public transport in Vienna

### What is done?

From the source JSON which are splitted in 3 files, it is possible to retrieve one master object with every single bus/train/metro station

Its also possible to get an object by a station name and get the RBL numbers of them

Todo:
Database connection

API features:
There is for testing the nodemon module installed
`npm start` to start it
`localhost:3000` is standard

### Fetching all stations and lines

Method: GET

Response: JSON

`http://localhost:3000/masterdata`

### Getting realtime data

Method: POST

Response: JSON/WFS-GetFeature

`http://localhost:3000/realtimedata`

## This is work in progress

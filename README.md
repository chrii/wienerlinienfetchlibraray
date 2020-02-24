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

This request posts an object which key is 'rbl' and the value is a string with numbers

Note: The string must have valid numbers which are separated with commas

The RBL Numbers are maintained by Wiener Linien and their Open Government Data Team. It seems that there is no proper pattern behind them so be aware that there can be numbers with just two digits and numbers with five digits. Also it might be possible that some data have no RBL number at all (e.g. S-Bahn)

Working example:
`{rbl: "2404,5530"}`

Response: JSON/WFS-GetFeature

`http://localhost:3000/realtimedata`

## This is work in progress

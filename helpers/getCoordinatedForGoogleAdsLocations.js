const csv = require('csvtojson');
const LATLONG_FETCH_URL = `https://us1.locationiq.com/v1/search.php?key=b240213c90d630&format=json`;
const fetch = require("isomorphic-fetch");
const csvWriter = require('csv-write-stream');
const fs = require('fs');

const getCoordinates = function (addressQuery) {
    return fetch(`${LATLONG_FETCH_URL}&q=${addressQuery}`)
        .then(response => response.json())
        .then(responseData => {

            let latLong;
            if (responseData[0]) {
                //console.log(responseData[0])

                latLong = {
                    formattedAddress: responseData[0].display_name,
                    lat: responseData[0].lat,
                    long: responseData[0].lon
                };

            } else {
                latLong = {
                    lat: "",
                    long: ""
                };
            }
            return latLong;
        });
};

const start = async function () {

    const csvHeader = [
        "Canonical Name",
        "lat",
        "long"
    ];

    const writer = csvWriter({
        headers: csvHeader
    });

    writer.pipe(fs.createWriteStream("Canonical-Name-To-Coordinates.csv"));

    csv()
        .fromFile("google-ads-geo.csv")
        .then(async function (jsonObj) {

            if (jsonObj) {

                for (let index in jsonObj) {
                    const item = jsonObj[index];

                    if (item["Country Code"] == "US") {
                        continue;
                    }

                    const geoStr = item["Canonical Name"];

                    try {
                        const GeoObj = await getCoordinates(geoStr);

                        if (GeoObj && GeoObj.lat) {

                            const csvData = [
                                geoStr,
                                GeoObj.lat,
                                GeoObj.long
                            ];

                            writer.write(csvData);

                            console.log(GeoObj, geoStr);
                        }
                    } catch (e) {
                        console.trace("e", e);
                    }




                }


            }

            writer.end();

            //console.log(LocationMapById)

            //console.log(jsonObj);

        }, function (err) {
            console.trace("error", err);
        });

};


start();
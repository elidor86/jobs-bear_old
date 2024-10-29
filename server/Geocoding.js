const axios = require('axios');
const redisClient = require('./redisClient');
const crypto = require('crypto');
const Elasticsearch = require("../server/elasticsearch");
const csv = require('csvtojson');
const GeocodeMapper = {};


const initGeocodeMapper = async function () {

    try {
        let geocodeCsv = await csv().fromFile("geocode-jobs-bear.csv");

        geocodeCsv.forEach(function (row) {

            GeocodeMapper[row.locationStr] = {
                formatted_address: row.formatted_address,
                lat: parseFloat(row.lat),
                long: parseFloat(row.long)
            };

        });


    } catch (e) {

    }


};

initGeocodeMapper();

const Geocoding = function (params) {

    this.params = params;
    this.locationStr = "";
    this.locationStrHash = "";
    this.LocationObj = null;

    this.INDEX_NAME = "geocoding-time-series";

    this.GoogleGeoCodeBaseUrl = "https://maps.googleapis.com/maps/api/geocode/json";
    this.googleGeoCodeKey = "AIzaSyBVN1ejWr6xsEH3xsChRPVKg-bOhLhy7x8";


    return this.init();
}

Geocoding.prototype.GoogleGeoCode = function () {

    const self = this;


    return new Promise(async function (resolve, reject) {

        let locationStr = self.locationStr;

        let googleGeoCodeParams = {
            address: locationStr,
            key: self.googleGeoCodeKey
        }

        //console.log("googleGeoCodeParams ", googleGeoCodeParams)

        axios.get(self.GoogleGeoCodeBaseUrl, {params: googleGeoCodeParams})
            .then(function (response) {

                // console.log("response ", response);

                let data = response.data;


                if (data && data.status == "OK" && data.results && data.results[0]) {

                    let locationDateGoogle = data.results[0];

                    let locationObj = {
                        formatted_address: locationDateGoogle.formatted_address,
                        lat: locationDateGoogle.geometry.location.lat,
                        long: locationDateGoogle.geometry.location.lng,
                    }

                    //console.log("GoogleGeoCode locationObj ", locationObj);
                    //console.log("GoogleGeoCode self.locationStrHash ", self.locationStrHash);

                    redisClient.setAsync(self.locationStrHash, locationObj, 60 * 60 * 24 * 300, true);

                    self.logGoogleGeocode({
                        ...locationObj,
                        locationStr: self.locationStr,
                        params: self.params,
                        locationDateGoogle
                    })


                    return resolve(locationObj);

                }


                return resolve(null);

            })
            .catch(function (error) {
                console.trace("error ", error);
                resolve(null);
            });


    });

}

Geocoding.prototype.logGoogleGeocode = function (data) {

    const self = this;


    return new Promise(async function (resolve, reject) {


        data["@timestamp"] = new Date();


        Elasticsearch.EsDotClient.index({
            index: self.INDEX_NAME,
            type: '_doc',
            body: data
        }, function (error, response) {


            // console.log("\n\n\n ---------- ");
            // console.log("Elasticsearch.EsDotClient.create data ", data);
            //  console.log("Elasticsearch.EsDotClient.create response err ", error);

            //console.log("Elasticsearch.EsDotClient.create response ", response);

            if (error) {
                console.trace("EsDotClient logEvents err", error);
                console.trace("EsDotClient logEvents err", JSON.stringify(data));
            }


        });

    });

}

Geocoding.prototype.getLocFromRedis = function () {

    const self = this;


    return new Promise(async function (resolve, reject) {

        try {
            let tmpLoc = (await redisClient.getAsync(self.locationStrHash, true)) || null;
            return resolve(tmpLoc);
        } catch (e) {
            return resolve();
        }


    });

}

Geocoding.prototype.setCoordinatesFromLocationStr = function () {

    const self = this;


    return new Promise(async function (resolve, reject) {


        // let tmpLocationObj = await self.getLocFromRedis();
        let tmpLocationObj = GeocodeMapper[self.locationStr];

        console.log("tmpLocationObj", tmpLocationObj);

        if (!tmpLocationObj) {
            tmpLocationObj = await self.getLocFromRedis();
        }

        if (!tmpLocationObj) {
            tmpLocationObj = await self.GoogleGeoCode();
        }

        //console.log("tmpLocationObj", tmpLocationObj);

        if (tmpLocationObj) {
            self.LocationObj = tmpLocationObj;
        }


        return resolve()
    });

}

Geocoding.prototype.setLocationStr = async function () {

    const self = this;

    let locationStr = "";

    locationStr = self.params.locationStr;

    //console.log("locationStr ", locationStr)

    try {
        if (locationStr.search(",") == -1 && self.params && self.params.geo && self.params.geo.length == 2) {
            locationStr = locationStr + ", " + self.params.geo;
        }
    } catch (e) {

    }

    try {
        locationStr = locationStr
            .toLowerCase()
            .split(",").join(", ")
            .replace(/ +(?= )/g, '');
    } catch (e) {

    }

    //console.log("locationStr ", locationStr)

    self.locationStr = locationStr;


    try {
        self.locationStrHash = crypto.createHash('md5').update(self.locationStr).digest('hex');
    } catch (e) {

    }
}

Geocoding.prototype.init = async function () {

    const self = this;


    return new Promise(async function (resolve, reject) {

        self.setLocationStr();

        await self.setCoordinatesFromLocationStr();

        // console.log("self.LocationObj init", self.LocationObj)

        return resolve(self.LocationObj);

    });


}


const test = async function () {


    setTimeout(async function () {
        let geocoding = await new Geocoding({
            locationStr: "66109,Kansas,United States"
        });
    }, 1000)


    //console.log("geocoding test", geocoding)
    //geocoding.GoogleGeoCode();

}

//test()

const geocode = async function (req, res) {

    let params = req.query;

    let geocoding = await new Geocoding(params);

    if (geocoding && "lat" in geocoding) {
        geocoding.code = 200;
        res.json(geocoding);
    } else {
        geocoding = {
            code: 400
        };
        res.json(geocoding);
    }

    //console.log("geocoding", geocoding)

}

exports.geocode = geocode;
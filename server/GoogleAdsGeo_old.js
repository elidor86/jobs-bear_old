const csv = require('csvtojson');

let LocationMapById = {};
let PostCodeData = {};
let PostCodeDataCA = {};
let CanonicalData = {};
let UsCitiesData = {};
let UsCitiesCityStateData = {};
let BingMapper = {};


const getLocationById = function (id, query) {
    let loc = null;


    //  console.log("getLocationById  ", id);
    //  console.log("getLocationById  query", query);

    try {

        if (query && query.utm_source && query.utm_source == "bing") {

            if (id in BingMapper && BingMapper[id]) {
                id = BingMapper[id];
            }

        }

    } catch (e) {

    }

    //console.log("getLocationById  ", id);

    try {
        loc = LocationMapById[id];


        if (loc && query.geo == "ca") {
            //console.log("loc  ", loc);
            let postal = loc.Name;
            if (postal && postal.length > 0) {
                postal = postal.toLowerCase();

                //console.log("postal  ", postal);

                let coordObj = PostCodeDataCA[postal];
                if (coordObj && coordObj.Latitude) {
                    loc.lat = parseFloat(coordObj.Latitude);
                    loc.long = parseFloat(coordObj.Longitude);
                }
            }

        }
    } catch (e) {

    }

    return loc;
};

const getZipFromLocation = function (location) {


    try {

        if (!location || location.length <= 2) {
            return null;
        }

        let locationArr = location.split(",");

        if (locationArr && locationArr.length >= 1) {

            let tmpZip = locationArr[0];
            let regexp = /^\d{5}$|^\d{5}-\d{4}$/;

            if (regexp.test(tmpZip) == true) {
                return tmpZip;
            } else {
                return null;
            }

        }

    } catch (e) {
        return null;
    }

};

const getDataByCityStateUs = function (str) {

    try {
        str = str.toLowerCase();
        return UsCitiesCityStateData[str];
    } catch (e) {
        return null
    }

}

const InitNew = async function () {

    let start = new Date();


    let postcodes = null;
    let postcodesCa = null;
    let CanonicalNameToCoordinates = null;
    let googleadsgeo = null;
    let Uscities = null;
    let bingMapper = null;

    try {
        postcodes = await csv().fromFile("postcodes.csv");
    } catch (e) {

    }


    try {
        bingMapper = await csv().fromFile("GeoLocations_bing.csv");

        if (bingMapper && bingMapper.length > 0) {
            bingMapper.forEach(function (item) {

                if (item && item['AdWords Location Id'] && item['AdWords Location Id'].length > 0) {
                    BingMapper[item['Location Id']] = item['AdWords Location Id'];
                }


            })
        }


    } catch (e) {

    }

    try {
        Uscities = await csv().fromFile("us-cities.csv");
    } catch (e) {

    }

    try {
        CanonicalNameToCoordinates = await csv().fromFile("Canonical-Name-To-Coordinates.csv");
    } catch (e) {

    }

    try {
        googleadsgeo = await csv().fromFile("google-ads-geo.csv");
    } catch (e) {

    }


    if (postcodes) {
        for (let index in postcodes) {
            const item = postcodes[index];
            PostCodeData[item.postcode] = item;
        }
    }

    if (CanonicalNameToCoordinates) {
        for (let index in CanonicalNameToCoordinates) {
            const item = CanonicalNameToCoordinates[index];
            CanonicalData[item["Canonical Name"]] = item;
        }
    }

    //console.log("Uscities", Uscities)

    if (Uscities) {

        //UsCitiesData
        for (let key in Uscities) {
            let item = Uscities[key];

            //UsCitiesCityStateData


            let zipCodeArr = item.zip_codes.split(" / ");

            delete item.zip_codes;
            item.latitude = parseFloat(item.latitude);
            item.longitude = parseFloat(item.longitude);


            let tmpCityStateStr = item.name.toLowerCase() + "," + item.state.toLowerCase();
            UsCitiesCityStateData[tmpCityStateStr] = item


            if (zipCodeArr && zipCodeArr.length > 0) {

                for (let index in zipCodeArr) {

                    let zip = zipCodeArr[index];

                    UsCitiesData[zip] = item;


                }

            }

        }

    }

    //console.log("UsCitiesCityStateData", UsCitiesCityStateData)

    //console.log("UsCitiesData ", UsCitiesData)

    try {

        postcodesCa = await csv().fromFile("IGEOCODE_canada_postal_code_premium_edition.csv");

        if (postcodesCa) {

            postcodesCa.forEach(function (row) {


                let postal = row.PostalCode.substring(0, 3);


                if (postal) {

                    postal = postal.toLowerCase();
                    PostCodeDataCA[postal] = row;

                }


            })

        }


    } catch (e) {

    }

    if (googleadsgeo) {

        for (let index in googleadsgeo) {
            const item = googleadsgeo[index];

            try {

                if (item["Target Type"] == "Postal Code" && item["Name"] in PostCodeData) {

                    const postalData = PostCodeData[item["Name"]];
                    item.postalCodeData = postalData;

                    if (postalData.town && postalData.town.length > 0 && postalData.region && postalData.region.length > 0) {
                        item.Name = postalData.town + ", " + postalData.region + ", UK";
                    } else if (postalData.region && postalData.region.length > 0) {
                        item.Name = postalData.region + ", UK";
                    }

                    if (postalData.latitude && postalData.longitude) {
                        try {
                            item.lat = parseFloat(postalData.latitude);
                            item.long = parseFloat(postalData.longitude);
                        } catch (e) {

                        }
                    }


                } else if (item["Canonical Name"] in CanonicalData) {


                    item.lat = parseFloat(CanonicalData[item["Canonical Name"]].lat);
                    item.long = parseFloat(CanonicalData[item["Canonical Name"]].long);

                } else if (item["Country Code"] == "US") {

                    if (item["Target Type"] == "Postal Code") {

                        let tmpZip = getZipFromLocation(item['Canonical Name']);

                        if (tmpZip in UsCitiesData) {

                            item.lat = UsCitiesData[tmpZip].latitude;
                            item.long = UsCitiesData[tmpZip].longitude;

                        }

                    } else {

                        let tmpData = getDataByCityStateUs(item['Canonical Name'].replace(",United States", ""));

                        if (tmpData && tmpData.latitude) {

                            item.lat = tmpData.latitude;
                            item.long = tmpData.longitude;

                        }

                        // console.log("------\n");
                        // console.log("tmpData", tmpData);
                        // console.log("item", item);

                    }


                    if (item["Target Type"] == "Postal Code" && item["Name"] in PostCodeData) {

                        const postalData = PostCodeData[item["Name"]];
                        item.postalCodeData = postalData;

                        if (postalData.town && postalData.town.length > 0 && postalData.region && postalData.region.length > 0) {
                            item.Name = postalData.town + ", " + postalData.region + ", UK";
                        } else if (postalData.region && postalData.region.length > 0) {
                            item.Name = postalData.region + ", UK";
                        }

                        if (postalData.latitude && postalData.longitude) {
                            try {
                                item.lat = parseFloat(postalData.latitude);
                                item.long = parseFloat(postalData.longitude);
                            } catch (e) {

                            }
                        }


                    }

                }

            } catch (e) {

            }

            LocationMapById[item["Criteria ID"]] = item;

        }

    }

    // console.log("CanonicalData ", CanonicalData);

    let end = new Date();

    //console.log("time to load locphiscalDAta", end - start);

    //console.log(getLocationById("1013496"));
};

InitNew();


exports.getLocationById = getLocationById;
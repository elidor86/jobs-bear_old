const fs = require('fs');
const csv = require('csvtojson');

class LocationService {
    constructor() {
        this.LocationMapById = {};
        this.PostCodeData = {};
        this.PostCodeDataCA = {};
        this.CanonicalData = {};
        this.UsCitiesData = {};
        this.UsCitiesCityStateData = {};
        this.BingMapper = {};
        this.countries = ['us', 'za', 'ca', 'gb'];

        this.init();
    }

    async init() {
        try {
            const start = new Date();

            // Load data dependencies first
            await Promise.all([
                this.loadPostCodes(),
                this.loadCanonicalData(),
                this.loadUSCities(),
                this.loadBingMapper(),
                this.loadPostcodesCA()
            ]);

            // Then load google-ads-geo.csv
            await this.loadGoogleAdsGeo();

            const end = new Date();
            console.log("Time to load data:", end - start, "ms");
        } catch (e) {
            console.error("Error initializing LocationService:", e);
        }
    }

    loadPostCodes() {
        return new Promise((resolve, reject) => {
            try {
                const stream = fs.createReadStream('postcodes.csv');
                csv()
                    .fromStream(stream)
                    .subscribe((item) => {
                        this.PostCodeData[item.postcode] = item;
                    }, (err) => {
                        console.error("Error processing postcodes.csv:", err);
                        reject(err);
                    }, () => {
                        resolve();
                    });
            } catch (e) {
                console.error("Exception in loadPostCodes:", e);
                reject(e);
            }
        });
    }

    loadCanonicalData() {
        return new Promise((resolve, reject) => {
            try {
                const stream = fs.createReadStream('Canonical-Name-To-Coordinates.csv');
                csv()
                    .fromStream(stream)
                    .subscribe((item) => {
                        try {
                            this.CanonicalData[item["Canonical Name"]] = item;
                        } catch (e) {
                            console.error("Error processing item in loadCanonicalData:", e);
                        }
                    }, (err) => {
                        console.error("Error processing Canonical-Name-To-Coordinates.csv:", err);
                        reject(err);
                    }, () => {
                        resolve();
                    });
            } catch (e) {
                console.error("Exception in loadCanonicalData:", e);
                reject(e);
            }
        });
    }

    loadUSCities() {
        return new Promise((resolve, reject) => {
            try {
                const stream = fs.createReadStream('us-cities.csv');
                csv()
                    .fromStream(stream)
                    .subscribe((item) => {
                        try {
                            const zipCodeArr = item.zip_codes.split(" / ");
                            delete item.zip_codes;
                            item.latitude = parseFloat(item.latitude);
                            item.longitude = parseFloat(item.longitude);

                            const cityStateStr = `${item.name.toLowerCase()},${item.state.toLowerCase()}`;
                            this.UsCitiesCityStateData[cityStateStr] = item;

                            if (zipCodeArr && zipCodeArr.length > 0) {
                                for (const zip of zipCodeArr) {
                                    this.UsCitiesData[zip] = item;
                                }
                            }
                        } catch (e) {
                            console.error("Error processing item in loadUSCities:", e);
                        }
                    }, (err) => {
                        console.error("Error processing us-cities.csv:", err);
                        reject(err);
                    }, () => {
                        resolve();
                    });
            } catch (e) {
                console.error("Exception in loadUSCities:", e);
                reject(e);
            }
        });
    }

    loadBingMapper() {
        return new Promise((resolve, reject) => {
            try {
                const stream = fs.createReadStream('GeoLocations_bing.csv');
                csv()
                    .fromStream(stream)
                    .subscribe((item) => {
                        try {
                            if (item && item['AdWords Location Id'] && item['AdWords Location Id'].length > 0) {
                                this.BingMapper[item['Location Id']] = item['AdWords Location Id'];
                            }
                        } catch (e) {
                            console.error("Error processing item in loadBingMapper:", e);
                        }
                    }, (err) => {
                        console.error("Error processing GeoLocations_bing.csv:", err);
                        reject(err);
                    }, () => {
                        resolve();
                    });
            } catch (e) {
                console.error("Exception in loadBingMapper:", e);
                reject(e);
            }
        });
    }

    loadPostcodesCA() {
        return new Promise((resolve, reject) => {
            try {
                const stream = fs.createReadStream('IGEOCODE_canada_postal_code_premium_edition.csv');
                csv()
                    .fromStream(stream)
                    .subscribe((row) => {
                        try {
                            let postal = row.PostalCode.substring(0, 3);
                            if (postal) {
                                postal = postal.toLowerCase();
                                this.PostCodeDataCA[postal] = row;
                            }
                        } catch (e) {
                            console.error("Error processing item in loadPostcodesCA:", e);
                        }
                    }, (err) => {
                        console.error("Error processing IGEOCODE_canada_postal_code_premium_edition.csv:", err);
                        reject(err);
                    }, () => {
                        resolve();
                    });
            } catch (e) {
                console.error("Exception in loadPostcodesCA:", e);
                reject(e);
            }
        });
    }

    loadGoogleAdsGeo() {
        return new Promise((resolve, reject) => {
            try {
                const stream = fs.createReadStream('google-ads-geo.csv');
                csv()
                    .fromStream(stream)
                    .subscribe((item) => {
                        try {
                            // Process item based on conditions
                            if (item["Target Type"] === "Postal Code" && item["Name"] in this.PostCodeData) {
                                const postalData = this.PostCodeData[item["Name"]];
                                item.postalCodeData = postalData;

                                if (postalData.town && postalData.region) {
                                    item.Name = `${postalData.town}, ${postalData.region}, UK`;
                                } else if (postalData.region) {
                                    item.Name = `${postalData.region}, UK`;
                                }

                                if (postalData.latitude && postalData.longitude) {
                                    item.lat = parseFloat(postalData.latitude);
                                    item.long = parseFloat(postalData.longitude);
                                }
                            } else if (item["Canonical Name"] in this.CanonicalData) {
                                item.lat = parseFloat(this.CanonicalData[item["Canonical Name"]].lat);
                                item.long = parseFloat(this.CanonicalData[item["Canonical Name"]].long);
                            } else if (item["Country Code"] === "US") {
                                if (item["Target Type"] === "Postal Code") {
                                    const tmpZip = this.getZipFromLocation(item['Canonical Name']);
                                    if (tmpZip && tmpZip in this.UsCitiesData) {
                                        item.lat = this.UsCitiesData[tmpZip].latitude;
                                        item.long = this.UsCitiesData[tmpZip].longitude;
                                    }
                                } else {
                                    const tmpData = this.getDataByCityStateUs(item['Canonical Name'].replace(",United States", ""));
                                    if (tmpData && tmpData.latitude) {
                                        item.lat = tmpData.latitude;
                                        item.long = tmpData.longitude;
                                    }
                                }
                            }

                            this.LocationMapById[item["Criteria ID"]] = item;
                        } catch (e) {
                            console.error("Error processing item in loadGoogleAdsGeo:", e);
                        }
                    }, (err) => {
                        console.error("Error processing google-ads-geo.csv:", err);
                        reject(err);
                    }, () => {
                        resolve();
                    });
            } catch (e) {
                console.error("Exception in loadGoogleAdsGeo:", e);
                reject(e);
            }
        });
    }

    getLocationById(id, query) {
        let loc = null;

        try {
            if (query && query.utm_source === "bing") {
                if (id in this.BingMapper && this.BingMapper[id]) {
                    id = this.BingMapper[id];
                }
            }
        } catch (e) {
            console.error("Error in getLocationById while mapping Bing ID:", e);
        }

        try {
            loc = this.LocationMapById[id];

            if (loc && query.geo === "ca") {
                let postal = loc.Name;
                if (postal && postal.length > 0) {
                    postal = postal.toLowerCase();
                    const coordObj = this.PostCodeDataCA[postal];
                    if (coordObj && coordObj.Latitude) {
                        loc.lat = parseFloat(coordObj.Latitude);
                        loc.long = parseFloat(coordObj.Longitude);
                    }
                }
            }
        } catch (e) {
            console.error("Error in getLocationById:", e);
        }

        return loc;
    }

    getZipFromLocation(location) {
        try {
            if (!location || location.length <= 2) {
                return null;
            }

            const locationArr = location.split(",");

            if (locationArr && locationArr.length >= 1) {
                const tmpZip = locationArr[0];
                const regexp = /^\d{5}$|^\d{5}-\d{4}$/;

                if (regexp.test(tmpZip)) {
                    return tmpZip;
                } else {
                    return null;
                }
            }
        } catch (e) {
            console.error("Error in getZipFromLocation:", e);
            return null;
        }
    }

    getDataByCityStateUs(str) {
        try {
            str = str.toLowerCase();
            return this.UsCitiesCityStateData[str];
        } catch (e) {
            console.error("Error in getDataByCityStateUs:", e);
            return null;
        }
    }
}

const locationService = new LocationService();

module.exports = locationService;

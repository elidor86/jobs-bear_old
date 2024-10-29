const fs = require('fs')


class LocationServiceUs {

    constructor(params) {

        this.params = params || {};

        this.LocationPath = "/locations.json";


        this.LocationsObj = null;

        this.init();

    }

    async loadLocationData() {
        const self = this;

        let filePath = __dirname + self.LocationPath;

        try {
            let data = fs.readFileSync(filePath, 'utf8');
            let obj = JSON.parse(data);
            self.LocationsObj = obj;
            return obj;
        } catch (err) {
            console.error(err);
            return null;
        }


    }


    getLocationFromStr(str) {
        const self = this;

        let locationObj = null;

        str = str.toLowerCase();

        if (!self.LocationsObj) {
            return null;
        }

        if (self.LocationsObj[str]) {
            locationObj = self.LocationsObj[str];
        }

        return locationObj;

    }

    async init() {

        const self = this;

        await self.loadLocationData();

    }

}


let locationServiceUs = new LocationServiceUs()

module.exports = locationServiceUs

const {parse} = require("url");
const CleanAndNormalizeKeywords = require("./CleanAndNormalizeKeywords");
const LocationServiceUS = require("../server/Locations/US/index");


const dayjs = require('dayjs')

const Utils = {};

Utils.ActiveGeoCodeArr = [
    "us",
    "gb",
    "uk",
    "za",
    "ca",
]

Utils.parseFriendlyUrl = function (pathname, reqQuery) {

    if (!pathname || typeof pathname != "string") {
        return;
    }

    try {
        if (pathname.indexOf("jobs-in-") == -1) {
            return;
        }
    } catch (e) {
        return;
    }

    const Res = {};

    let q = null;
    let l = null;
    let geo = null;

    try {
        pathname = pathname.replace(new RegExp("/", "igm"), "");
        pathname = pathname.replace(new RegExp("-", "igm"), " ");
    } catch (e) {

    }

    try {

        let tmpArr = pathname.split("jobs in");

        try {
            for (let index in tmpArr) {
                try {
                    tmpArr[index] = tmpArr[index].trim();
                } catch (e) {

                }

            }
        } catch (e) {

        }

        if (tmpArr && tmpArr[0] && tmpArr[0].length > 0) {
            q = tmpArr[0].trim();
        }

        if (tmpArr && tmpArr[1] && tmpArr[1].length > 2) {
            l = tmpArr[1].trim();
        } else if (tmpArr && tmpArr[1] && tmpArr[1].length == 2) {

            let ActiveGeoCodeArr = Utils.ActiveGeoCodeArr;

            let tmpGeoStr = tmpArr[1].toLowerCase();

            if (ActiveGeoCodeArr.indexOf(tmpGeoStr) > -1) {
                geo = tmpArr[1].trim();
            }


        }

        try {
            if (!geo && reqQuery && reqQuery.geo && typeof reqQuery.geo == "string" && reqQuery.geo.length == 2) {
                geo = reqQuery.geo.toLowerCase();
            }
        } catch (e) {

        }

    } catch (e) {

    }

    if (l && l.length > 0) {
        Res.location = l;
    }

    if (q && q.length > 0) {

        let cleanQ = CleanAndNormalizeKeywords.CleanAndNorm(q);
        if (cleanQ && typeof cleanQ == "string" && cleanQ.length > 0) {
            Res.keyword = q;
        }

    }

    if (geo && geo.length == 2) {

        if (geo == "uk") {
            geo = "gb";
        }

        Res.geo = geo;
    }

    if (Res.geo == "us" && Res.location && Res.location.length > 0 && typeof Res.location == "string") {

        try {

            const parsed = LocationServiceUS.getLocationFromStr(Res.location);

            if (parsed && parsed.name && typeof parsed.name == "string" && parsed.name.length > 0 && parsed.state_code && typeof parsed.state_code == "string" && parsed.state_code.length > 0) {
                Res.location = parsed.name + ", " + parsed.state_code;
            }

            if (parsed.latitude && typeof parsed.latitude == "number" && parsed.longitude && typeof parsed.longitude == "number") {
                Res.latitude = parsed.latitude;
                Res.longitude = parsed.longitude;
            }

        } catch (e) {

        }


    }

    return Res;

}

Utils.getGeoFromHostname = function (hostname) {

    let geo = null;

    if (!hostname || typeof hostname != "string") {
        return;
    }

    try {
        let tmpArr = hostname.split(".");
        if (tmpArr && tmpArr[0] && tmpArr[0].length == 2) {

            let tmpGeo = tmpArr[0].toLowerCase();
            let ActiveGeoCodeArr = Utils.ActiveGeoCodeArr;
            if (ActiveGeoCodeArr.indexOf(tmpGeo) > -1) {
                geo = tmpGeo;
            }

            if (geo == "uk") {
                geo = "gb";
            }

        }
    } catch (e) {

    }


    return geo;
}

Utils.getFriendlyCurrentDate = function () {

    try {
        return dayjs().format('MMMM YYYY');
    } catch (e) {
        return null
    }

}

Utils.titleCase = function (str) {

    try {
        const splitStr = str.toLowerCase().split(' ');
        for (let i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        // Directly return the joined string
        return splitStr.join(' ');
    } catch (e) {
        return null;
    }

}

module.exports = Utils
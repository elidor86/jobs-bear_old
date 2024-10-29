const axios = require('axios-https-proxy-fix');
const axiosBasic = require('axios');
const queryString = require('querystring');


const Elasticsearch = require('../server/elasticsearch');
const parser = require('ua-parser-js');
const URL = require("url");
const uuidv1 = require("uuid/v1");
const Redis = require('ioredis');

const redis = new Redis("rediss://default:AVNS_7QcBRS0SSDkHQ6byvOI@db-redis-nyc1-87361-do-user-3043922-0.c.db.ondigitalocean.com:25061");

const TrkTrafficBuying = function (req, res) {

    this.req = req;
    this.res = res;
    this.params = req.query;


    this.init();
};


TrkTrafficBuying.prototype.init = async function () {
    const self = this;
    let params = {};
    let locFromStrTaboola = null;
    // Define a default redirection URL.
    let urlToRedirect = "/jobs"; // Default URL for non-rejected requests.

    try {
        locFromStrTaboola = self.getLocationTaboola();
    } catch (e) {
        // Error handling for getLocationTaboola.
    }

    // Setup parameters from request queries.
    params.uid = uuidv1() || "";
    params.utm_medium = self.req.query.utm_medium || "";
    params.utm_source = self.req.query.utm_source || "";
    params.utm_campaign = self.req.query.utm_campaign || "dtl";
    params.botName = self.req.query.botName || self.req.query.utm_source || "";
    params.keyword = self.req.query.keyword || "";
    params.formattedAddress = self.req.query.zip || self.req.query.formattedAddress || null;
    params.geo = self.req.query.geo || null;

    ['pubId', 'tblci', 'ttclid', 'site'].forEach(param => {
        if (self.req.query[param]) {
            params[param] = self.req.query[param];
        }
    });

    if (params.geo === "uk") {
        params.geo = "gb";
    }

    if (params.botName === "tab" && locFromStrTaboola) {
        params.formattedAddress = locFromStrTaboola;
    }

    let {isRejected, reasons} = await self.getIsRejected();
    const rdrUrl = self.req.query.rdr;

    // Default redirection handling.
    if (isRejected == true && typeof rdrUrl === 'string' && rdrUrl) {

        urlToRedirect = decodeURIComponent(rdrUrl);

        // Replace placeholders in the rdr URL.
        urlToRedirect = urlToRedirect.replace(/\{q\}/g, encodeURIComponent(params.keyword || ''))
            .replace(/\{l\}/g, encodeURIComponent(params.formattedAddress || ''))
            .replace(/\{geo\}/g, encodeURIComponent(params.geo || ''));

    } else if (Array.isArray(reasons) && reasons.length > 0 && reasons.includes('GeoIP mismatch')) {
        urlToRedirect = "https://google.com";
    } else {
        // Append query parameters to the default URL for non-rejected requests.
        urlToRedirect = `${urlToRedirect}?${queryString.stringify(params)}`;
    }

    // Ensure logging occurs for every request.
    try {
        self.logClick({...params, urlToRedirect, isRejected, reject_reasons: reasons || []});
    } catch (e) {
        // Logging error handling.
    }

    // Perform the redirection.
    self.res.redirect(urlToRedirect);
};


TrkTrafficBuying.prototype.getLocationTaboola = function () {

    const self = this;
    const query = self.req.query;


    let location = null;


    try {

        if (query && query.botName == "tab" && query.title && query.title.length > 0) {

            //utm_campaign

            let adTitle = query.title;


            if (query.utm_campaign == "generic") {
                //Hiring Now in Ashley Heath | Up To £36/hr + Benefits | Apply Now
                let tmpLoc = adTitle.split("|")[0].trim().split(" in ")[1];

                if (tmpLoc && tmpLoc.length > 0) {
                    location = tmpLoc;
                }

            } else if (query.utm_campaign == "keyword") {

                //Delivery Driver jobs | 3 urgent Openings | £7-36/Hr | Swinton

                let tmpArr = adTitle.split(" | ");

                if (tmpArr && tmpArr[1] && tmpArr[1].search("urgent") > -1) {

                    location = tmpArr[3];

                } else if (tmpArr[1] && tmpArr[1].length > 0) {

                    location = tmpArr[1];

                }


            }


        }

    } catch (e) {

    }


    //console.log("location ", location);

    return location


};


TrkTrafficBuying.prototype.getClientIp = function (req) {
    try {
        const headerKeys = [
            'x-client-ip',
            'x-appengine-user-ip',
            'x-forwarded-for',
            'x-real-ip',
            'cf-connecting-ip' // Added for Cloudflare support, for example
        ];

        for (let key of headerKeys) {
            const ip = req.headers[key];
            if (ip) {
                return ip.split(',')[0].trim(); // Split and take the first IP in case of multiple IPs
            }
        }

        return req.remoteIp || req.connection?.remoteAddress || req.socket?.remoteAddress;
    } catch (e) {

    }


}

TrkTrafficBuying.prototype.getIsRejected = async function () {
    const self = this;
    let isRejected = false;
    let reasons = [];

    async function checkSessionFirstSeen() {
        try {
            const sessionFirstSeen = self.req.session?.session_first_seen;
            if (sessionFirstSeen) {
                const sessionFirstSeenDate = new Date(sessionFirstSeen).getTime();
                const currentTime = Date.now();
                const tenSeconds = 1000 * 15; // Ten seconds in milliseconds
                const difference = currentTime - sessionFirstSeenDate;

                if (difference > tenSeconds) {
                    return `Session first seen delta too high`;
                }
            }
        } catch (error) {
            //console.error('Error in checkSessionFirstSeen test:', error);
            //return 'Error in checkSessionFirstSeen test';
        }
        return null;
    }

    // Define Tests as Functions
    async function geoIpMismatch() {
        try {

            let googleGeoIP

            try {
                googleGeoIP = self.req.headers['x-appengine-country']?.toLowerCase();
                //googleGeoIP = "us";
                if (!googleGeoIP || googleGeoIP.length !== 2) {
                    return null;
                }
            } catch (e) {

            }


            const providedGeoIP = self.req.query.geo?.toLowerCase();

            if (!providedGeoIP || providedGeoIP.length !== 2) {
                return "buying: invalid geo provided";
            }

            if (googleGeoIP && providedGeoIP && (googleGeoIP !== providedGeoIP)) {
                return 'GeoIP mismatch';
            }

        } catch (error) {
            console.error('Error in geoIpMismatch test:', error);
            return 'Error in geoIpMismatch test';
        }
        return null;
    }

    async function checkPurchaseFrequency() {
        try {
            const uid = self.req.session?.uid;
            const lastPurchaseTime = self.req.session?.lastPurchaseTime;

            if (uid && lastPurchaseTime) {
                const currentTime = Date.now();
                const twoHours = 2 * 60 * 60 * 1000; // Two hours in milliseconds

                if (currentTime - lastPurchaseTime < twoHours) {
                    return 'User frequency too high';
                }
            }
        } catch (error) {
            console.error('Error in checkPurchaseFrequency test:', error);
            return 'Error in checkPurchaseFrequency test';
        }
        return null;
    }

    async function checkIPFrequency() {
        try {

            const req = self.req;
            const ip = self.getClientIp(req);
            //const ip = self.req.ip;
            const ipKey = `ipCount:${ip}`;
            const twoMinutes = 120; // Two minutes in seconds

            // Get the current count for the IP from Redis
            const ipCount = await redis.get(ipKey);
            if (ipCount && parseInt(ipCount) >= 1) {
                return 'IP request frequency too high';
            }

            // Increment the IP count and set an expiration of 2 minutes
            await redis.multi()
                .incr(ipKey)
                .expire(ipKey, twoMinutes)
                .exec();

            return null; // No rejection reason, so return null
        } catch (error) {
            console.error('Error in checkIPFrequency test:', error);
            return null;
        }
    }

    // More tests can be defined here in a similar manner

    // Array of Test Functions
    let tests = [geoIpMismatch, checkSessionFirstSeen, checkIPFrequency];

    try {
        if (process.env.NODE_ENV != "production") {
            // tests = [geoIpMismatch, checkPurchaseFrequency];
        }
    } catch (e) {

    }


    for (let index in tests) {
        let testFunction = tests[index];
        let result;

        try {
            result = await testFunction();
        } catch (e) {

        }

        if (result) {
            isRejected = true;
            reasons.push(result);
            break;
        }
    }


    return {isRejected, reasons};
};

TrkTrafficBuying.prototype.logClick = async function (params) {

    const self = this;

    const req = self.req;


    let currentUrl = "";

    try {
        currentUrl = req.protocol + "://" + req.hostname + req.url
    } catch (e) {

    }

    let data = {
        //session: req.session,
        url: currentUrl,
        date: new Date(),
        params: params,
        type: "tracking",
        name: "cost",
        ...params
    };

    try {
        delete data.session.cookie;
    } catch (e) {
        //console.log("e", e)
    }

    try {
        let ua = parser(req.headers['user-agent']);
        data.ua = ua;
    } catch (e) {

    }

    data.ip = self.getClientIp(req)

    if (req.headers['x-appengine-country']) {
        data.googleGeo = req.headers['x-appengine-country'].toLowerCase();
    }

    if (req.headers['x-appengine-region']) {
        data.googleRegion = req.headers['x-appengine-region'];
    }

    if (req.headers['x-appengine-city']) {
        data.googleCity = req.headers['x-appengine-city'];
    }

    data.referer = req.headers['referer'];

    try {
        let parsedurl = URL.parse(req.url, true);
        data.query = parsedurl.query;
        data.urlPathname = parsedurl.pathname;

        let splitPathName = [];

        try {

            let tmpArr = parsedurl.pathname.split("/");

            tmpArr.forEach(function (str) {
                if (str.length > 0) {
                    str = str.toLowerCase();
                    splitPathName.push(str);
                }
            });

            if (splitPathName.length > 0) {
                data.splitPathName = splitPathName;
            }

        } catch (e) {

        }

    } catch (e) {
        console.trace("e", e);
    }

    const INDEX_NAME = 'buying-time-series';

    data["@timestamp"] = new Date();

    try {
        delete data.value
    } catch (e) {

    }

    try {
        if (data.FirstSeen && data.FirstSeen.search("GMT") > -1) {
            delete data.FirstSeen;
        }
    } catch (e) {

    }


    Elasticsearch.EsDotClient.index({
        index: INDEX_NAME,
        type: '_doc',
        body: data
    }, function (error, response) {

        if (error) {
            console.trace("EsDotClient logEvents err", error);
            console.trace("EsDotClient logEvents err", JSON.stringify(data));
        }


    });


    if (params.isRejected == false) {
        self.logClickV2(data)
    }


};

TrkTrafficBuying.prototype.logClickV2 = function (params) {


    const self = this;


    try {
        let Data = {

            Event_Data: {
                //User_Lat_Long: self.params.lat + "," + self.params.long,
                keyword: params.keyword,
                location: params.formattedAddress,
                ua: params.ua.ua,
                Event_Name: "buy",
                Event_Type: "Transaction",
                Transaction_Direction: "buy",
                ip: params.ip,
                Uid: params.uid,
                Bot_Name: params.botName,
                User_Geo: params.geo,
                URL: params.url,
                utm_source: params.utm_source,
                utm_campaign: params.utm_campaign
            }

        }

        if (params.googleGeo) {
            Data.Event_Data.Geo_Ip = params.googleGeo;
        }

        if (params.googleCity) {
            Data.Event_Data.City_Ip = params.googleCity;
        }

        let eventLogUrl = 'https://log-events-v2-dpzmkkxlza-uc.a.run.app';

        //eventLogUrl = ' http://localhost:8080/';

        axiosBasic.post(eventLogUrl, Data).then(function (response) {


        }).catch(function (error) {


        }).then(function () {

        });

    } catch (e) {

    }

};

const trkTrafficBuying = function (req, res) {
    new TrkTrafficBuying(req, res);
};

exports.trkTrafficBuying = trkTrafficBuying;
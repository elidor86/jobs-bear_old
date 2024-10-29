const Elasticsearch = require('../server/elasticsearch');
const URL = require("url");
const parser = require('ua-parser-js');


LogEvents = function (req, eventObj) {

    try {
        let data = {};

        try {
            for (let key in req.query) {
                data[key] = req.query[key];
            }
        } catch (e) {

        }


        try {

            let tmpUa = req.headers['user-agent'];

            if (tmpUa && tmpUa.search("GoogleImageProxy") > -1) {
                return;
            }

        } catch (e) {

        }

        try {
            if (eventObj && eventObj.user && eventObj.user.email && !data.email) {
                data.email = eventObj.user.email
            }
        } catch (e) {

        }

        try {
            for (let key in eventObj) {
                data[key] = eventObj[key];
            }
        } catch (e) {

        }

        let botName = data.botName || "jobs-bear";

        if (data.clientIp) {
            data.ip = data.clientIp;
        } else {

            data.ip =
                req.remoteIp ||
                req.headers['x-client-ip'] ||
                req.headers['x-appengine-user-ip'] ||
                req.headers['x-forwarded-for'] ||
                req.headers['x-real-ip'];

        }


        if (req.headers['x-appengine-country']) {
            data.googleGeo = req.headers['x-appengine-country'].toLowerCase();
        }

        if (req.headers['x-appengine-region']) {
            data.googleRegion = req.headers['x-appengine-region'];
        }

        if (req.headers['x-appengine-city']) {
            data.googleCity = req.headers['x-appengine-city'];
        }


        data.date = new Date();

        data.botName = botName;

        if (req.Geo && !data.geo) {
            data.geo = req.Geo;
        }

        if (!data.url || data.url.length == 0) {
            data.url = req.headers['referer'];
        }


        try {
            let parsedurl = URL.parse(data.url, true);

            let tmpQuery = parsedurl.query;

            data.query = {};

            if (tmpQuery && typeof tmpQuery == "object") {
                for (let key in tmpQuery) {

                    let cleanKey = null;

                    try {

                        cleanKey = key.replace(/\./g, ' ').replace(/  +/g, '').trim();

                    } catch (e) {

                    }


                    if (tmpQuery[key] && typeof tmpQuery[key] == "string") {
                        data.query[key] = tmpQuery[key];
                    }

                }
            }


            data.urlPathname = parsedurl.pathname;

            var splitPathName = [];

            try {

                var tmpArr = parsedurl.pathname.split("/");

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

        }


        try {
            let ua = parser(req.headers['user-agent']);
            data.ua = ua;

        } catch (e) {
            // console.trace("logEvents parse ua error", e);
        }

        if (data.ua && data.ua.ua && data.ua.ua.search("bot.html") > -1) {
            return;
        }

        //console.log("data ", data);

        try {

            delete data.content;

        } catch (e) {

        }


        /* Elasticsearch.EsBotsonClient.index({
             index: 'email-statistics',
             type: '_doc',
             body: data
         }, function (error, response) {



         });*/


        const INDEX_NAME = 'email-statistics-time-series';

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


            // console.log("\n\n\n ---------- ");
            ///  console.log("Elasticsearch.EsDotClient.create data ", data);
            //  console.log("Elasticsearch.EsDotClient.create response err ", error);

            // console.log("Elasticsearch.EsDotClient.create response ", response);

            if (error) {
                console.trace("EsDotClient logEvents err", error);
                console.trace("EsDotClient logEvents err", JSON.stringify(data));
            }


        });

    } catch (e) {


        console.log("logEvents error ", e);

    }

};


module.exports = {
    log: LogEvents
};
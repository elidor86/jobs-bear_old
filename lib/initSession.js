const uuidv1 = require("uuid/v1");
const ABservice = require("./AB.service");
const CleanAndNormalizeKeywords = require("./CleanAndNormalizeKeywords");
const {parse} = require("url");
const Utils = require("./Utils");
const GetJobsBy = require("./GetJobsBy");
const FriendlyUtils = require("../server/FriendlyUtils");
const Keywords_Factory = require("../lib/Keywords_Factory");
const {popularTitleData} = require("../b2b/lib/jobsPageUtils");

const initSession = function (req) {


    const session = req.session || {};


    let parseFriendlyUrl = {};

    try {
        let parsedUrl = parse(req.url, true);
        let {pathname, query} = parsedUrl;
        parseFriendlyUrl = Utils.parseFriendlyUrl(pathname, query);
    } catch (e) {

    }


    if (session) {


        try {
            let googleGeo = req.headers["x-appengine-country"].toLowerCase();
            session.googleGeo = googleGeo;
        } catch (e) {

        }

        try {

            if (!session.session_first_seen) {
                // If not, set the current timestamp
                session.session_first_seen = new Date().toISOString();
            } else {
                // If it exists, calculate the time difference
                const session_first_seen = new Date(session.session_first_seen);
                const now = new Date();
                const twoHours = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

                // If more than 2 hours have passed, update 'first_seen'
                if (now - session_first_seen > twoHours) {
                    session.session_first_seen = now.toISOString();
                }
            }

        } catch (e) {

        }

        try {
            if (!session.first_seen) {
                session.first_seen = new Date().toISOString();
            }
        } catch (e) {

        }


        if (session.uid && typeof session.uid == "string") {

        } else {
            session.uid = uuidv1();
        }

        session.session_id = session.uid;

        try {
            session.FriendlyJobsTitle = FriendlyUtils.getJobsTitle(parseFriendlyUrl);
        } catch (e) {

        }

        try {
            session.FriendlyJobsP = FriendlyUtils.getJobsP(parseFriendlyUrl);
        } catch (e) {

        }

        try {
            session.FriendlyJobsMetaKeywords = FriendlyUtils.getJobsPageMetaKeyword(parseFriendlyUrl);
        } catch (e) {

        }

        try {
            session.query = req.query;
            if (session.query && session.query.page) {
                session.query.page = parseInt(session.query.page);
            }
        } catch (e) {

        }

        try {
            if (req.query.kwd && req.query.kwd.length > 0) {
                req.query.keyword = req.query.kwd;
            }
        } catch (e) {

        }

        try {

            if (req.query.utm_campaign == "JobListGBBroad" || req.query.utm_campaign == "JobListCaBroad") {
                req.query.keyword = "";
            }

        } catch (e) {

        }

        try {

            if (Array.isArray(req.query.keyword) == true) {
                if (req.query.keyword[1] && req.query.keyword[1].length > 0) {
                    req.query.keyword = req.query.keyword[1];
                }
            }

        } catch (e) {

        }

        try {
            if (!req.query.keyword && parseFriendlyUrl && parseFriendlyUrl.keyword) {
                req.query.keyword = parseFriendlyUrl.keyword;
            }
        } catch (e) {

        }

        try {
            if (!req.query.formattedAddress && parseFriendlyUrl && parseFriendlyUrl.location && parseFriendlyUrl.location.length > 0) {
                req.query.formattedAddress = parseFriendlyUrl.location;
            }
        } catch (e) {

        }


        try {
            if (!session.keyword && parseFriendlyUrl && parseFriendlyUrl.keyword) {
                session.keyword = parseFriendlyUrl.keyword;
            }
        } catch (e) {

        }


        try {
            if (!session.keywords || req.query.tags || req.query.keyword) {

                if (req.query.tags) {
                    session.keywords = req.query.tags.split(",");
                    session.tags = req.query.tags.split(",");
                } else if (req.query.keyword) {
                    try {

                        if (req.query.utm_campaign == "uklocationinkeywords") {

                            try {
                                let keyword = req.query.keyword.toLowerCase();
                                let tmpKeywords = keyword.split("jobs in");
                                if (tmpKeywords.length == 2) {
                                    req.query.keyword = tmpKeywords[0];
                                }
                            } catch (e) {

                            }

                        } else {

                            if (req.query.keyword == "partime") {
                                req.query.keyword = "part time";
                            }

                            req.query.keyword = CleanAndNormalizeKeywords.CleanAndNorm(req.query.keyword);
                        }


                    } catch (e) {

                    }
                    session.keywords = [req.query.keyword];
                } else {
                    session.keywords = [];
                }
            }
        } catch (e) {

        }


        try {

            let q = req.query.keyword;
            session.prevKeywords = session.prevKeywords || [];

            if (q && q.length > 0 && session.prevKeywords.indexOf(q) == -1) {
                session.prevKeywords.unshift(q);
            }

        } catch (e) {

        }

        try {

            if (!req.query.geo) {

                let tmpGeo = Utils.getGeoFromHostname(req.hostname);
                if (tmpGeo && tmpGeo.length == 2) {
                    req.query.geo = tmpGeo;
                    session.geo = tmpGeo;
                }

            }
        } catch (e) {

        }

        try {
            if (!session.geo || req.query.geo) {
                if (req.query.geo) {
                    session.geo = req.query.geo;
                    if (session.geo === "uk") {
                        session.geo = "gb";
                    }
                } else if (!session.geo) {
                    if (req.headers["x-appengine-country"]) {
                        session.geo = req.headers["x-appengine-country"].toLowerCase();
                    }
                } else {
                    session.geo = "us";
                }
            }
        } catch (e) {

        }

        try {
            if (req.headers["x-appengine-city"]) {
                session.geoIPLocation = req.headers["x-appengine-city"];
            }

            if (req.headers["x-appengine-region"]) {
                session.geoIPRegion = req.headers["x-appengine-region"];
            }

            if (req.headers["x-appengine-citylatlong"]) {
                session.geoIPCitylatlong = req.headers["x-appengine-citylatlong"];
            }
        } catch (e) {

        }


        try {

            if (req.query.formattedAddress && req.query.formattedAddress.length > 0) {
                session.formattedAddress = req.query.formattedAddress;
                session.location = req.query.formattedAddress;
            } else if (req.locpysical) {

                session.loc_id_data = req.locpysical;

                session.formattedAddress = req.locpysical["Name"].replace(new RegExp(",", "igm"), ", ");

                if (session.geo == "ca" || session.geo == "us" || session.geo == "za") {
                    session.formattedAddress = req.locpysical["Canonical Name"].replace(new RegExp(",", "igm"), ", ");
                }

                session.location = session.formattedAddress;

            }

        } catch (e) {

        }

        try {

            if ("lat" in req.query && "long" in req.query) {
                session.lat = parseFloat(req.query.lat);
                session.long = parseFloat(req.query.long);
            } else if (typeof req.locpysical == "object" && "lat" in req.locpysical) {
                session.lat = parseFloat(req.locpysical.lat);
                session.long = parseFloat(req.locpysical.long);
            }

        } catch (e) {

        }

        try {
            if (req.query.botName && typeof req.query.botName == "string" && req.query.botName.length > 0) {
                session.botName = req.query.botName;

                if (!session.first_botName) {
                    session.first_botName = "jobs-bear"
                }

            } else if (req.query.utm_source == "google") {
                session.botName = "jobs-bear"
            } else if (session.botName) {

            } else {
                session.botName = "jobs-bear"
            }
        } catch (e) {

        }


        if (req.query.utm_campaign && typeof req.query.utm_campaign == "string" && req.query.utm_campaign.length > 0) {
            session.utm_campaign = req.query.utm_campaign;
        }

        if (req.query.utm_source && typeof req.query.utm_source == "string" && req.query.utm_source.length > 0) {

            session.utm_source = req.query.utm_source;

            if (!session.first_utm_campaign) {
                session.first_utm_campaign = req.query.utm_source;
            }

        }

        if (typeof req.query.gclid == "string" && req.query.gclid.length > 0) {
            session.gclid = req.query.gclid;
        }

        if (typeof req.query.ttclid == "string" && req.query.ttclid.length > 0) {
            session.ttclid = req.query.ttclid;
        }

        if (!session.optedInToPN) {
            session.optedInToPN = false;
        }

        if (!session.providedEmail) {
            session.providedEmail = false;
        }

        try {
            if (req.query.utm_source == "email" || req.query.utm_source == "sms" || req.query.utm_source == "fb" || req.query.utm_campaign == "pandaLogicAmazonUsKwd") {
                session.providedEmail = true;
            }
        } catch (e) {

        }

        try {
            if (req.query.utm_source == "sms") {
                session.providedPhone = true;
            }
        } catch (e) {

        }

        try {

            if (req.query.email && req.query.email.length > 0) {
                session.email = req.query.email;
            }

        } catch (e) {

        }

        try {

            session.ua = req.useragent;

            if (typeof session.ua.source == "string") {
                session.ua_str = session.ua.source;
            }

        } catch (e) {

        }


        try {
            if ("isTitleOnly" in session == false) {

                let maximum = 100;
                let minimum = 1;

                try {
                    let randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

                    if (randomnumber <= 30) {
                        session.isTitleOnly = false;
                    } else {
                        session.isTitleOnly = true;
                    }
                } catch (e) {

                }

            }

        } catch (e) {

        }

        try {
            if ("OneTap" in session == false) {

                let maximum = 100;
                let minimum = 1;

                try {
                    let randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

                    if (randomnumber <= 15) {
                        session.OneTap = true;
                    } else {
                        session.OneTap = false;
                    }
                } catch (e) {

                }

            }
        } catch (e) {

        }


        try {
            if (req.query.oneTap) {
                session.OneTap = true;
            }
        } catch (e) {

        }


        if ("qa" in session == false) {

            let maximum = 100;
            let minimum = 1;

            try {
                let randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

                if (randomnumber <= 10) {
                    session.qa = true;
                } else {
                    session.qa = false;
                }
            } catch (e) {

            }

        }

        try {

            let hostname = req.hostname;

            //hostname = "jobs-bear.com";

            if (hostname == "jobs-bear.com") {

                if (req.query.geo == "ca") {
                    session.adSense = false;
                } else if (req.query.utm_campaign == "blog") {
                    session.adSense = false;
                } else if (req.url.search("/job/") > -1) {
                    session.adSense = true;
                } else if (req.query.utm_campaign == "jobListWithKeyword10K") {
                    session.adSense = false;
                } else if (req.query.utm_campaign == "jobListGbBmm") {
                    session.adSense = false;
                } else {
                    session.adSense = false;
                }

                if (req.query.utm_source == "email") {
                    session.adSense = true;
                } else if (req.query.utm_source == "web-push") {
                    session.adSense = true;
                }

                if (req.query.utm_source == "sms") {
                    session.adSense = true;
                }


                try {
                    if (req.query.botName == "tab") {
                        session.adSense = false;
                    }
                } catch (e) {

                }


                if (req.query.geo == "za") {
                    session.adSense = false;
                }

                try {

                    let googleGeo = session.googleGeo;

                    if (googleGeo == "za") {
                        session.adSense = false;
                    }

                    if (googleGeo == "us" || googleGeo == "ca" || googleGeo == "gb" || googleGeo == "uk") {

                    } else {
                        session.adSense = false;
                    }

                } catch (e) {

                }


            } else if (req.hostname == "jobs-bear.co") {

                session.adSenseCo = false;

            }


        } catch (e) {

        }

        try {


            if (req.query.botName == "tab") {
                session.tab = true;
            }

        } catch (e) {

        }


        try {
            const keyword_data = Keywords_Factory.get_keyword_data(req.query.keyword);
            session.keyword_data = keyword_data;
        } catch (e) {

        }


        try {
            session.AB = ABservice.setAB(session, req.useragent, req.url, req.query);
            //console.log("session.AB ", session.AB);
        } catch (e) {

        }

        let page = 0;

        try {
            page = req.query.page;
            page = parseInt(page);
            if (page && typeof page == "number" && page >= 3) {
                session.adSense = true;
            }
        } catch (e) {

        }

        try {
            let searchParams = {};

            let path = req.path;

            if (path[path.length - 1] == "/") {
                path = path.substring(0, path.length - 1);
            }


            let pathArr = path.split("/");

            if (pathArr && pathArr[2] == "jobs") {

                searchParams.geo = pathArr[1];

                if (pathArr.length == 5) {
                    searchParams.location = pathArr[3];
                    searchParams.keyword = pathArr[4];
                    searchParams.keyword = searchParams.keyword.replace("-jobs", "").replace(new RegExp("-", "ig"), " ");
                } else if (pathArr.length == 4) {

                    let tmpStr = pathArr[3];
                    if (tmpStr.search("-jobs") > -1) {
                        searchParams.keyword = pathArr[3];
                        searchParams.keyword = searchParams.keyword.replace("-jobs", "").replace(new RegExp("-", "ig"), " ");
                    } else {
                        searchParams.location = pathArr[3];
                    }

                }

            }


            if (searchParams.geo && searchParams.geo.length == 2) {
                if (searchParams.geo == "uk") {
                    searchParams.geo = "gb";
                }
                session.geo = searchParams.geo;
                req.query.geo = session.geo;
            }


            if (searchParams.keyword && searchParams.keyword.length >= 1) {
                req.query.keyword = searchParams.keyword;
            }

            if (searchParams.location && searchParams.location.length >= 1) {
                req.query.formattedAddress = session.location;
                session.formattedAddress = session.location;
            }


            session.searchParams = searchParams;


            try {
                let tmpByTitle = GetJobsBy.jobTitle({geo: session.geo});
                if (tmpByTitle) {
                    session.popularTitleData = tmpByTitle
                }
            } catch (e) {

            }

            try {
                let tmpByLocation = GetJobsBy.location({geo: session.geo});
                if (tmpByLocation) {
                    session.popularLocationData = tmpByLocation
                }
            } catch (e) {

            }


        } catch (e) {

        }

        //req.query.formattedAddress = "10005";

    }

    req.session = session;

};

module.exports = initSession;


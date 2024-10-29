//process.env.NODE_ENV = "production"

//const routes = require('./routes');
const express = require("express");
const validator = require("validator");
const {check, validationResult} = require('express-validator');

const next = require("next");
const fs = require("fs");
const compression = require("compression");
const session = require("express-session");
const bodyParser = require("body-parser");
const redis = require("redis");
const redisStore = require("connect-redis")(session);
const logEvent = require("./server/logEvent");
const gTokenToMail = require("./server/gTokenToMail");
const Client_IDs = require("./server/Client_IDs");
const JobApply = require("./server/JobApply");
const JobShare = require("./server/job-share");
const GoogleAdsGeo = require("./server/GoogleAdsGeo");
const EmailUnsubscribe = require("./server/email-unsubscribe");
const EmailImgPixel = require("./server/email-img-pixel");
const PhoneRedirect = require("./server/phone-redirect");
const sendCvToProviders = require("./server/sendCvToProviders");
const ConfirmEmail = require("./server/confirm-email");
const DailyJobsEmail = require("./server/daily-jobs-email");
const TrkTrafficBuying = require("./server/trk-traffic-buying");
const FriendlyUrls = require("./server/FriendlyUrls");
const CpaTracking = require("./server/cpa-track");
const Geocoding = require("./server/Geocoding");
const ReverseProxySitemap = require("./server/reverseProxySitemap");
const URL = require("url");
const parser = require('ua-parser-js');
const initSession = require("./lib/initSession");
const grecaptchaService = require("./lib/grecaptchaService");

const Multer = require("multer");

const multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
        fileSize: 5 * 1024 * 1024 // no larger than 5mb
    }
});


const useragent = require('express-useragent');


let {dev, redisHost, redisPwd, redisPort} = require("./server/config");
const {parse} = require("url");
const Utils = require("./lib/Utils");
const Keywords_Factory = require("./lib/Keywords_Factory");

//console.log("config", require('./server/config'));

//dev = false;

const app = next({dev});
const handle = app.getRequestHandler();
// GAE passes the port the app will run on via process.env.PORT
const port = process.env.PORT ? process.env.PORT : 3002;

//const handler = routes.getRequestHandler(app);

function logErrors(err, req, res, next) {


    try {

        if (req.url.search("updateSession") > -1) {

        } else {

            console.error("server_error_stack", err.stack);
            console.error("server_error_url ", req.url);
            console.error("server_error_body ", req.body);

            try {
                console.error("server_error_session ", JSON.stringify(req.session));
            } catch (e) {

            }

        }


    } catch (e) {

    }


    //logEvent(req, "error", err.message);
    next(err);
}

let client = redis.createClient({
    host: "redis-17161.c1.us-central1-2.gce.cloud.redislabs.com",
    port: "17161",
    password: "botson8686"
});

client.on("error", err => {
    console.trace("Redis error: ", err);
});

let sessionMiddleware = session({
    secret: "bishki",
    store: new redisStore({
        client: client
    }),
    name: "_jb_session",
    cookie: {secure: false},
    saveUninitialized: false,
    resave: false,
});

app
    .prepare()
    .then(() => {

        const server = express();


        server.use(((req, res, next) => {


            ///Warehouse-jobs-in-Za%22%7Dbfgx6153%C0%BEz1%C0%BCz2a%90bcxhjl6153%7Bzzz:expre/**

            let err = null;
            try {
                decodeURIComponent(req.path)
            } catch (e) {
                err = e;
            }

            if (err) {
                console.trace("decodeURIComponent_catch_from_server_use", req.url);
                app.render(req, res, '/404', {})
                return
            }
            next();
        }));


        server.use(compression());
        server.use(bodyParser.json());
        server.use(bodyParser.urlencoded({extended: false}));
        server.use(useragent.express());


        server.use(ReverseProxySitemap);

        server.use(((req, res, next) => {

            try {

                if (Array.isArray(req.query.geo) == true) {
                    req.query.geo = req.query.geo[0];
                } else if (req.query && req.query.geo && typeof req.query.geo == "string" && req.query.geo.search(",") > -1) {
                    req.query.geo = req.query.geo.split(",")[0];
                }

                //console.log("req.query.geo server", req.query.geo);

                return next();

            } catch (e) {
                return next();
            }

            return next();

        }));

        server.use(((req, res, next) => {

            try {

                if (req.url.search("/_next/") > -1 || req.url.search("/static/") > -1) {
                    return next();
                } else {

                    if (req.useragent.isBot && req.query.utm_campaign != "search") {
                        return next();
                    } else {
                        return sessionMiddleware(req, res, next);
                    }

                    return next();

                }

            } catch (e) {
                return next();
            }

        }));


        // server.use(async (req, res, next) => {
        //     const PAGE_PATHS = ["/_next/", "/static/", "/set_user_data/", "/\\.next/", "/updateSession"];
        //
        //     try {
        //         const shouldBypassProcessing = PAGE_PATHS.some(path => req.url.search(path) > -1);
        //         if (shouldBypassProcessing) {
        //             return next();
        //         }
        //
        //         const keywordData = await Keywords_Factory.get_keyword_data(req.query.keyword);
        //         session.keyword_data = keywordData;
        //     } catch (error) {
        //         // Handle error based on the nature of the error. For example, you can log it.
        //         console.error(error);
        //     }
        //
        //     next();
        // });

        server.use(((req, res, next) => {


            try {

                if (
                    req.url.search("/_next/") > -1 ||
                    req.url.search("/static/") > -1 ||
                    req.url.search(new RegExp("/set_user_data"), "igm") > -1 ||
                    req.url.search(new RegExp("/getSessin"), "igm") > -1 ||
                    req.url.search("/set_user_data/") > -1 ||
                    req.url.search("/\.next/") > -1 ||
                    req.url.search("/updateSession") > -1
                ) {
                    return next();
                }

            } catch (e) {
                return next();
            }


            try {
                if (req.query.locpysical && typeof req.query.locpysical == "string" && req.query.locpysical.length > 0) {
                    req.locpysical = GoogleAdsGeo.getLocationById(req.query.locpysical, req.query);
                }
            } catch (e) {

            }

            try {
                if (req.query.locinterest) {
                    req.locinterest = GoogleAdsGeo.getLocationById(req.query.locinterest, req.query);
                }
            } catch (e) {

            }

            initSession(req);

            next();
        }));


        server.use(((req, res, next) => {


            try {

                if (
                    req.url.search("/_next/") > -1 ||
                    req.url.search("/static/") > -1 ||
                    req.url.search("/\.next/") > -1 ||
                    req.url.search("/updateSession") > -1
                ) {
                    return next();
                }

            } catch (e) {
                return next();
            }


            try {

                const parsedUrl = parse(req.url, true);

                let {pathname, query} = parsedUrl;

                const parseFriendlyUrl = Utils.parseFriendlyUrl(pathname, query);

                if (parseFriendlyUrl) {

                    if (typeof parseFriendlyUrl.keyword == "string" && parseFriendlyUrl.keyword.length > 0) {
                        req.query.keyword = parseFriendlyUrl.keyword;
                    }

                    if (typeof parseFriendlyUrl.location == "string" && parseFriendlyUrl.location.length > 0) {
                        req.query.formattedAddress = parseFriendlyUrl.location;
                    }

                    if (typeof parseFriendlyUrl.geo == "string" && parseFriendlyUrl.geo.length == 2) {
                        req.query.geo = parseFriendlyUrl.geo;
                    }


                    if ("latitude" in parseFriendlyUrl && typeof parseFriendlyUrl.latitude == "number") {
                        req.query.lat = parseFriendlyUrl.latitude;
                    }

                    if ("longitude" in parseFriendlyUrl && typeof parseFriendlyUrl.longitude == "number") {
                        req.query.long = parseFriendlyUrl.longitude;
                    }

                }


            } catch (e) {

            }

            next();
        }));

        server.get("/getSessin", (req, res) => {

            res.json(req.session);

        });

        server.post("/updateSession", (req, res) => {
            try {
                if (req.body && !req.useragent.isBot) {
                    const payload = req.body;
                    for (let key in payload) {
                        if (payload.hasOwnProperty(key)) {
                            if (Array.isArray(req.session[key])) {
                                if (
                                    req.session[key][req.session[key].length - 1] !== payload[key]
                                ) {
                                    req.session[key].push(payload[key]);
                                }
                            } else {
                                req.session[key] = payload[key];
                            }
                        }
                    }
                    // console.log(`body params:keyword: ${JSON.stringify(req.body.keyword)}`)
                    //console.log(`update session: ${JSON.stringify(req.session)}`)
                }

                res.setHeader("Content-Type", "application/json");
                res.statusCode = 200;
                res.end(JSON.stringify({message: "updated session"}));
            } catch (e) {
                //console.trace("update session error", e);
                res.setHeader("Content-Type", "application/json");
                res.statusCode = 400;
                res.end(JSON.stringify({message: "could not update session", error: e}));
            }
        });

        server.post("/emailOptIn", (req, res) => {
            try {
                if (req.body) {
                    const {email} = req.body;
                    console.log(`body params:keyword: ${email}`);
                }
                res.setHeader("Content-Type", "application/json");
                res.statusCode = 200;
                res.end(JSON.stringify({message: "OK"}));
            } catch {
                res.setHeader("Content-Type", "application/json");
                res.statusCode = 400;
                res.end(JSON.stringify({message: "could not save email"}));
            }
        });

        server.get("/get-headers-testing", (req, res) => {
            try {
                const headers = req.headers;
                res.json({headers});
            } catch {

            }
        });

        server.post("/gTokenToMail", gTokenToMail.getMailFromToken);

        server.get("/share-whatsapp", JobShare.JobShareWhatapp);

        server.get("/email-unsubscribe", EmailUnsubscribe.unsubscribe);
        server.post("/email-unsubscribe", EmailUnsubscribe.unsubscribe);

        server.get("/bottom-footer-img", EmailImgPixel.emailImgPixel);

        server.get("/logo-daily", EmailImgPixel.emailImgPixel);

        server.get("/confirm-email", ConfirmEmail.confirm);
        server.get("/daily-jobs", DailyJobsEmail.confirm);
        server.get("/trk", TrkTrafficBuying.trkTrafficBuying);
        server.get("/geocode", Geocoding.geocode);

        server.get("/api/apply-tracking", CpaTracking.cpaTracking);
        server.post("/api/apply-tracking", CpaTracking.cpaTracking);

        server.get("/hiring/:id", PhoneRedirect.phoneRedirect);

        server.get("/:q-jobs-in-:l", (req, res) => {
            FriendlyUrls(req, res, app);
        });

        server.get("/jobs-in-:l", (req, res) => {
            FriendlyUrls(req, res, app);
        });

        server.get("/sw.js", (req, res) => {
            const content = fs.readFileSync("./static/js/sw.js").toString();
            res.setHeader("Content-Type", "application/javascript;charset=utf-8");
            res.status = 200;
            res.end(content);
        });

        server.get("/ads.txt", (req, res) => {
            const content = fs.readFileSync("./static/ads.txt").toString();
            res.setHeader("Content-Type", "text/plain");
            res.status = 200;
            res.end(content);
        });

        server.post("/set_user_data", (req, res) => {

            res.json({message: "OK"});

            try {
                new Client_IDs(req, res).set();
            } catch (e) {

            }

        });

        server.post("/emailOptIn", (req, res) => {
            try {
                if (req.body) {
                    const {email} = req.body;
                    console.log(`body params:keyword: ${email}`);
                }
                res.setHeader("Content-Type", "application/json");
                res.statusCode = 200;
                res.end(JSON.stringify({message: "OK"}));
            } catch {
                res.setHeader("Content-Type", "application/json");
                res.statusCode = 400;
                res.end(JSON.stringify({message: "could not save email"}));
            }
        });

        server.post("/grecaptcha-service", (req, res) => {
            try {
                if (req.body) {
                    const g = new grecaptchaService(req.body);
                    g.verify()
                }
                res.setHeader("Content-Type", "application/json");
                res.statusCode = 200;
                res.end(JSON.stringify({message: "OK"}));
            } catch {
                res.setHeader("Content-Type", "application/json");
                res.statusCode = 400;
                res.end(JSON.stringify({message: "could not save email"}));
            }
        });

        server.post("/job-apply", sendCvToProviders.upload, multer.single("file"), JobApply.sendUploadToGCS);

        server.get("/robots.txt", (req, res) => {
            const content = fs.readFileSync("./static/robots.txt").toString();
            res.setHeader("Content-Type", "text/plain");
            res.status = 200;
            res.end(content);
        });

        server.get("/redirect-to-job", (req, res) => {
            // example usage: http://localhost:3002/redirect-to-job?keyword=driver&formattedAddress=new%20york&job_id=c47028b0&feed=zipca&title=Secretary%20Receptionist&geo=ca&flowType=b&redirect_to_job=true
            const {
                keyword,
                formattedAddress,
                geo,
                lat,
                long,
                job_id,
                feed,
                title,
                flowType
            } = req.query;
            if (keyword && job_id && feed && title) {
                res.redirect(
                    `jobs?keyword=${keyword}&job_id=${job_id}&feed=${feed}&flowType=${flowType}&title=${title}&redirect_to_job=true`
                );
            } else {
                res.statusCode = 400;
                res.end(JSON.stringify({message: "bad request parameters"}));
            }
        });

        server.get("*", (req, res) => handle(req, res));

        server.use(logErrors);

        server.listen(port, err => {
            if (err) throw err;
            console.log(
                `> Ready on http://localhost:${port} NODE_ENV: ${process.env.NODE_ENV}`
            );
        });

    })
    .catch(ex => {
        console.trace(ex.stack);
        process.exit(1);
    });

const queryString = require('querystring');
const MongoDb = require('../lib/mongodb');
const LogEventsServer = require('../server/logEventsServer');
const fetch = require('isomorphic-fetch');


const EMAIL_ENDPOINT = "https://www.fastjobtoday.com/email-subscribe";
//const EMAIL_ENDPOINT = "https://emily.ngrok.io/email-subscribe";


const ConfirmEmailServices = function (req, res) {

    this.req = req;
    this.res = res;
    this.params = req.query;


    this.init();
};

ConfirmEmailServices.prototype.init = async function () {

    const self = this;

    let params = self.params;
    let user = null;

    try {

        await MongoDb.waitUntilConnect();

        user = await MongoDb.getDocument({
            collectionName: "emails",
            query: {
                email: params.email
            }
        })

    } catch (e) {

    }


    if (!user) {
        user = {
            email: params.email
        }
    }

    try {
        LogEventsServer.log(self.req, {
            name: "click",
            clickType: "confirmEmail",
            src: "confirmEmail",
            user: user
        })
    } catch (e) {

    }

    let UrlParams = {};


    UrlParams.utm_source = "email";
    UrlParams.utm_campaign = "confirmEmail";

    if (user.q && user.q.length > 0) {
        UrlParams.keyword = user.q;
    }

    if (user.botName && user.botName.length) {
        UrlParams.botName = user.botName;
    }

    if (user.location && user.location.length > 0) {
        UrlParams.formattedAddress = user.location;
    }

    if (user.email && user.email.length > 0) {
        UrlParams.email = user.email;
    }

    if (user.gclid && user.gclid.length > 0) {
        UrlParams.gclid = user.gclid;
    }

    if (user.firstName && user.firstName.length > 0) {
        UrlParams.firstName = user.firstName;
    }


    if (user.lastName && user.lastName.length > 0) {
        UrlParams.lastName = user.lastName;
    }

    if (user.geo && user.geo.length > 0) {
        UrlParams.geo = user.geo;
    } else {
        user.geo = "us";
        UrlParams.geo = "us";
    }

    if ("lat" in user) {
        UrlParams.lat = user.lat;
    }

    if ("long" in user) {
        UrlParams.long = user.long;
    }


    let url = "/jobs?" + queryString.stringify(UrlParams);

    self.res.redirect(url);


    try {

        MongoDb.updateDocument({
            collectionName: "emails",
            query: {
                email: params.email
            },
            updateObj: {
                $set: {
                    activeDate: new Date(),
                    lastOpen: new Date(),
                    active: true,
                },
                $inc: {
                    openCount: 1
                }
            }
        });

    } catch (e) {

    }

    try {
        self.sendLeadDoubleOptin(user);
    } catch (e) {

    }

};

ConfirmEmailServices.prototype.sendLeadDoubleOptin = async function (user) {

    const self = this;

    ///console.log("user", user);

    //sendLeadDoubleOptin


    let paramsForEmailLead = {
        cmd: "sendLeadDoubleOptin",
        geo: user.geo,
        timeZone: user.timeZone,
        timeZoneOffset: user.timeZoneOffset,
        firstName: user.firstName,
        email: user.email,
        url: user.url,
        q: user.q,
        location: user.location,
        lat: user.lat,
        long: user.long,
        botName: user.botName,
        hostname: user.hostname,
        gclid: user.gclid,
        utm_campaign: user.utm_campaign,
        utm_source: user.utm_source
    }

    ///console.log("paramsForEmailLead ", paramsForEmailLead);

    fetch(EMAIL_ENDPOINT, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(paramsForEmailLead)
    })
        .then(() => {

        })
        .then(() => {

        })
        .catch(error => {

        });

};

const confirmEmailServices = function (req, res) {
    new ConfirmEmailServices(req, res);
};

exports.confirm = confirmEmailServices;
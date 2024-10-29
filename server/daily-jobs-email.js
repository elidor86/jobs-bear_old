const queryString = require('querystring');
const MongoDb = require('../lib/mongodb');
const LogEventsServer = require('../server/logEventsServer');

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
            clickType: "daily",
            src: "daily",
            user: user
        })

    } catch (e) {

    }

    let UrlParams = {};


    UrlParams.utm_source = "email";
    UrlParams.utm_campaign = "daily";

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


    let updateObj = {
        $set: {
            lastOpen: new Date(),
        },
        $inc: {
            openCount: 1
        }
    };

    try {

        if (user.active != false) {
            updateObj.$set.active = true;
        }

    } catch (e) {

    }

    try {

        MongoDb.updateDocument({
            collectionName: "emails",
            query: {
                email: params.email
            },
            updateObj: updateObj
        });

    } catch (e) {

    }


};

const confirmEmailServices = function (req, res) {
    new ConfirmEmailServices(req, res);
};

exports.confirm = confirmEmailServices;
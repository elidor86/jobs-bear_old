const axios = require('axios-https-proxy-fix');
const queryString = require('querystring');
const MongoDb = require('../lib/mongodb');
const Elasticsearch = require('../server/elasticsearch');

const PhoneRedirect = function (req, res) {

    this.req = req;
    this.res = res;
    this.params = req.query;


    this.init();
};

PhoneRedirect.prototype.init = async function () {

    const self = this;

    try {
        await MongoDb.waitUntilConnect();
    } catch (e) {
        return self.res.redirect("/jobs?utm_source=sms&utm_campaign=error");
    }

    let phoneNumber = self.req.params.id;
    let v = null;

    try {

        let tmpphoneNumber = phoneNumber.split("-");

        phoneNumber = tmpphoneNumber[0];

        if (tmpphoneNumber[1]) {
            v = tmpphoneNumber[1];
        }

    } catch (e) {

    }

    let user = null;


    try {
        user = await MongoDb.getDocument({
            collectionName: "phones",
            query: {
                formatedPhoneNumber: phoneNumber
            }
        })
    } catch (e) {
        return self.res.redirect("/jobs?utm_source=sms&utm_campaign=error");
    }


    if (!user) {
        return self.res.redirect("/jobs?utm_source=sms&utm_campaign=error");
    }


    let params = {};

    if (v && v.length > 0) {
        params.utm_medium = v;
    }

    params.utm_source = "sms";
    params.utm_campaign = "comeWorkFor";

    if (user.q && user.q.length > 0) {
        params.keyword = user.q;
    }

    if (user.location && user.location.length > 0) {
        params.formattedAddress = user.location;
    }

    if (user.gclid && user.gclid.length > 0) {
        params.gclid = user.gclid;
    }

    if (user.firstName && user.firstName.length > 0) {
        params.firstName = user.firstName;
    }


    if (user.lastName && user.lastName.length > 0) {
        params.lastName = user.lastName;
    }

    if (user.geo && user.geo.length > 0) {
        params.geo = user.geo;
    }

    if ("lat" in user) {
        params.lat = user.lat;
    }

    if ("long" in user) {
        params.long = user.long;
    }


    let url = "/job-apply?" + queryString.stringify(params);

    if (user.geo && user.geo == "gb") {
        url = "/jobs?" + queryString.stringify(params);
    }


    self.res.redirect(url);

    self.logClickFromSms(phoneNumber, user);

};

PhoneRedirect.prototype.logClickFromSms = async function (phoneNumber, user) {

    const self = this;

    MongoDb.updateDocument({
        collectionName: "phones",
        query: {
            formatedPhoneNumber: phoneNumber
        },
        updateObj: {
            $set: {
                lastOpen: new Date()
            },
            $inc: {
                openCount: 1
            }
        }
    });

    /* Elasticsearch.EsBotsonClient.index({
         index: 'events',
         type: '_doc',
         body: {
             date: new Date(),
             user: user,
             type: "sms",
             name: "open",
             formatedPhoneNumber: phoneNumber
         }
     }, function (error, response) {




     });*/

};

const phoneRedirect = function (req, res) {
    new PhoneRedirect(req, res);
};

exports.phoneRedirect = phoneRedirect;
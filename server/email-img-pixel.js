const axios = require('axios-https-proxy-fix');
const queryString = require('querystring');
const MongoDb = require('../lib/mongodb');
const Elasticsearch = require('../server/elasticsearch');
const LogEventsServer = require('../server/logEventsServer');
const URL = require("url");
const parser = require('ua-parser-js');

const EmailImgPixel = function (req, res) {

    this.req = req;
    this.res = res;
    this.params = req.query;


    this.init();
};

EmailImgPixel.prototype.init = async function () {

    const self = this;

    self.res.set({
        'Content-Type': 'image/gif'
    })

    self.res.status(200).send('');


    let params = self.params;

    if (!params || !params.email || params.email.length <= 2) {
        return;
    }

    self.logEmailOpen();

};

EmailImgPixel.prototype.logEmailOpen = async function () {

    const self = this;

    let user = null;

    try {

        await MongoDb.waitUntilConnect();

        user = await MongoDb.getDocument({
            collectionName: "emails",
            query: {
                email: self.params.email
            }
        })

    } catch (e) {
        console.trace("logEmailOpen e", e);
    }

    //console.log("user", user);


    let eventObj = {
        src: "confirmEmail",
        name: "open",
        type: "emailStatistics"
    };


    try {
        if (self.req.path == "/logo-daily") {
            eventObj.src = "daily";
        }
    } catch (e) {

    }

    //console.log("eventObj", eventObj);

    if (user) {
        eventObj.user = user;
    }


    //self.logEvents(eventObj)
    LogEventsServer.log(self.req, eventObj);

};

const emailImgPixel = function (req, res) {


    new EmailImgPixel(req, res);
};

exports.emailImgPixel = emailImgPixel;
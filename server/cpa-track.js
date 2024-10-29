const Elasticsearch = require('../server/elasticsearch');
const axios = require('axios');

const CpaTracking = function (req, res) {

    this.req = req;
    this.res = res;
    this.params = req.query;


    this.init();
};

CpaTracking.prototype.init = async function () {

    const self = this;

    self.res.json({success: true});


    try {
        const req = self.req;
        const INDEX_NAME = 'cpa-tracking-time-series';
        const data = {};

        data.query = self.req.query;
        data.body = self.req.body;

        data["@timestamp"] = new Date();

        try {
            delete data.value
        } catch (e) {

        }


        try {

            data.hostname = req.hostname;

            data.ip = req.remoteIp || req.headers['x-client-ip'] || req.headers['x-appengine-user-ip'] || req.headers['x-forwarded-for'] || req.headers['x-real-ip'];

            if (req.headers['x-appengine-country']) {
                data.googleGeo = req.headers['x-appengine-country'].toLowerCase();

            }

            if (req.headers['x-appengine-region']) {
                data.googleRegion = req.headers['x-appengine-region'];
            }

            if (req.headers['x-appengine-city']) {
                data.googleCity = req.headers['x-appengine-city'];
            }

        } catch (e) {

        }

        try {
            data.url = "https://" + req.hostname + req.url;
        } catch (e) {

        }

        let Click_Data = null;

        try {

            let click_id = null;


            if (!click_id && req.query.account == "CMP" && req.query.ClickID && typeof req.query.ClickID == "string" && req.query.ClickID.length > 0) {
                click_id = req.query.ClickID;
            }

            if (!click_id && req.query.account == "Appcast" && req.query.userid && typeof req.query.userid == "string" && req.query.userid.length > 0) {
                click_id = req.query.userid;
            }

            if (!click_id && req.query.clickid && typeof req.query.clickid == "string" && req.query.clickid.length > 0) {
                click_id = req.query.clickid;
            }

            if (click_id && typeof click_id == "string" && click_id.length > 0) {
                let URL = "https://reporting-api-dpzmkkxlza-uc.a.run.app/?TriggerName=Click_ID_Services&report_conv=true&CMD=get&click_id=" + click_id;
                // URL = "http://localhost:8080/?TriggerName=Click_ID_Services&report_conv=true&CMD=get&click_id=" + click_id;
                try {
                    const Click_ID_Services_Response = await axios.get(URL);

                    if (Click_ID_Services_Response && Click_ID_Services_Response.data && Click_ID_Services_Response.data.statusCode == 200 && Click_ID_Services_Response.data.result) {
                        Click_Data = Click_ID_Services_Response.data.result;
                    }


                } catch (e) {
                    console.trace("Click_ID_Services_Response err", e.message)
                }
            }

        } catch (e) {

        }


        data.Click_Data = Click_Data;


        Elasticsearch.EsDotClient.index({
            index: INDEX_NAME,
            type: '_doc',
            body: data
        }, function (error, response) {

            if (error) {
                // console.trace("EsDotClient logEvents err", error);
                // console.trace("EsDotClient logEvents err", JSON.stringify(data));
            }

        });

    } catch (e) {

    }


};

const cpaTracking = function (req, res) {

    new CpaTracking(req, res);
};

exports.cpaTracking = cpaTracking;
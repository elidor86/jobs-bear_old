const Elasticsearch = require('../server/elasticsearch');
const axios = require('axios');

const ClientIds = function (req, res) {

    this.req = req;
    this.res = res;
    this.params = req.query;

    this.REPORTING_API_URL = "https://reporting-api-dpzmkkxlza-uc.a.run.app";
    this.REPORTING_API_URL_DEV = "http://localhost:8080";

    this.init();
};

ClientIds.prototype.set = async function () {

    const self = this;


    try {

        const query = self.req.query;
        const req_body = self.req.body;
        const session = self.req.session;

        if (!query || typeof query !== "object") {
            return
        }

        const {utm_source, utm_medium, utm_campaign, utm_term, utm_content, gclid, ttclid} = query;
        const {client_ids, user_id, session_id} = req_body;
        const {uid} = session;

        if (typeof user_id !== "string" || user_id.length == 0) {
            return;
        }

        if (typeof client_ids !== "object") {
            return;
        }

        const body = {
            user_id: user_id,
            client_ids
        }

        const query_params = {
            TriggerName: "Click_ID_Services",
            CMD: "setClientIds"
        }

        if (typeof session_id == "string" && session_id.length > 0) {
            body.session_id = session_id;
        }


        const client_ids_keys = Object.keys(body.client_ids);

        if (client_ids_keys.length == 0) {
            return;
        }


        let finalUrl = self.REPORTING_API_URL;

        if (process.env.NODE_ENV != "production") {
            //finalUrl = self.REPORTING_API_URL_DEV;
        }


        const queryString = new URLSearchParams(query_params).toString();

        if (queryString) {
            finalUrl = `${finalUrl}?${queryString}`;
        }

        // Send the POST request
        const response = await axios.post(finalUrl, body);

        //const x = "stop";

    } catch (e) {

    }


};

ClientIds.prototype.init = async function () {

    const self = this;

};

module.exports = ClientIds;
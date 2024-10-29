const axios = require('axios');
const Elasticsearch = require('../server/elasticsearch');

class RecaptchaVerifier {
    constructor(params) {

        this.secret = params.secret || "6Lcjj5gmAAAAAHZ9F6iNyPDpYhe_Hffz2jsg2jXs";
        this.response = params.token;

        this.params = params;

    }

    async verify() {
        const self = this;

        const result = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
            params: {
                secret: self.secret,
                response: self.response
            }
        });

        self.params.recaptchaData = result.data;

        self.save();

        return result.data;
    }


    async save() {

        const self = this;

        self.params["@timestamp"] = new Date();


        Elasticsearch.EsDotClient.index({
            index: "recaptcha-time-series",
            type: '_doc',
            body: self.params
        }, function (error, response) {

            console.log("Elasticsearch.EsDotClient.create response err ", error);

        });

    }
}

module.exports = RecaptchaVerifier;
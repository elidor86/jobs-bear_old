const axios = require('axios-https-proxy-fix');
const queryString = require('querystring');
const LogEventsServer = require('../server/logEventsServer');
const MongoDb = require('../lib/mongodb');
const Redis = require('../lib/Redis');

const Unsubscribe = function (req, res) {

    this.req = req;
    this.res = res;
    this.params = req.query;


    this.init();
};

Unsubscribe.prototype.unsubscribeOngae = function () {
    const self = this;


    //console.log("unsubscribeOngae ");

    const email = self.params.email;

    if (!email) {
        return;
    }


    let listId = "84051";


    let Data = {
        "emails": [email], list_id: listId, change_to: "unsubscribe"
    };

    //console.log("sendLeadToOnGage Data ", Data);

    let url = "https://api.ongage.net/api/v2/contacts/change_status";

    const options = {
        method: 'POST', headers: {
            'x_username': 'dan@botson.ai', 'x_password': 'fJ8xGNF^o%to', 'x_account_code': 'adworks_ltd',
        }, data: Data, url
    };

    axios(options).then(function (response) {


        //console.log("response.data ", response.data);


    }).catch(function (error) {
        console.trace("error ", error);
    }).then(function (error) {
        // console.trace("error ", error);
    });


};

Unsubscribe.prototype.unsubscribeOngaeUs = function () {
    const self = this;


    //console.log("unsubscribeOngae ");

    const email = self.params.email;

    if (!email) {
        return;
    }


    let listId = "90451";


    let Data = {
        "emails": [email], list_id: listId, change_to: "unsubscribe"
    };

    //console.log("sendLeadToOnGage Data ", Data);

    let url = "https://api.ongage.net/api/v2/contacts/change_status";

    const options = {
        method: 'POST', headers: {
            'x_username': 'dan@botson.ai', 'x_password': 'fJ8xGNF^o%to', 'x_account_code': 'adworks_ltd',
        }, data: Data, url
    };

    axios(options).then(function (response) {


        //console.log("response.data ", response.data);


    }).catch(function (error) {
        console.trace("error ", error);
    }).then(function (error) {
        // console.trace("error ", error);
    });


};

Unsubscribe.prototype.unsubscribeTj = async function () {
    const self = this;

    // console.log("unsubscribeTj ");

    let email = self.params.email;


    if (!email) {
        return;
    }

    try {
        email = email.toLowerCase().trim();
    } catch (e) {

    }


    let config = {
        /*proxy: {
            host: '34.82.166.44',
            port: 2055,
        },*/
        data: {
            username: 'JOBSBEAR',
            password: 'qnnMX.!ALJc*9ytqC*XM'
        },
        headers: {
            'Content-Type': 'application/json',
            //'botson': 'true'
        },
        method: 'POST',
        url: 'https://recruiter.white-cloud.io/login'
    };


    let tokensResp = null;
    let createResp = null;
    let token = null;


    try {
        let tmpToken = await Redis.getAsync("TjToken");
        //console.log("tmpToken", tmpToken);
        if (tmpToken && tmpToken.length > 0) {
            token = tmpToken;
        }
    } catch (e) {

    }

    if (!token) {

        try {
            tokensResp = await axios.request(config);
        } catch (e) {
            //console.log("tokens err", e);
        }

        //console.log("tokensResp ", tokensResp);


        if (!tokensResp || !tokensResp.data || !tokensResp.data.AccessToken) {
            console.trace("no access token");
            return;
        }

        token = tokensResp.data.AccessToken;

        try {
            try {
                Redis.setAsync("TjToken", token, 60 * 5);
            } catch (e) {

            }
        } catch (e) {

        }

    }


    config.data = {
        "email": email
    };

    let AnonConfig = {

        /* proxy: {
             host: '34.82.166.44',
             port: 2055,
         },*/
        data: {
            email: email,
            //externalSubscriptionId: "675e01e1-fefc-48bb-82c2-bcea1fc04ed1"
            //password: 'qnnMX.!ALJc*9ytqC*XM'
        },
        headers: {
            'Content-Type': 'application/json', //'botson': 'true'
        },
        method: 'PUT',
        url: "https://recruiter.white-cloud.io/candidate/anonymize"
    };

    AnonConfig.headers.Authorization = token;
    //console.log("config.data ", JSON.stringify(config.data));

    config.method = "DELETE";
    config.headers.Authorization = token;
    config.url = "https://recruiter.white-cloud.io/candidate/v1/subscription";


    try {
        let externalSubscriptionId = null;

        await MongoDb.waitUntilConnect();

        let user = await MongoDb.getDocument({
            collectionName: "emails", query: {
                email: email
            }
        })

        if (user && user.TJ_candidateId && typeof user.TJ_candidateId == "string") {
            externalSubscriptionId = user.TJ_candidateId;
            config.data.externalSubscriptionId = externalSubscriptionId;
            createResp = await axios.request(config);

            try {
                LogEventsServer.log(self.req, {
                    name: "tj unsubscribe delete user success",
                    user: user,
                    tj_delete_response: createResp.data,
                    event_group: "tj_unsubscribe"
                })
            } catch (e) {

            }

            const x = "stop"
        }


    } catch (e) {
        let x = "Stop";

        try {
            LogEventsServer.log(self.req, {
                name: "tj unsubscribe delete user error", error: e.response.data, event_group: "tj_unsubscribe"
            })
        } catch (e) {

        }
    }

    try {
        createResp = await axios.request(AnonConfig);
        const x = "stop";

        try {
            LogEventsServer.log(self.req, {
                name: "tj unsubscribe anonymize success",
                tj_anonymize_response: createResp.data,
                event_group: "tj_unsubscribe"
            })
        } catch (e) {

        }

    } catch (e) {
        let x = "stop";
        try {
            LogEventsServer.log(self.req, {
                name: "tj unsubscribe anonymize error", error: e.response.data, event_group: "tj_unsubscribe"
            })
        } catch (e) {

        }
    }


};

Unsubscribe.prototype.unsubscribeSelfSes = async function () {
    const self = this;

    let email = self.params.email;

    try {
        email = email.toLowerCase();
    } catch (e) {

    }

    let user = null;

    try {

        await MongoDb.waitUntilConnect();

        user = await MongoDb.getDocument({
            collectionName: "emails", query: {
                email: email
            }
        })

        if (user) {
            self.user = user;
        }

    } catch (e) {

    }


    if (!user) {
        user = {
            email: email
        }
    }

    try {
        LogEventsServer.log(self.req, {
            name: "unsubscribe", user: user
        })
    } catch (e) {

    }


    try {

        MongoDb.updateDocument({
            collectionName: "emails", query: {
                email: email
            }, updateObj: {
                $set: {
                    active: false, unActiveDate: new Date()
                }
            }
        });

    } catch (e) {

    }


};


Unsubscribe.prototype.init = function () {

    const self = this;

    //console.log("params ", self.params);

    let params = self.req.query;

    params.utm_source = "email";

    const url = "/unsubscribe-success?" + queryString.stringify(params);


    //if request is post then return json response else redirect to url
    if (self.req.method == "POST") {
        self.res.json({success: true});
    } else {
        self.res.redirect(url);
    }


    if (self.params.utm_campaign == "self") {
        self.unsubscribeOngae();
        self.unsubscribeOngaeUs();

    } else if (self.params.utm_campaign == "tj") {

        self.unsubscribeSelfSes();
    } else if (self.params.utm_campaign == "selfSes") {
        self.unsubscribeSelfSes();


    }

    try {
        self.unsubscribeTj();
    } catch (e) {

    }


};

const unsubscribe = function (req, res) {
    new Unsubscribe(req, res);
};

exports.unsubscribe = unsubscribe;
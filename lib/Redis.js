const redis = require("redis");

const client = redis.createClient({
    host: "redis-17161.c1.us-central1-2.gce.cloud.redislabs.com",
    port: "17161",
    password: "botson8686",
    retry_unfulfilled_commands: true,
    retry_strategy: function (options) {
        //console.trace("retry", JSON.stringify(options));
        if (options.error && options.error.code === 'ECONNREFUSED') {
            // End reconnecting on a specific error and flush all commands with
            // a individual error
            //return new Error('The server refused the connection');
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
            // End reconnecting after a specific timeout and flush all commands
            // with a individual error
            // return new Error('Retry time exhausted');

        }

        // reconnect after
        return Math.min(options.attempt * 100, 3000);
    }
});

client.on("error", function (err) {
    // console.trace("redis Error :", err);
});

client.getAsync = function (key, parse) {

    // console.log("getAsync key ", key);
    return new Promise(function (resolve, reject) {


        client.get(key, function (err, reply) {

            // console.log("getAsync reply ", reply);

            if (err) {
                console.trace("getAsync err", err);
                reject();
                return;
            }

            if (parse == true) {
                try {
                    resolve(JSON.parse(reply));
                } catch (e) {

                }
            } else {
                resolve(reply);
            }

        });

    });

};

client.setAsync = function (key, value, sec, toStr) {

    // console.log("setAsync key ", key);
    // console.log("setAsync value ", value);
    // console.log("setAsync sec ", sec);
    sec = sec || 60;

    if (toStr == true) {

        try {
            value = JSON.stringify(value);
        } catch (e) {

        }

    }

    return new Promise(function (resolve, reject) {


        if (global.debug == true) {
            //console.log("global.debug");
            //return resolve();
        }

        client.set(key, value, 'EX', sec, function (err, reply) {

            if (err) {
                console.trace("setAsync err", err);
                return reject(err);

            }

            resolve(reply);
        });

    });

};

client.multiGet = function (keys) {

    return new Promise(function (resolve, reject) {

        let multiGetArr = ["mget"];

        multiGetArr = multiGetArr.concat(keys);

        //console.log(multiGetArr);

        client.multi([
            multiGetArr
        ]).exec(function (err, replies) {

            if (err) {
                console.trace("multiGet err ", JSON.stringify(err));
                return resolve(null);
            }


            //console.log("multiGet replies", replies);

            return resolve(replies);

        });

    });

};


module.exports = client;


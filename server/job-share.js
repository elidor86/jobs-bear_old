const Redis = require("ioredis");
const redis = new Redis("rediss://default:uwto6stvywgp7y66@db-redis-nyc1-96029-do-user-3043922-0.db.ondigitalocean.com:25061");
const crypto = require('crypto');
const queryString = require('querystring');

function bitwise(str) {
    var hash = 0;
    if (str.length == 0) return hash;
    for (var i = 0; i < str.length; i++) {
        var ch = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + ch;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

function binaryTransfer(integer, binary) {
    binary = binary || 62;
    var stack = [];
    var num;
    var result = '';
    var sign = integer < 0 ? '-' : '';

    function table(num) {
        var t = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return t[num];
    }

    integer = Math.abs(integer);

    while (integer >= binary) {
        num = integer % binary;
        integer = Math.floor(integer / binary);
        stack.push(table(num));
    }

    if (integer > 0) {
        stack.push(table(integer));
    }

    for (var i = stack.length - 1; i >= 0; i--) {
        result += stack[i];
    }

    return sign + result;
}

const strToHash = function (str) {
    return crypto.createHash('md5').update(str).digest("hex");
};

const ShortHash = function (text) {
    var id = binaryTransfer(bitwise(text), 61);
    return id.replace('-', 'Z');
};

const getJobFromRedis = function (job_id) {
    return new Promise(async function (resolve, reject) {

        redis.get(job_id, function (err, result) {


            if (result) {

                try {

                    const job = JSON.parse(result);

                    //console.log(job);

                    resolve(job);

                    return;
                } catch (e) {
                    resolve(null);
                }

            }

            resolve(null);

        });


    });
};

const saveJobRedis = function (jobId, job) {


    return new Promise(async function (resolve, reject) {

        let ttl = 60 * 60 * 24 * 4;


        redis.set(jobId, JSON.stringify(job), 'EX', ttl, function (err, res) {

            if (err) {
                console.log("err ", err);
            }

            resolve();
            //console.log("res ", res);
            //console.log("job.referencenumber ", job.referencenumber);

        });


    });


};


const JobShareWhatapp = async function (req, res) {

    const params = req.query;


    if (!params.jobId || !params.jobTitle || !params.jobBody) {
        return res.json({
            error: 500
        })
    }

    const hashJobId = ShortHash(params.jobId);
    const BaseUrl = "https://jobs-bear.com/job/" + hashJobId + "?";

    let urlParams = {
        utm_campaign: "share",
        utm_source: "whatsapp",
        geo: params.geo
    };

    const jobFromRedis = await getJobFromRedis(hashJobId);

    //console.log("jobFromRedis", jobFromRedis);

    if (!jobFromRedis) {

        await saveJobRedis(hashJobId, {
            city: "near by",
            url: decodeURIComponent(params.jobUrl),
            title: decodeURIComponent(params.jobTitle),
            body: decodeURIComponent(params.jobBody),
            src: params.src
        });

    }

    const rdrUrl = BaseUrl + queryString.stringify(urlParams);
    const whatsappUrl = "https://wa.me/?text=" + encodeURIComponent(rdrUrl);

    res.writeHead(303, {
        'Location': whatsappUrl
    });

    res.end();


};


exports.JobShareWhatapp = JobShareWhatapp;
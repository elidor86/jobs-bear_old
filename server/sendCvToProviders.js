const multiparty = require('multiparty')
const fs = require('fs');
//const request = require('request');
const Elasticsearch = require('./elasticsearch');


let NexxtUrl = "https://svc.nexxt.com/api/v2.0/nexxt.com/jobseeker/register";


const logEvent = function (params, payload) {


    payload.date = new Date();


    for (let key in params) {
        payload[key] = params[key];
    }


    delete payload.resumefile;

    /*Elasticsearch.EsBotsonClient.index({
        index: 'cvleads',
        type: '_doc',
        body: payload
    }, function (error, response) {




    });*/
}


const getZipFromLocation = function (location) {

    try {


        if (!location || location.length <= 2) {
            return null;
        }

        let locationArr = location.split(",");

        if (locationArr && locationArr.length >= 1) {

            let tmpZip = locationArr[0];
            let regexp = /^\d{5}$|^\d{5}-\d{4}$/;

            if (regexp.test(tmpZip) == true) {
                return tmpZip;
            } else {
                return null;
            }

        }

    } catch (e) {

    }

}


exports.upload = (req, res, next) => {

    //console.log("sendUploadToGCS ", req);

    //res.json({});

    let form = new multiparty.Form();

    form.parse(req, function (err, fields, files) {
        //console.log("fields", fields);

        console.log("files", files);
        console.log("fields", fields);

        if (!files || !files.file) {
            console.trace("sendCvToProvider error no file");
            return;
        }

        if (!fields) {
            console.trace("sendCvToProvider error no fields");
            return;
        }

        let file = files.file[0];


        if (!file) {
            console.trace("sendCvToProvider error no file");
            return;
        }

        let location = fields.location[0];
        let email = fields.email[0];

        if (!fields || !fields.email || !email || email.length <= 3) {
            console.trace("sendCvToProvider error no email");
            return;
        }

        if (!location || !fields.location || !location || location.length <= 2) {
            console.trace("sendCvToProvider error no location");
            return;
        }


        let zip = getZipFromLocation(location);

        if (!zip || zip.length <= 2) {
            console.trace("sendCvToProvider error no zip");
            return;
        }


        let params = {
            firstname: fields.firstName[0],
            lastname: fields.lastName[0],
            email: fields.email[0],
            postalcode: zip,
            affiliateid: "61066A46-FC8B-4436-8D7A-08CF5BAAC713",
            keywords: fields.keyword[0],
            resumefile: fs.createReadStream(file.path)
        }

        let payload = JSON.parse(JSON.stringify(params));

        logEvent({
            name: "sent",
            revType: "CPL",
            partner: "NewLeadCv"
        }, payload)


        console.log('params: ', params);

        request.post({
            url: NexxtUrl,
            headers: {
                'X-Auth-Key': 'BFF42BA7DEC1D4558EC255395947BCA39FD4C4E800D1BDE28313AA0CDCCABE6E'
            },
            formData: params
        }, function optionalCallback(err, httpResponse, body) {

            // console.log('httpResponse: ', httpResponse);
            // console.log('err: ', err);
            // console.log('body: ', body);

            try {

                let bodyObj = JSON.parse(body);

                console.log('bodyObj: ', bodyObj);

                if (bodyObj && bodyObj.JobSeeker && bodyObj.Success == true) {

                    logEvent({
                        name: "success",
                        revType: "CPL",
                        partner: "Nexxt",
                        successObjNexxt: bodyObj
                    }, payload)

                } else {

                    logEvent({
                        name: "error",
                        revType: "CPL",
                        partner: "Nexxt",
                        errorObjNexxt: bodyObj
                    }, payload)

                }

            } catch (e) {

            }


        });

    });

    next();

};

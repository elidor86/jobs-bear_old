const {parse} = require('url');
const Utils = require('../lib/Utils');

const FriendlyUrls = function (req, res, app) {

    let query = {};
    let pathname = {};
    let session = {};

    ///Location_Source

    try {
        const parsedUrl = parse(req.url, true);

        pathname = parsedUrl.pathname;
        query = parsedUrl.query;
        session = req.session;

        const parseFriendlyUrl = Utils.parseFriendlyUrl(pathname, query, session);

        if (parseFriendlyUrl) {

            if (parseFriendlyUrl.keyword) {
                query.keyword = parseFriendlyUrl.keyword;
            }

            if (parseFriendlyUrl.location) {
                query.formattedAddress = parseFriendlyUrl.location;
                query.location = parseFriendlyUrl.location;
            }

            if (parseFriendlyUrl.geo) {
                query.geo = parseFriendlyUrl.geo;
            }

            if ("latitude" in parseFriendlyUrl && typeof parseFriendlyUrl.latitude == "number") {
                query.lat = parseFriendlyUrl.latitude;
            }

            if ("longitude" in parseFriendlyUrl && typeof parseFriendlyUrl.longitude == "number") {
                query.long = parseFriendlyUrl.longitude;
            }

            if (session.AB.Location_Source == "locpysical" && typeof req.locpysical) {

            }


        }

    } catch (e) {

    }

    app.render(req, res, '/jobs', query) // Pass the file name here so that it reads the proper file from /pages directory

}


module.exports = FriendlyUrls
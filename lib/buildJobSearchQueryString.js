import _ from 'underscore';

export default function buildJobSearchQueryString(queryParams) {
    let query = [];
    let pageQueryExists = false;
    // Loop through the data object
    for (var key in queryParams) {
        if (queryParams.hasOwnProperty(key)) {
            if (queryParams[key] !== "" && queryParams[key] !== 'undefined') {
                if (key === 'page') {
                    pageQueryExists = true;
                    if (!isNaN(queryParams[key])) {
                        query.push(
                            encodeURIComponent(key) + "=" + encodeURIComponent(++queryParams[key])
                        );
                    }
                } else {
                    query.push(
                        encodeURIComponent(key) + "=" + encodeURIComponent(queryParams[key])
                    );
                }
            }
        }
    }

    if (!pageQueryExists) {
        query.push("page=1");
    }


    const clientVars = window.ClientVars;

    if (clientVars) {
        if (!_.has(queryParams, 'uid') && clientVars.uid) {
            query.push(`uid=${clientVars.uid}`);
        }
        if (!_.has(queryParams, 'gclid') && clientVars.gclid) {
            query.push(`gclid=${clientVars.gclid}`)
        }
        if (!_.has(queryParams, 'utm_source') && clientVars.utm_source) {
            query.push(`utm_source=${clientVars.utm_source}`)
        }
        if (!_.has(queryParams, 'utm_campaign') && clientVars.utm_campaign) {
            query.push(`utm_campaign=${clientVars.utm_campaign}`)
        }
        // query.push(`geo=${clientVars.geo}`)
    }

    return query.join("&");
};
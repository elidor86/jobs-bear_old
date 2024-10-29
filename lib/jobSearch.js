import fetch from "isomorphic-fetch";

const MAX_NUMBER_OF_JOBS = 20;

export default function jobSearch(query, retries) {

    let JOB_SEARCH_URL = "https://job-search-v2-yl3tx7rxya-uc.a.run.app";

    //JOB_SEARCH_URL = "http://localhost:3009/job-search";


    try {
        //console.log("jobSearch query", query);
    } catch (e) {

    }


    let keywords = [];


    if (retries === 0) {
        return [];
    }

    try {
        if (!query.tags) {
            query.tags = [];
        }
    } catch (e) {

    }

    keywords.push(query.keywords);

    try {
        if (query.keywords && typeof query.keywords == "string" && query.tags && typeof query.tags == "object") {
            query.tags.unshift(query.keywords);
        }
    } catch (e) {

    }

    let r = 35;
    let isTitleOnly = true;

    if (query.searchR) {
        try {
            r = parseInt(query.searchR);
        } catch (e) {

        }
    }

    if ("isTitleOnly" in query) {
        isTitleOnly = query.isTitleOnly;
    }


    let hostname = "jobs-bear.com";

    try {
        if (location && location.hostname) {
            hostname = location.hostname;
        }
    } catch (e) {

    }

    if (query.hostname && query.hostname.length > 0) {
        hostname = query.hostname;
    }

    let searchParams = {
        session_id: query.session_id,
        q: query.keywords || query.keyword,
        utm_medium: query.utm_medium || null,
        utm_source: query.utm_source || null,
        isTitleOnly: isTitleOnly,
        gclid: query.gclid,
        prevKeywords: query.prevKeywords || [],
        neuvooCaBulkXml: query.neuvooCaBulkXml,
        TjCpcUk: query.TjCpcUk,
        neuvooBulk: query.neuvooBulk,
        zipApiGb: query.zipApiGb,
        utm_campaign: query.utm_campaign,
        uid: query.uid,
        size: query.size || 20,
        hostname: hostname,
        r: r,
        geo: query.geo,
        lat: query.lat,
        long: query.long,
        formatted_address: query.formattedAddress || query.location || "",
        botName: query.botName || "jobs-bear",
        tags: query.tags.length > 0 ? query.tags : keywords,
        page: parseInt(query.page || 1)
    };


    try {
        if ("client_ip" in query) {
            searchParams.client_ip = query.client_ip;
        }
    } catch (e) {

    }

    try {
        if ("search_type" in query) {
            searchParams.search_type = query.search_type;
        }
    } catch (e) {

    }

    try {
        if ("identifier" in query) {
            searchParams.identifier = query.identifier;
        }
    } catch (e) {

    }


    try {
        if (!searchParams.formatted_address || searchParams.formatted_address.length == 0) {

            const loc = MainApp.getLocation();

            if (loc && loc.length > 0) {
                searchParams.formatted_address = loc;
            }

        }
    } catch (e) {

    }

    try {
        if (window) {
            searchParams.AB = window.ClientVars.AB
        }
    } catch (e) {

    }

    try {
        if ("AB" in query) {
            searchParams.AB = query.AB
        }
    } catch (e) {

    }

    try {
        searchParams.searchedUrl = window.location.href;
    } catch (e) {

    }


    let fetchOptions = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(searchParams)
    };


    try {
        if (query.ua && query.ua.length > 0) {
            fetchOptions.headers["user-agent"] = query.ua;
        }
    } catch (e) {

    }

    //console.log("fetchOptions", fetchOptions);

    return fetch(JOB_SEARCH_URL, fetchOptions)
        .then(response => response.json())
        .then(responseData => {

            let relevantJobList = responseData || [];

            return relevantJobList;
        })
        .catch(error => {
            //console.trace("Error fetching and parsing job list data", error);
            //console.trace("Error fetching and parsing job list data", JSON.stringify(query));
            if (retries) {
                --retries
            } else {
                retries = 3
            }
            return jobSearch(query, retries)
        });

}

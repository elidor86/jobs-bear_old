import fetch from "isomorphic-fetch";

let KIBANA_ENDPOINT = "https://jobs-bear.com/api/log-events";
//KIBANA_ENDPOINT = "http://localhost:4003/api/log-events";


export default async function logEvent(eventName, payload) {


    if (!process.browser) {
        return;
    }


    try {
        //smartlook('track', eventName, payload)
    } catch (e) {

    }


    let uid, geo, utm_source, utm_campaign, gclid, AB, locpysical, FirstSeen, keywords, jobClickCount, isTitleOnly,
        vipConfig;

    let OneTap = false;
    let qa = false;
    let timeZone = "";
    let timeZoneDiff = "";

    try {

        let isBot = MainApp.isBot();

        if (isBot == true) {
            return;
        }

    } catch (e) {

    }


    if (process.browser) {

        try {

            if (
                eventName == "emailSignUp" ||
                eventName == "SMSoptIn" ||
                eventName == "click-notification-allow" ||
                eventName == "track-job_out"
            ) {

                let value = 0.2;

                if (eventName == "click-notification-allow") {
                    value = 0.05;
                }

                if (eventName == "SMSoptIn") {
                    value = 0.08;
                }

                if (eventName == "track-job_out") {
                    value = 0.1;

                    try {
                        gtag('event', 'conversion', {'send_to': 'AW-676971710/ZKfJCP-Jzr4YEL6J58IC'});
                    } catch (e) {

                    }

                }


                if ("uetq" in window) {
                    window.uetq.push('event', eventName, {"revenue_value": value, "currency": "USD"});
                }

                try {
                    if ("_tfa" in window) {
                        window._tfa.push({notify: 'event', name: eventName, id: 1401805, revenue: value});
                    }
                } catch (e) {

                }


            }


        } catch (e) {

        }


        try {
            timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        } catch (e) {

        }

        try {
            timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        } catch (e) {

        }

        try {
            OneTap = ClientVars.OneTap;
        } catch (e) {

        }

        try {
            qa = ClientVars.qa ? ClientVars.qa : false;
        } catch (e) {

        }

        try {
            vipConfig = ClientVars.vipConfig;
        } catch (e) {

        }

        try {
            isTitleOnly = ClientVars.isTitleOnly;
        } catch (e) {

        }

        /*try {
            FS.event(eventName, payload);
        } catch (e) {

        }*/

        try {
            jobClickCount = localStorage.getItem("jobClickCount") || 0;
            jobClickCount = parseInt(jobClickCount);
        } catch (e) {

        }


        try {
            let keywordsFromStorage = localStorage.getItem("keywords");
            if (keywordsFromStorage) {
                keywordsFromStorage = JSON.parse(keywordsFromStorage);
                if (keywordsFromStorage && keywordsFromStorage.length > 0) {
                    keywords = keywordsFromStorage;
                }
            }
        } catch (e) {

        }

        var versionName = "";

        if (window.ClientVars && window.ClientVars.AB) {
            for (let key in window.ClientVars.AB) {
                versionName = versionName + key + "=" + window.ClientVars.AB[key] + ";";
            }
            AB = window.ClientVars.AB;
        }

        try {
            if (ClientVars && ClientVars.FirstSeen) {
                FirstSeen = ClientVars.FirstSeen;
                FirstSeen = FirstSeen.toString();
            }
        } catch (e) {

        }

        try {
            if (ClientVars && ClientVars.locpysical) {
                locpysical = ClientVars.locpysical;
            }
        } catch (e) {

        }

        uid = JSON.parse(document.getElementById("session").textContent).clientVars
            .uid || "undefined";

        geo =
            JSON.parse(document.getElementById("session").textContent).clientVars
                .geo || "undefined";

        if (geo === "uk") {
            geo = "gb";
        }

        gclid =
            JSON.parse(document.getElementById("session").textContent).clientVars
                .gclid || "undefined";

        utm_source =
            JSON.parse(document.getElementById("session").textContent).clientVars
                .utm_source || "undefined";

        utm_campaign =
            JSON.parse(document.getElementById("session").textContent).clientVars
                .utm_campaign || "undefined";


        try {
            let uidFromStorage = localStorage.getItem("uid");
            if (uidFromStorage && uidFromStorage.length > 0) {
                uid = uidFromStorage;
            }
        } catch (e) {

        }

    }

    let botName = null;
    let location = null;
    let q = null;

    try {
        botName = MainApp.getBotName();
    } catch (e) {

    }

    try {
        location = MainApp.getLocation();
    } catch (e) {

    }
    try {
        q = MainApp.getKeyword();
    } catch (e) {

    }

    let PostData = {};

    let keyword_data = null;

    try {
        if (window.ClientVars && window.ClientVars.keyword_data) {
            keyword_data = window.ClientVars.keyword_data;
        }
    } catch (e) {

    }

    try {

        PostData = {
            keyword_data: keyword_data,
            sessionJobClickCount: window.jobClickCount,
            url: window.location.href,
            OneTap: OneTap,
            qa: qa,
            vipConfig: vipConfig,
            isTitleOnly: isTitleOnly,
            jobClickCount: jobClickCount,
            keywords: keywords,
            timeZone: timeZone,
            versionName: versionName,
            FirstSeen: FirstSeen,
            uid: uid,
            geo: geo,
            locpysical: locpysical,
            name: eventName,
            botName: botName || "jobs-bear",
            hostname: window.location.hostname,
            gclid: gclid,
            AB: AB,
            utm_source: utm_source,
            utm_campaign: utm_campaign,
            referrer: document.referrer,
            ...payload
        }


    } catch (e) {


    }

    try {
        if (ClientVars.ua_client_id && typeof ClientVars.ua_client_id == "string" && ClientVars.ua_client_id.length > 0) {
            PostData.ua_client_id = ClientVars.ua_client_id;
        }
    } catch (e) {

    }

    try {
        if (ClientVars && typeof ClientVars.session_id == "string" && ClientVars.session_id.length > 0) {
            PostData.session_id = ClientVars.session_id;
        }
    } catch (e) {

    }

    try {
        delete PostData["keyword_data"];
    } catch (e) {

    }


    fetch(KIBANA_ENDPOINT, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(PostData)
    })
        .then(response => response.json())
        .then(() => {
            // console.debug(`event logged: ${eventName}`)
        })
        .catch(error => {
            console.trace("can't submit event to server");
        });


}

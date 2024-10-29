import logEvent from "./logEvent";
import store from '../context/GlobalStateContext';


import fetch from "isomorphic-fetch";
import Engagement_Metrics from "./Engagement_Metrics.service";


var trackJobClickCtr = function (params) {


    let endPoint = "https://jobs-bear.com/api/log-job-click";


    //console.log("trackJobClickCtr", params);

    if (!params || !params.referencenumber) {
        return;
    }


    try {

        let jobClickHistory = localStorage.getItem("jobClickHistory") || "";

        if (jobClickHistory.search(params.referencenumber) > -1) {
            return;
        } else {
            jobClickHistory += "," + params.referencenumber;
            localStorage.setItem("jobClickHistory", jobClickHistory);
        }

    } catch (e) {
        return;
    }


    try {

        let jobParams = {
            referencenumber: params.referencenumber
        };


        fetch(endPoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jobParams)
        })
            .then(response => response.json())
            .then(() => {
                // console.debug(`event logged: ${eventName}`)
            })
            .catch(error => {
                console.trace("can't submit event to server", error);
            });
    } catch (e) {

    }

};

var trackJobClickEmailEvent = function (params) {


    let endPoint = "https://jobs-bear.com/api/log-email-event?email=";


    let doLog = false;


    try {
        if (ClientVars.email && ClientVars.email.length > 0) {
            doLog = true;
            endPoint = endPoint + ClientVars.email;
        }
    } catch (e) {

    }

    if (doLog == false) {
        return;
    }


    try {


        fetch(endPoint, {
            method: "GET"
        })
            .then(response => response.json())
            .then(() => {
                // console.debug(`event logged: ${eventName}`)
            })
            .catch(error => {
                console.trace("can't submit event to server", error);
            });
    } catch (e) {

    }

};

export default function handleJobClick(jobUrl, jobTitle, jobSrc, jobCpc, newTab, jobBody, click_method, job) {

    if (!jobSrc) {
        jobSrc = "";
    }


    try {
        if (job) {
            window.currentJobClicked = job;
        }
    } catch (e) {

    }

    try {
        let metric = {
            item: job || window.currentJobClicked || {},
            name: "click"
        }
        Engagement_Metrics.addToQueue(metric);
    } catch (e) {

    }


    let Base64 = {
        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        encode: function (e) {
            var t = "";
            var n, r, i, s, o, u, a;
            var f = 0;
            e = Base64._utf8_encode(e);
            while (f < e.length) {
                n = e.charCodeAt(f++);
                r = e.charCodeAt(f++);
                i = e.charCodeAt(f++);
                s = n >> 2;
                o = (n & 3) << 4 | r >> 4;
                u = (r & 15) << 2 | i >> 6;
                a = i & 63;
                if (isNaN(r)) {
                    u = a = 64
                } else if (isNaN(i)) {
                    a = 64
                }
                t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
            }
            return t
        },
        decode: function (e) {
            var t = "";
            var n, r, i;
            var s, o, u, a;
            var f = 0;
            e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            while (f < e.length) {
                s = this._keyStr.indexOf(e.charAt(f++));
                o = this._keyStr.indexOf(e.charAt(f++));
                u = this._keyStr.indexOf(e.charAt(f++));
                a = this._keyStr.indexOf(e.charAt(f++));
                n = s << 2 | o >> 4;
                r = (o & 15) << 4 | u >> 2;
                i = (u & 3) << 6 | a;
                t = t + String.fromCharCode(n);
                if (u != 64) {
                    t = t + String.fromCharCode(r)
                }
                if (a != 64) {
                    t = t + String.fromCharCode(i)
                }
            }
            t = Base64._utf8_decode(t);
            return t
        },
        _utf8_encode: function (e) {
            e = e.replace(/\r\n/g, "\n");
            var t = "";
            for (var n = 0; n < e.length; n++) {
                var r = e.charCodeAt(n);
                if (r < 128) {
                    t += String.fromCharCode(r)
                } else if (r > 127 && r < 2048) {
                    t += String.fromCharCode(r >> 6 | 192);
                    t += String.fromCharCode(r & 63 | 128)
                } else {
                    t += String.fromCharCode(r >> 12 | 224);
                    t += String.fromCharCode(r >> 6 & 63 | 128);
                    t += String.fromCharCode(r & 63 | 128)
                }
            }
            return t
        },
        _utf8_decode: function (e) {
            var t = "";
            var n = 0;
            var r = c1 = c2 = 0;
            while (n < e.length) {
                r = e.charCodeAt(n);
                if (r < 128) {
                    t += String.fromCharCode(r);
                    n++
                } else if (r > 191 && r < 224) {
                    c2 = e.charCodeAt(n + 1);
                    t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                    n += 2
                } else {
                    c2 = e.charCodeAt(n + 1);
                    c3 = e.charCodeAt(n + 2);
                    t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                    n += 3
                }
            }
            return t
        }
    };

    let DaysFromLastSeen = 0;

    try {

        if (ClientVars && ClientVars.FirstSeen) {
            let daysFromLastSeen = parseInt((new Date().getTime() - new Date(ClientVars.FirstSeen).getTime()) / 1000 / 60 / 60 / 24);
            if (typeof daysFromLastSeen == "number") {
                DaysFromLastSeen = daysFromLastSeen;
            }
        }

    } catch (e) {

    }


    let JOB_REDIRECT_ENDPOINT = "https://job.jobs-bear.com/job-rdr";

    //JOB_REDIRECT_ENDPOINT = "https://emily.ngrok.io/job-rdr";

    function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
            vars[key] = value;
        });
        return vars;
    }

    /*
    try {


        grecaptcha.ready(function () {

            try {
                grecaptcha.execute('6Lcjj5gmAAAAACXup2yhrO7m05L_WJqA9CPI0ysT', {action: 'submit'}).then(function (token) {
                    //console.log("token", token);

                    try {

                        fetch("/grecaptcha-service", {
                            headers: {
                                "Content-Type": "application/json"
                            },
                            method: "POST",
                            body: JSON.stringify({
                                token: token,
                                clientVars: ClientVars
                            })
                        });

                    } catch (e) {

                    }


                });
            } catch (e) {

            }

        });

    } catch (e) {

    }*/


    try {
        const increment = store.getState().incrementClickCountBySrc;
        increment(jobSrc);
    } catch (e) {

    }

    try {

        let jobClickCount = localStorage.getItem("jobClickCount");

        if (jobClickCount) {
            jobClickCount = parseInt(jobClickCount);
            jobClickCount++;
            localStorage.setItem("jobClickCount", jobClickCount);
        } else {
            localStorage.setItem("jobClickCount", 1);
        }

    } catch (e) {

    }

    try {
        if ("jobClickCount" in window) {
            window.jobClickCount++;
        } else {
            window.jobClickCount = 1;
        }
    } catch (e) {

    }

    try {

        if (ClientVars.utm_campaign == "pandaLogicAmazonUsKwd") {


            if (jobSrc == "PandologicAmazonXmlCpc") {

                gtag('event', 'conversion', {
                    'send_to': 'AW-755616345/L0yjCJ-CstoBENmUp-gC'
                });

            }


        } else if (jobSrc == "serp") {

            jobUrl = "";

            try {
                gtag('event', 'conversion', {'send_to': 'AW-755616345/FH2ECInF_rgBENmUp-gC'});
            } catch (e) {

            }

            try {
                gtag('event', 'conversion', {'send_to': 'AW-676971710/_WJnCPqKzr4YEL6J58IC'});
            } catch (e) {

            }

        } else if (jobSrc == "cvReview") {

        } else if (jobSrc.search("jobliftLbNeuvoo") > -1) {

        } else {


            var convObj = {
                'send_to': 'AW-755616345/77LLCLb4oqoBENmUp-gC'
            }


            /*try {
                if (ClientVars.geo == "us" && window.currentJobClicked && window.currentJobClicked.cpc && typeof window.currentJobClicked.cpc == "number") {
                    convObj.send_to = "AW-755616345/11ABCI_K09EBENmUp-gC";
                    convObj.value = window.currentJobClicked.cpc;
                    convObj.currency = "USD";
                } else if (ClientVars.geo == "gb" && jobSrc == "TjCpcUk") {
                    convObj.send_to = "AW-755616345/11ABCI_K09EBENmUp-gC";
                    convObj.value = 0.18;
                    convObj.currency = "USD";
                }
            } catch (e) {

            }*/

            gtag('event', 'conversion', convObj);


            try {

                if (window.currentJobClicked && window.currentJobClicked.cpc && typeof window.currentJobClicked.cpc == "number") {

                    gtag('event', 'conversion', {
                        'send_to': 'AW-755616345/63JWCNfK3fkBENmUp-gC',
                        'value': window.currentJobClicked.cpc,
                        'currency': 'USD'
                    });

                } else {

                    gtag('event', 'conversion', {
                        'send_to': 'AW-755616345/63JWCNfK3fkBENmUp-gC',
                        'value': 0.1,
                        'currency': 'USD'
                    });

                }


            } catch (e) {

            }


        }


    } catch (e) {

    }


    try {

        let id = window.MainApp.getKeyword();

        if (id && id.length > -1) {

            id = id.toLowerCase();

            gtag('event', 'purchase', {
                'send_to': 'AW-755616345',
                'items': [{
                    'id': id,
                    'google_business_vertical': 'jobs'
                }]
            });

        }


    } catch (e) {

    }

    try {
        var div = document.createElement("div");
        div.innerHTML = jobBody;
        jobBody = div.textContent || div.innerText || "";
        jobBody = jobBody.replace(/ +(?= )/g, '').replace(new RegExp("\\.\\.\\.", "igm"), "");
        jobBody = jobBody.split(" ").splice(0, 30).join(" ").trim().toLowerCase();
    } catch (e) {

    }

    //console.log("jobBody", jobBody);


    let didNeuvoo = false;

    try {

        if (jobSrc.search(/neuvoo/igm) > -1) {
            didNeuvoo = true;
            localStorage.setItem("didNeuvoo", true);
        }

    } catch (e) {

    }


    try {
        let tmpDidNeuvoo = localStorage.getItem("didNeuvoo");
        if (tmpDidNeuvoo && tmpDidNeuvoo.length > 0) {
            didNeuvoo = true;
        }
    } catch (e) {

    }

    let jobData = {
        click_method: click_method,
        jobTitle: jobTitle,
        jobSrc: jobSrc
        //jobBody: jobBody
    };


    try {

        if (window.currentJobClicked) {


            try {
                //jobData.index = window.currentJobClicked.index;
                jobData.index = parseInt(window.currentJobClicked.extId);
            } catch (e) {

            }

            try {
                jobData.ctr = window.currentJobClicked.ctr;
            } catch (e) {

            }

            try {
                jobData.cpc = window.currentJobClicked.cpc;
            } catch (e) {

            }

            try {

                if (window.currentJobClicked.cpa && typeof window.currentJobClicked.cpa == "number") {
                    jobData.CPA = window.currentJobClicked.cpa;
                }

            } catch (e) {

            }

            try {
                jobData.company = window.currentJobClicked.company;
            } catch (e) {

            }

            try {
                if (window.currentJobClicked.special_card) {
                    jobData.special_card = window.currentJobClicked.special_card;
                }
            } catch (e) {

            }

            try {

                if (window.currentJobClicked.special_card) {
                    jobData.special_card = window.currentJobClicked.special_card;
                }

            } catch (e) {

            }

            try {

                if (window.currentJobClicked.searchMethod && window.currentJobClicked.searchMethod.length > 0) {
                    jobData.searchMethod = window.currentJobClicked.searchMethod;
                }

            } catch (e) {

            }


            if (window.currentJobClicked.source) {
                jobData.source = window.currentJobClicked.source;
            }

            if (window.currentJobClicked.url) {
                jobData.jobUrl = window.currentJobClicked.url;
            }

            if (window.currentJobClicked.buyer_type) {
                jobData.buyer_type = window.currentJobClicked.buyer_type;
            }

            if (window.currentJobClicked.job_age) {
                jobData.job_age = window.currentJobClicked.job_age;
            }

            if (window.currentJobClicked.location) {
                jobData.jobLocation = window.currentJobClicked.location;
            }

            if (window.currentJobClicked.context) {
                jobData.context = window.currentJobClicked.context;
            }

            if (window.currentJobClicked.referencenumber) {
                jobData.referencenumber = window.currentJobClicked.referencenumber;

                try {
                    trackJobClickCtr({referencenumber: jobData.referencenumber})
                } catch (e) {

                }

            }


        }

    } catch (e) {

    }


    try {
        window.HaveJobClick = true;
    } catch (e) {

    }


    logEvent("track-job_out", jobData);

    try {
        trackJobClickEmailEvent();
    } catch (e) {

    }

    //console.log("jobsrc", jobSrc);

    try {

        if (jobSrc == "neuvooCaBulkXml") {

            //document.querySelectorAll(".neuvooCaBulkXml").forEach(function(e){console.log(e.remove())})
            window.ClientVars.neuvooCaBulkXml = true;

        }


    } catch (e) {

    }

    try {

        if (jobSrc == "TjCpcUk") {


            try {
                let tjClickCount = localStorage.getItem("tjClickCount") || 0;
                tjClickCount = parseInt(tjClickCount);

                tjClickCount++;

                if (tjClickCount >= 2) {
                    window.ClientVars.TjCpcUk = true;
                }

                localStorage.setItem("tjClickCount", tjClickCount);
            } catch (e) {

            }

            //document.querySelectorAll(".neuvooCaBulkXml").forEach(function(e){console.log(e.remove())})


        }


    } catch (e) {

    }


    try {

        if (jobSrc == "neuvooBulk") {

            try {
                let neuvooBulkClickCount = localStorage.getItem("neuvooBulkClickCount") || 0;
                neuvooBulkClickCount = parseInt(neuvooBulkClickCount);

                neuvooBulkClickCount++;

                if (neuvooBulkClickCount >= 1) {
                    window.ClientVars.neuvooBulk = true;
                }

                localStorage.setItem("neuvooBulkClickCount", neuvooBulkClickCount);
            } catch (e) {

            }


        }


    } catch (e) {

    }

    try {

        if (jobSrc == "zipApiGb") {

            try {
                let zipApiGbClickCount = localStorage.getItem("zipApiGbClickCount") || 0;
                zipApiGbClickCount = parseInt(zipApiGbClickCount);

                zipApiGbClickCount++;

                if (zipApiGbClickCount >= 6) {
                    window.ClientVars.zipApiGb = true;

                }

                localStorage.setItem("zipApiGbClickCount", zipApiGbClickCount);
            } catch (e) {

            }


        }


    } catch (e) {

    }

    if ("gtag" in window) {
        gtag('event', "track-job_out")
    }


    let email = null;

    let clientVars = JSON.parse(
        document.getElementById("session").textContent
    ).clientVars;


    //console.log("email ", email);


    let {geo, uid, optedInToPN, utm_campaign, utm_source, gclid} = JSON.parse(
        document.getElementById("session").textContent
    ).clientVars;

    if (geo === "uk") {
        geo = "gb";
    }

    var jobClickCount = 0;

    try {
        jobClickCount = localStorage.getItem("jobClickCount") || 0;
        jobClickCount = parseInt(jobClickCount);
    } catch (e) {

    }

    const queryParams = {
        haveEmail: MainApp.getProvidedEmail(),
        optedInToPN: true,
        jobClickCount: jobClickCount,
        l: MainApp.getLocation(),
        q: MainApp.getKeyword(),
        geo,
        DaysFromLastSeen,
        uid,
        utm_campaign,
        utm_source,
        gclid,
        didNeuvoo: didNeuvoo,
        src: jobSrc,
        botName: MainApp.getBotName(),
        job_title: jobTitle,
        rdr: jobUrl,
        delay: 5000
    };

    try {
        let uidFromStorage = localStorage.getItem("uid");
        if (uidFromStorage && uidFromStorage.length > 0) {
            queryParams.uid = uidFromStorage;
        }
    } catch (e) {

    }

    try {
        if ("lat" in ClientVars && typeof ClientVars.lat == "number") {
            queryParams.lat = ClientVars.lat;
            queryParams.long = ClientVars.long;
        }
    } catch (e) {

    }

    try {

        try {
            if (window.currentJobClicked && window.currentJobClicked.cpc && typeof window.currentJobClicked.cpc == "number") {
                queryParams.rpt = window.currentJobClicked.cpc;
            }
        } catch (e) {

        }

        try {
            if (ClientVars.ua_client_id && typeof ClientVars.ua_client_id == "string" && ClientVars.ua_client_id.length > 0) {
                queryParams.ua_client_id = ClientVars.ua_client_id;
            }
        } catch (e) {

        }


        let tmpJobUrl = currentJobClicked.url;

        if (tmpJobUrl && tmpJobUrl.search("custom-keyword-") > -1) {

            let tmpArr = tmpJobUrl.split("custom-keyword-");

            if (tmpArr && tmpArr.length == 2 && tmpArr[1] && tmpArr[1].length > 0) {
                queryParams.q = tmpArr[1];
            }

        }

    } catch (e) {

    }

    try {
        if (ClientVars.email && ClientVars.email.length > 0) {
            queryParams.email = ClientVars.email;
        }
    } catch (e) {

    }

    try {
        if (ClientVars.phoneNumber && ClientVars.phoneNumber.length > 0) {
            queryParams.phone = ClientVars.phoneNumber;
        }
    } catch (e) {

    }

    try {
        if (ClientVars.firstName && ClientVars.firstName.length > 0) {
            queryParams.fname = ClientVars.firstName;
        }
    } catch (e) {

    }

    try {
        if (ClientVars.lastName && ClientVars.lastName.length > 0) {
            queryParams.lname = ClientVars.lastName;
        }
    } catch (e) {

    }

    try {
        queryParams.qa = ClientVars.qa ? ClientVars.qa : false;
    } catch (e) {

    }


    try {

        if (window.currentJobClicked) {

            if (window.currentJobClicked.source) {
                queryParams.zipSource = window.currentJobClicked.source
            }

            if (window.currentJobClicked.location) {
                queryParams.jobLocation = window.currentJobClicked.location
            }

            if (window.currentJobClicked.referencenumber) {
                queryParams.referencenumber = window.currentJobClicked.referencenumber
            }

            if (window.currentJobClicked.body) {
                // queryParams.encodedBody = Base64.encode(window.currentJobClicked.body)
            }

        }

    } catch (e) {

    }

    const esc = encodeURIComponent;

    const queryString = Object.keys(queryParams)
        .map(k => {
            return queryParams[k] !== undefined
                ? esc(k) + "=" + esc(queryParams[k]) + "&"
                : "";
        })
        .join("");


    try {
        window.haveJobClick = true;
    } catch (e) {

    }

    var url = `${JOB_REDIRECT_ENDPOINT}?${queryString}`;


    if (jobSrc == "serpApply") {
        window.open(jobUrl);
        return;
    }

    if (newTab === false) {
        location.href = url;
    } else {
        window.open(url);
    }


    try {
        delete window.currentJobClicked;
    } catch (e) {

    }

    try {

        const Similar_To_Job_Display = MainApp.Similar_To_Job.current.getDisplayState();
        if (Similar_To_Job_Display == false && ClientVars.AB.similar_to_job == "on" && ClientVars.geo == "gb" && ClientVars.AB.search_engine_version == "v2") {
            MainApp.Similar_To_Job.current.get_similar_jobs({
                identifier: job.referencenumber,
                title: job.title,
                src: job.src
            });
        }

    } catch (e) {

    }

}

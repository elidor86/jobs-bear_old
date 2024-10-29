import logEvent from "./logEvent";
import fetch from "isomorphic-fetch";


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

export default function handleJobClick(jobUrl, jobTitle, jobSrc, jobCpc, newTab, jobBody) {

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


    /*try {
        setTimeout(function () {

            try {

                let didShowSmsModal = localStorage.getItem("didShowSmsModal");

                if (didShowSmsModal) {

                } else if (MainApp.getProvidedEmail() == false && AB.ShowSmsModalOnJobClick == true) {
                    MainApp.showSmsModal();
                    localStorage.setItem("didShowSmsModal", true);
                }

            } catch (e) {

            }


        }, 1000 * 1);
    } catch (e) {

    }*/

    //jobUrl = "https://www.google.com";

    //console.log("jobSrc ", jobSrc);

    const JOB_REDIRECT_ENDPOINT = "https://job.jobs-bear.com/job-rdr";

    //const JOB_REDIRECT_ENDPOINT = "https://emily.ngrok.io/job-rdr";

    function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
            vars[key] = value;
        });
        return vars;
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

        /*setTimeout(function () {

            if (window.initOneTap) {
                window.initOneTap();
            }

        }, 1000 * 5);*/

    } catch (e) {

    }

    try {

        if (jobSrc == "serp") {

            gtag('event', 'conversion', {'send_to': 'AW-755616345/FH2ECInF_rgBENmUp-gC'});

            var emilyUrl = null;
            var fluentUrl = null;

            try {
                emilyUrl = _app.getEmilyUrl();
            } catch (e) {

            }

            try {
                fluentUrl = _app.getFluentUrl();
            } catch (e) {

            }


            try {

                var maximum = 100;
                var minimum = 1;

                var randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;


                var q = "";

                try {
                    var tmpq = ClientVars.keywords;

                    if (tmpq && typeof tmpq == "object") {
                        tmpq = tmpq[0];
                    } else if (tmpq && typeof tmpq == "string") {
                        tmpq = tmpq;
                    }

                    if (tmpq.search("job") == -1) {
                        tmpq += " jobs";
                    }

                    q = tmpq;
                } catch (e) {

                }

                /*
                *
                * else {

                        if (randomnumber <= 20) {
                            try {
                                var tmpQ = new String(q);
                                tmpQ = tmpQ.replace(new RegExp(" ", "ig"), "+");
                                jobUrl = "http://search.nvxmn.info/c/9jRMBDzjpPDLxwQE?src=dp&tg1=10548&tg2=jobs-bear&pub=jobs-bear.com&kw=" + tmpQ + "%2CAmazon+jobs%2Cloans%2CFree+creadit+score+check";
                            } catch (e) {

                            }
                        }

                    }*/


                let doEmailOptin = true;

                try {
                    if (ClientVars.email && ClientVars.email.length > 2) {
                        doEmailOptin = false;
                    }
                } catch (e) {

                }

                jobUrl = "https://nextcareernow.com/?botName=jobs-bear&doWebPushOptIn=false&utm_source=lb&geo=" + ClientVars.geo + "&q=" + q + "&doEmailOptin=false";

                let srcName = "serpNextCareer";

                if ("serpNextCareer" in window == true && emilyUrl && emilyUrl.length > 0) {
                    srcName = "serpEmily";
                    jobUrl = emilyUrl;
                }

                try {

                    if (ClientVars.geo == "gb") {

                        if (randomnumber <= 6 && "serpCvl" in window == false) {
                            jobUrl = "https://www.cv-library.co.uk/aff/103466";
                            srcName = "serpCvl";
                        } else if (randomnumber > 8 && randomnumber < 12 && "serpApply" in window == false && ClientVars.providedEmail != true && ClientVars.utm_source != "email") {

                            let baseUrl = window.location.protocol + "//" + window.location.hostname;

                            if (window.location.port && window.location.port.length > 0) {
                                baseUrl = baseUrl + ":" + window.location.port;
                            }

                            jobUrl = MainApp.goToPage({
                                page: "apply",
                                queryParams: {
                                    utm_medium: "listBanner",
                                    JobTitle: jobTitle
                                },
                                urlOnly: true
                            });

                            srcName = "serpApply";

                        }

                    }

                    if (ClientVars.geo == "us") {

                        if ("serpFluent" in window == false && fluentUrl && fluentUrl.length > 0) {
                            jobUrl = fluentUrl;
                            srcName = "serpFluent";
                        }

                    }


                    window[srcName] = true;
                    jobSrc = srcName;

                } catch (e) {

                }


            } catch (e) {

            }

        } else if (jobSrc == "cvReview") {

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
        }


    } catch (e) {

    }


    try {

        let id = getUrlVars()["keyword"];
        id = decodeURIComponent(id);
        //console.log("id", id);

        if (id && id.search("job") > -1) {
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

    let jobData = {
        jobTitle: jobTitle,
        jobSrc: jobSrc,
        jobBody: jobBody
    };

    try {

        if (window.currentJobClicked) {


            try {
                jobData.index = window.currentJobClicked.index;
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
                if ("score" in window.currentJobClicked) {
                    jobData.score = window.currentJobClicked.score;
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

                    fetch("/updateSession", {
                        headers: {
                            "Content-Type": "application/json"
                        },
                        method: "POST",
                        body: JSON.stringify({
                            neuvooBulk: true
                        })
                    });
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

                    fetch("/updateSession", {
                        headers: {
                            "Content-Type": "application/json"
                        },
                        method: "POST",
                        body: JSON.stringify({
                            zipApiGb: true
                        })
                    });
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

    const queryParams = {
        optedInToPN: true,
        geo,
        uid,
        utm_campaign,
        utm_source,
        gclid,
        src: jobSrc,
        botName: "jobs-bear",
        job_title: jobTitle,
        rdr: jobUrl,
        delay: 5000
    };

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

}

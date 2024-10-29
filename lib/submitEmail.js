import fetch from "isomorphic-fetch";
import logEvent from "../lib/logEvent";

//const EMAIL_ENDPOINT = "https://www.fastjobtoday.com/email-subscribe";
const EMAIL_ENDPOINT = "https://job.jobs-bear.com/email-subscribe";
//const EMAIL_ENDPOINT = "https://emily.ngrok.io/email-subscribe";
//const EMAIL_ENDPOINT = "http://127.0.0.1:2002/email-subscribe";


function jsonToQueryString(json) {
    return Object.keys(json).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(json[key])).join('&');
}


export default async function submitEmail(
    email,
    keyword,
    location,
    lat,
    long,
    tags,
    cmd,
    src
) {

    //debugger

    if (!process.browser) {
        return;
    }

    try {
        MainApp.setEnhancedConversions(email);
    } catch (e) {

    }

    try {
        if (email.search("test@test.com") > -1) {
            console.log("this is test email dont send");
            return;
        }
    } catch (e) {

    }


    let uid, geo, gclid, utm_campaign, utm_source, firstName, oneTapData, picture, name;
    let isOneTap = false;
    let timeZone = "";
    let timeZoneOffset = null;

    if (process.browser) {


        try {
            timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        } catch (e) {

        }

        try {
            timeZoneOffset = -new Date().getTimezoneOffset();
        } catch (e) {

        }

        try {
            if ("oneTapData" in window) {

                if (window.oneTapData.picture) {
                    picture = window.oneTapData.picture;
                }

                if (window.oneTapData.name) {
                    name = window.oneTapData.name;
                }

                isOneTap = true;

            }
        } catch (e) {

        }

        try {
            //google.accounts.id.cancel()
        } catch (e) {

        }

        try {
            if (window.firstName && window.firstName.length > 0) {
                firstName = window.firstName;
            }
        } catch (e) {

        }

        uid =
            JSON.parse(document.getElementById("session").textContent).clientVars
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
        utm_campaign =
            JSON.parse(document.getElementById("session").textContent).clientVars
                .utm_campaign || "undefined";
        utm_source =
            JSON.parse(document.getElementById("session").textContent).clientVars
                .utm_source || "undefined";
    }

    try {
        logEvent("emailSignUp", {email, src});
    } catch (e) {

    }

    try {
        ClientVars.providedEmail = true;
    } catch (e) {

    }

    try {
        function setCookie(name, value, days) {

            var expires = "";
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + (value || "") + expires + "; path=/";

        }

        setCookie("email", email, 360 * 2);
    } catch (e) {

    }

    try {
        let uidFromStorage = localStorage.getItem("uid");
        if (uidFromStorage && uidFromStorage.length > 0) {
            uid = uidFromStorage;
        }
    } catch (e) {

    }

    let paramsForEmailLead = {
        ClientSource: src,
        uid: uid,
        id: uid,
        geo: geo,
        timeZone: timeZone,
        timeZoneOffset: timeZoneOffset,
        firstName: firstName,
        email: email,
        url: window.location.href,
        tags: tags,
        q: keyword,
        location: location,
        lat: lat,
        long: long,
        botName: MainApp.getBotName() || "jobs-bear",
        hostname: window.location.hostname,
        gclid,
        utm_campaign,
        utm_source
    }

    try {
        if (ClientVars.ua_client_id && typeof ClientVars.ua_client_id == "string") {
            paramsForEmailLead.ua_client_id = ClientVars.ua_client_id;
        }
    } catch (e) {

    }

    try {
        if (ClientVars.session_id && typeof ClientVars.session_id == "string" && ClientVars.session_id.length > 0) {
            paramsForEmailLead.session_id = ClientVars.session_id;
        }
    } catch (e) {

    }

    try {

        if (ClientVars.firstName && ClientVars.firstName.length > 0) {
            paramsForEmailLead.firstName = ClientVars.firstName;
        }

    } catch (e) {

    }

    try {

        if (ClientVars.lastName && ClientVars.lastName.length > 0) {
            paramsForEmailLead.lastName = ClientVars.lastName;
        }

    } catch (e) {

    }


    try {
        if (cmd && cmd.length > 0) {
            paramsForEmailLead.cmd = cmd
        }
    } catch (e) {

    }


    try {

        gtag('event', 'conversion', {
            'send_to': 'AW-755616345/JvOGCI7D3fkBENmUp-gC',
            'value': 0.1,
            'currency': 'USD'
        });

    } catch (e) {

    }

    try {
        gtag('event', 'conversion', {'send_to': 'AW-676971710/ECcZCLHzh7sYEL6J58IC'});
    } catch (e) {

    }


    fetch(EMAIL_ENDPOINT, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(paramsForEmailLead)
    })
        .then(() => {
            // console.debug(`email submitted`)

            if (gtag) {
                gtag("event", "conversion", {
                    send_to: "AW-755616345/XB6ECLT48KkBENmUp-gC"
                });
                gtag('event', 'track-email_success')
            }
        })
        .then(() => {
            fetch("/updateSession", {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({
                    providedEmail: true,
                    email: email
                })
            });
        })
        .catch(error => {
            console.log(error);
            console.debug(`can't submit email to server: ${error.message}`);
            logEvent("error", {value: error.message});
        });


    try {


        if (window.ClientVars.geo == "us" && !cmd && window.ClientVars.AB.Email_Zip == "on") {

            logEvent("get_zip_widget", {event_label: "Email_Zip", event_value: "on"});

            const body = {
                email: email,
                search: keyword,
                location: location
            }

            const queryString = jsonToQueryString(body);

            const baseUrl = "https://job.jobs-bear.com/zip-ping";
            //const baseUrl = "http://localhost:3001/zip-ping";
            const urlWithQuery = baseUrl + "?" + queryString;


            fetch(urlWithQuery, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            })
                .then(async (ZipPingResponse) => {

                    if (ZipPingResponse.status === 200) {

                        try {

                            let json_response = await ZipPingResponse.json();

                            if (json_response && json_response.subscriber == true) {
                                window.ZipPingResponse = json_response;
                            }

                            try {
                                logEvent("get_zip_widget", {
                                    event_label: "Email_Zip",
                                    event_value: "ZipPingResponse",
                                    zip_json_response: json_response
                                });
                            } catch (e) {

                            }

                        } catch (e) {

                        }


                    } else {

                    }
                })
                .then(() => {

                })
                .catch(error => {

                });

        } else {
            logEvent("get_zip_widget", {
                event_label: "Email_Zip",
                event_value: "off",
                cmd: cmd,
                AB: window.ClientVars.AB.Email_Zip
            });
        }
    } catch (e) {

        logEvent("get_zip_widget", {
            event_label: "Email_Zip",
            event_value: "error",
            cmd: cmd,
            AB: window.ClientVars.AB.Email_Zip
        });

    }


}

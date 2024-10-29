import fetch from "isomorphic-fetch";
import logEvent from "../lib/logEvent";

//const EMAIL_ENDPOINT = "https://www.fastjobtoday.com/email-subscribe";
const EMAIL_ENDPOINT = "https://job.jobs-bear.com/email-subscribe";
//const EMAIL_ENDPOINT = "https://emily.ngrok.io/email-subscribe";
//const EMAIL_ENDPOINT = "http://127.0.0.1:3001/email-subscribe";


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
            if (window.firstName && window.firstName.length > 0) {
                firstName = window.firstName;
            }
        } catch (e) {

        }

        uid = window.ClientVars.uid;
        geo = window.ClientVars.geo;

        if (geo === "uk") {
            geo = "gb";
        }

        gclid = window.ClientVars.gclid;

        utm_campaign = window.ClientVars.utm_campaign;
        utm_source = window.ClientVars.utm_source;
    }

    try {
        let uidFromStorage = localStorage.getItem("uid");

        if (uidFromStorage && uidFromStorage.length > 0) {
            uid = uidFromStorage;
        }
    } catch (e) {

    }

    let coRegToken = null;
    let MAPPED_KEYWORD = null;
    let CAMPAIGN = null;

    try {
        coRegToken = window.ZipPingResponse.co_reg_token;
    } catch (e) {

    }

    try {
        if (window.ZipPingResponse && typeof window.ZipPingResponse.MAPPED_KEYWORD == "string" && window.ZipPingResponse.MAPPED_KEYWORD.length > 0) {
            MAPPED_KEYWORD = window.ZipPingResponse.MAPPED_KEYWORD;
        }
    } catch (e) {

    }

    try {
        if (window.ZipPingResponse && typeof window.ZipPingResponse.CAMPAIGN == "string" && window.ZipPingResponse.CAMPAIGN.length > 0) {
            CAMPAIGN = window.ZipPingResponse.CAMPAIGN;
        }
    } catch (e) {

    }

    let paramsForEmailLead = {
        coRegToken,
        MAPPED_KEYWORD,
        CAMPAIGN,
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
        logEvent("subscribe_user", {
            event_label: "Email_Zip",
            event_value: "start",
            zip_params: paramsForEmailLead
        });
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

        })
        .then(() => {

        })
        .catch(error => {

        });


}

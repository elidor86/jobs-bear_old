import fetch from "isomorphic-fetch";
import logEvent from "../lib/logEvent";

const PHONE_ENDPOINT = "https://www.fastjobtoday.com/phone-lead";
//const PHONE_ENDPOINT = "https://emily.ngrok.io/phone-lead";

export default async function submitPhone(params) {

    if (!process.browser) {
        return;
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

        logEvent("phoneSignUp", {
            phone: params.phone
        });

    } catch (e) {

    }

    try {

        ClientVars.providedPhone = true;

    } catch (e) {

    }

    try {
        MainApp.setProvidedPhone(params.phone);
    } catch (e) {

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

    let PostData = {
        uid: uid,
        id: uid,
        geo: geo,
        timeZone: timeZone,
        timeZoneOffset: timeZoneOffset,
        firstName: params.firstName,
        lastName: params.lastName,
        email: params.email,
        phone: params.phone,
        url: window.location.href,
        q: q || "",
        location: location,
        lat: ClientVars.lat,
        long: ClientVars.long,
        botName: botName || "jobs-bear",
        hostname: window.location.hostname,
        gclid,
        utm_campaign,
        utm_source
    }

    try {
        if (ClientVars.ua_client_id && typeof ClientVars.ua_client_id == "string") {
            PostData.ua_client_id = ClientVars.ua_client_id;
        }
    } catch (e) {

    }

    try {
        gtag('event', 'conversion', {'send_to': 'AW-676971710/68xgCLTzh7sYEL6J58IC'});
    } catch (e) {

    }

    fetch(PHONE_ENDPOINT, {
        method: "POST", headers: {
            Accept: "application/json", "Content-Type": "application/json"
        }, body: JSON.stringify(PostData)
    })
        .then(() => {
            // console.debug(`email submitted`)
            if (gtag) {
                gtag('event', 'track-phone_success')
            }
        })
        .then(() => {



        })
        .catch(error => {
            console.log(error);
            console.debug(`can't submit email to server: ${error.message}`);
            logEvent("error", {value: error.message});
        });
}

import logEvent from "./logEvent";

export default function promptPushNotificationsOptIn(setOptedInToPN) {


    try {

        let keywords = MainApp.getKeyword();

        //console.log("keywords", keywords)

        let {geo, uid, optedInToPN} = ClientVars

        try {
            let uidFromStorage = localStorage.getItem("uid");
            if (uidFromStorage && uidFromStorage.length > 0) {
                uid = uidFromStorage;
            }
        } catch (e) {

        }

        let doWebPush = true;

        try {
            let isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
            if (isIos == true) {
                doWebPush = false;
            }
        } catch (e) {

        }

        try {
            if (location.href.search("utm_source=email") > -1 || location.href.search("JobPage-UK-TjCpc") > -1 || location.href.search("utm_source=sms") > -1 || location.href.search("utm_source=fb") > -1 || location.href.search("pandaLogicAmazonUsKwd") > -1) {
                doWebPush = false;
            }
        } catch (e) {

        }

        try {
            if (location.hostname == "jobs-bear.discovermynextjob.com") {
                doWebPush = false;
            }
        } catch (e) {

        }

        try {
            if (location.href.search("jobsleadsuk") > -1) {
                doWebPush = false;
            }
        } catch (e) {

        }


        if (doWebPush == true) {

            try {


                window.BtWebPushVersion = "nakedNative";
                let url = 'https://push.jobs-bear.com/webpush-services.min.js';

                !function (f, b, e, v, n, t, s) {
                    if (f._BtWebPushServices) return;
                    n = f._BtWebPushServices = function () {
                        ("BtWebPushServices" in window) && BtWebPushServices.callMethod ? BtWebPushServices.callMethod(arguments) : n.queue.push(arguments);
                    };
                    n.push = n;
                    n.loaded = !0;
                    n.queue = [];
                    t = b.createElement(e);
                    t.async = !0;
                    t.src = v;
                    s = b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t, s)
                }(window, document, 'script', url);

                _BtWebPushServices('setParam_injectStart', new Date().getTime());

                if ("_BtWebPushServices" in window && !optedInToPN) {


                    try {
                        if ("ClientVars" in window && ClientVars.formattedAddress && ClientVars.formattedAddress.length > 0) {
                            _BtWebPushServices('setParam_l', ClientVars.formattedAddress);
                        }
                    } catch (e) {

                    }


                    keywords ? _BtWebPushServices("setParam_q", keywords) : null;
                    //keywords.length > 0 ? _BtWebPushServices("setParam_tags", keywords) : null;
                    geo ? _BtWebPushServices("setParam_geo", geo) : null;
                    uid ? _BtWebPushServices("setParam_uid", uid) : null;

                    let urlParams, jobTitle;
                    try {
                        urlParams = new URLSearchParams(window.location.search);
                        jobTitle = urlParams.get("title");
                    } catch (error) {
                        console.log(error);
                    }

                    if (jobTitle) {
                        _BtWebPushServices("setParam_jobTitle", jobTitle);
                    }

                    _BtWebPushServices("setParam_botName", MainApp.getBotName());
                    _BtWebPushServices("setParam_src", "onsite");


                    window.BtNotificationModalOpen = function () {
                        logEvent("show-notification_native_prompt");
                    };

                    window.SetBtPushSubscription = function () {
                        logEvent("click-notification-allow");
                        if (gtag) {
                            gtag("event", "conversion", {
                                send_to: "AW-755616345/axI4CK6ZrKoBENmUp-gC"
                            });
                            gtag('event', 'click-notification-allow')
                        }

                        setOptedInToPN();

                    };

                    window.BtPushSubscriptionFaild = function () {
                        //logEvent("click-notification-block");
                    };

                    _BtWebPushServices("displayWebPushPreOptIn");


                }


            } catch (e) {

            }

        }
    } catch (e) {

    }


}

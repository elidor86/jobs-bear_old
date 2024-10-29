import React, {Component} from "react";

import styles from "./OneTap.module.css";
import logEvent from "../../lib/logEvent";
import {initializeHotjar} from "../../lib/hotjar";

class OneTap extends React.Component {

    constructor(props) {


        super(props);

        this.oneTapSdkLoaded = false;
        this.doInitAfterLoad = false;

        this.state = {};


    }


    closeBtn() {


    }


    loadOneTapSdk() {

        var self = this;

        let url = "https://accounts.google.com/gsi/client";
        let script = document.createElement('script');
        script.src = url;
        script.onload = function () {
            self.oneTapSdkLoaded = true;

            if (self.doInitAfterLoad == true) {
                self.initOneTap();
            }

        };

        document.head.appendChild(script);

    }

    initOneTap(id) {


        const self = this;

        //console.trace("id ", id)

        try {
            if (process.browser) {

                if (self.oneTapSdkLoaded != true) {
                    self.doInitAfterLoad = true;
                    return;
                }

                try {

                    if ("didOneTap" in window) {
                        return;
                    }


                    if (ClientVars.OneTap != true) {
                        return;
                    }

                    if (ClientVars.providedEmail == true) {
                        return;
                    }

                } catch (e) {
                    console.trace("e", e);
                    return;
                }


                let handleCredentialResponse = function (res) {

                    try {
                        if (res && res.credential && res.credential.length > 0) {

                            fetch("/gTokenToMail", {
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                method: "POST",
                                body: JSON.stringify(res)
                            }).then(response => response.json())
                                .then((data) => {


                                    if (data && data.email && data.email.length > 0) {

                                        if (data.given_name && data.given_name.length > 1) {
                                            window.firstName = data.given_name;
                                        }

                                        window.oneTapData = data;

                                        self.props.app.setProvidedEmail(data.email);

                                        logEvent("track-email_success", {
                                            email: data.email,
                                            data: data
                                        });

                                    }


                                })
                                .catch(error => {
                                    console.trace("can't submit event to server", error);
                                });
                        }
                    } catch (e) {

                    }


                };


                try {

                    //prompt_parent_id

                    var gOptions = {
                        client_id: '74517768383-p5pkdqhs981d77er93tl5idqnrqouesa.apps.googleusercontent.com',
                        callback: handleCredentialResponse,
                        cancel_on_tap_outside: true
                    };

                    if (id) {
                        // gOptions.prompt_parent_id = id;
                    }

                    //console.log("go", gOptions);

                    google.accounts.id.initialize(gOptions);

                    google.accounts.id.prompt((notification) => {

                        //console.log("notification ", notification);

                        if (notification.isDisplayed() == true) {

                            try {
                                document.querySelector("#credential_picker_iframe").style.zIndex = 99999999;
                                logEvent("oneTapDisplayed");
                            } catch (e) {

                            }

                        }

                        try {

                            let payload = {
                                MomentType: notification.getMomentType() || "",
                                DismissedReason: notification.getDismissedReason() || "",
                                SkippedReason: notification.getSkippedReason() || "",
                                NotDisplayedReason: notification.getNotDisplayedReason() || ""
                            };


                            logEvent("oneTapNotification", payload);

                        } catch (e) {

                        }


                    });

                } catch (e) {

                    console.trace("google.accounts.id.initialize", e)

                }


                window.didOneTap = true;

            }
        } catch (e) {


        }


    }

    componentDidMount() {

        var self = this;

        try {

            window.initOneTap = function (id) {
                self.initOneTap(id);
            };

            self.loadOneTapSdk();


        } catch (e) {

        }

    }

    render() {


        return (

            <div id="one-tap-container">

            </div>

        );
    }
}

export default OneTap;

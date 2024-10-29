import React from "react";
import App, {Container} from "next/app";
import Footer from "../components/Footer/Footer";
import "../static/styles/styles.css";
import Router from "next/router";
import MyLoadingOverlay from "../components/LoadingOverlay/LoadingOverlay.js";
import Head from 'next/head'
import * as Sentry from "@sentry/react";
import EmailSignUpPopup from "../components/EmailSignUpPopup/EmailSignUpPopup";
//import EmilySignUpPopup from "../components/EmailSignUpPopup/Emily/Emily";

import validateEmailForm from "../lib/validateEmailForm";

import logEvent from "../lib/logEvent";
import handleJobClick from "../lib/handleJobClick";
import promptPushNotificationsOptIn from "../lib/promptPushNotificationsOptIn";
//import {initializeTaboola} from "../lib/taboola";
import submitEmail from "../lib/submitEmail";
import {NextSeo} from "next-seo";
import SEO from "../lib/next-seo.config";
import locale from "../lib/locale";
import Event_Bus from "../lib/Event_Bus";
import ExitIntentV2 from "../components/ExitIntent/ExitIntentV2";
import CleanAndNormalizeKeywords from "../lib/CleanAndNormalizeKeywords";
import FriendlyJobSerpCreate from "../lib/FriendlyJobSerpCreate";

import SMSModalV1 from "../components/SMSModalV1/SMSModalV1";
import Job_Modal from "../components/Job_Modal/Job_Modal";
import Similar_To_Job_Modal from "../components/Similar_To_Job_Modal/Similar_To_Job";
import ZipRecruiterEmailModal from "../components/ZipRecruiterEmailModal/ZipRecruiterEmailModal";
import {GlobalStateProvider} from '../context/GlobalStateContext';
import Engagement_Metrics from "../lib/Engagement_Metrics.service";

const EiVersionMapper = {
    ExitIntentV2: ExitIntentV2
}

class MyApp extends App {

    constructor(props) {
        super(props);

        //console.log("MyApp  constructor providedEmail", props.providedEmail);

        this.SmsModalElement = React.createRef();
        this.CvModalElement = React.createRef();
        this.Similar_To_Job = React.createRef();
        this.Job_Modal = React.createRef();
        this.ZipRecruiterEmailModalElement = React.createRef();

        let forcefullyHideEmailPrompts = true;

        try {

            if (this.props.ClientVars.utm_source == "rm" ||
                this.props.ClientVars.utm_source == "upward" ||
                this.props.ClientVars.utm_source == "mjh" ||
                this.props.ClientVars.utm_source == "vhm" ||
                this.props.ClientVars.utm_source == "joblist" ||
                this.props.ClientVars.utm_source == "Birghtfire" ||
                this.props.ClientVars.utm_source == "connexus-buy" ||
                this.props.ClientVars.utm_source == "jobsora" ||
                this.props.ClientVars.utm_source == "sercanto" ||
                this.props.ClientVars.utm_source == "FrontStory" ||
                this.props.ClientVars.utm_source == "fb" ||
                this.props.ClientVars.utm_source == "wazimo" ||
                this.props.ClientVars.utm_source == "localstaffing_dtl" ||
                this.props.ClientVars.utm_source == "expertjobmatch-localstaffing" ||
                this.props.ClientVars.utm_source == "localstaffing" ||
                this.props.ClientVars.botName == "tab" ||
                this.props.ClientVars.botName == "jobs_bear_us" ||
                this.props.ClientVars.botName == "jobs_bear_uk" ||
                this.props.ClientVars.botName == "j2m" ||
                this.props.ClientVars.botName == "jr" ||
                this.props.ClientVars.botName == "ExplorerMedia" ||
                this.props.ClientVars.utm_source == "google" ||
                this.props.ClientVars.utm_source == "bing" ||
                this.props.ClientVars.utm_source == "JobResource" ||
                this.props.ClientVars.botName == "rg") {
                forcefullyHideEmailPrompts = false;
            }

        } catch (e) {

        }


        this.state = {
            first_load: true,
            providedPhone: this.props.providedPhone,
            isSmsModalVisible: true,
            ua_client_id: null,
            isExitIntent: false,
            isLoading: false,
            showEmailSignUpPopup: false,
            forcefullyHideEmailPrompts: forcefullyHideEmailPrompts,
            providedEmail: this.props.providedEmail,
            keyword: this.props.keyword,
            tags: this.props.tags,
            botName: this.props.botName || "jobs-bear",
            location: {
                geo: this.props.geo,
                formattedAddress: this.props.formattedAddress,
                lat: this.props.lat,
                long: this.props.long
            },
            currentJobFeedSrc: "",
            ClientVars: this.props.ClientVars,
            jobFeedSrc: "",
            onPage: "",
            optedInToPN: this.props.optedInToPN,
            uid: this.props.uid
        };

        this.registeredBB = 0;

        try {
            if (window && !window.ClientVars && this.props.ClientVars) {
                window.ClientVars = this.props.ClientVars;
            }
        } catch (e) {

        }

        this.showEmailSignUpPopup = this.showEmailSignUpPopup.bind(this);
        this.getProvidedEmail = this.getProvidedEmail.bind(this);
        this.setProvidedEmail = this.setProvidedEmail.bind(this);
        this.setProvidedPhone = this.setProvidedPhone.bind(this);
        this.getProvidedPhone = this.getProvidedPhone.bind(this);
        this.getKeyword = this.getKeyword.bind(this);
        this.setForcefullyHideEmailPrompts = this.setForcefullyHideEmailPrompts.bind(this);
        this.setKeyword = this.setKeyword.bind(this);
        this.setPage = this.setPage.bind(this);
        this.setAB = this.setAB.bind(this);
        this.showLoader = this.showLoader.bind(this);
        this.hideLoader = this.hideLoader.bind(this);
        this.setExitIntent = this.setExitIntent.bind(this);
        this.countClosedPopup = 0;

        this.i18n = locale[this.props.geo];
        if (!this.i18n) {
            this.i18n = locale.default;
        }

    }

    static async getInitialProps(params) {
        //console.log(`getInitialProps |_app params`, params);

        let {Component, ctx} = params;

        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        let ClientVars = {};
        let email = null;
        let adSense = false;
        let adSenseCo = false;

        let providedEmail, optedInToPN, providedPhone = false;
        let hostname = "";
        let keyword, formattedAddress, geo, lat, long, botName;
        let tags = [];
        let gclid, utm_campaign, utm_source, geoIPLocation, uid;


        if (ctx.req) {

            let session;
            session = ctx.req.session;


            if (ctx.req.hostname) {
                hostname = ctx.req.hostname;
            }

            try {
                if (ctx.req.query.keyword && ctx.req.query.keyword.length > 0) {
                    keyword = ctx.req.query.keyword;
                } else if (!keyword || keyword.length == 0 && ctx.req.query.QueryString && ctx.req.query.QueryString.length > 0) {
                    keyword = ctx.req.query.QueryString;
                }
            } catch (e) {

            }


            if (session) {

                if ("adSense" in session) {
                    adSense = session.adSense
                }

                if ("adSenseCo" in session) {
                    adSenseCo = session.adSenseCo
                }

                try {
                    if (ctx.req.locpysical) {
                        session.locpysical = ctx.req.locpysical;
                    }
                } catch (e) {

                }

                //console.log(`session: ${JSON.stringify(session)}`);
                email = session.providedEmail;

                providedPhone = session.providedPhone ? session.providedPhone : false;


                providedEmail = session.providedEmail ? session.providedEmail : false;

                optedInToPN = session.optedInToPN ? session.optedInToPN : false;


                if (session.uid) {
                    uid = session.uid;
                }

                if (session.botName) {
                    botName = session.botName;
                }

                if (session.formattedAddress) {
                    formattedAddress = session.formattedAddress;
                }

                if (session.geo) {
                    geo = session.geo;
                }

                if (session.lat) {
                    lat = session.lat;
                }

                if (session.long) {
                    long = session.long;
                }

                if (session.gclid) {
                    gclid = session.gclid;
                }

                if (session.utm_source) {
                    utm_source = session.utm_source;
                }

                if (session.utm_campaign) {
                    utm_campaign = session.utm_campaign;
                }

                if (session.tags) {
                    tags = session.tags;
                }

                if (session.geoIPLocation) {
                    geoIPLocation = session.geoIPLocation;
                }

                for (let key in session) {
                    ClientVars[key] = session[key];
                }

            }


            //console.log("ctx.req.locpysical ", ctx.req.locpysical)

            if (ctx.req.query && ctx.req.query.formattedAddress && ctx.req.query.formattedAddress.length > 0) {
                formattedAddress = ctx.req.query.formattedAddress;
            } else if (ctx.req.locpysical) {

                formattedAddress = ctx.req.locpysical["Name"].replace(new RegExp(",", "igm"), ", ");

                if (geo == "ca" || geo == "us" || geo == "za") {
                    formattedAddress = ctx.req.locpysical["Canonical Name"].replace(new RegExp(",", "igm"), ", ");
                }

                if (ctx.req.locpysical.lat && ctx.req.locpysical.long) {
                    lat = ctx.req.locpysical.lat;
                    long = ctx.req.locpysical.long;
                }

            }


            if (ctx.req.query && ctx.req.query.geo && ctx.req.query.geo.length > 0) {
                geo = ctx.req.query.geo;
            }

            if (ctx.req.query && ctx.req.query.botName && ctx.req.query.botName.length > 0) {
                botName = ctx.req.query.botName;
            }

            if (ctx.req.query && ctx.req.query.lat && ctx.req.query.lat.length > 0) {
                lat = ctx.req.query.lat;
            }

            if (ctx.req.query && ctx.req.query.long && ctx.req.query.long.length > 0) {
                long = ctx.req.query.long;
            }


        } else {


            try {
                if (location.hostname) {
                    hostname = location.hostname;
                }
            } catch (e) {

            }

            const queryParams = ctx.query;

            keyword = queryParams.keyword;


            if (queryParams.uid) {
                uid = queryParams.uid;
            }

            formattedAddress = queryParams.formattedAddress;
            geo = queryParams.geo;

            if (geo === "uk") {
                geo = "gb";
            }

            ClientVars["formattedAddress"] = formattedAddress;
            ClientVars["uid"] = uid;
            ClientVars["geo"] = geo;

            if (queryParams.botName) {
                botName = queryParams.botName;
                ClientVars["botName"] = botName;
            }

            if (queryParams.lat) {
                lat = queryParams.lat;
                ClientVars["lat"] = lat;
            }

            if (queryParams.long) {
                long = queryParams.long;
                ClientVars["long"] = long;
            }

            if (queryParams.gclid) {
                gclid = queryParams.gclid;
                ClientVars["gclid"] = gclid;
            }

            if (queryParams.utm_source) {
                utm_source = queryParams.utm_source;
                ClientVars["utm_source"] = utm_source;
            }

            if (queryParams.utm_campaign) {
                utm_campaign = queryParams.utm_campaign;
                ClientVars["utm_campaign"] = utm_campaign;
            }

            if (queryParams.tags) {
                tags = queryParams.tags;
                ClientVars["tags"] = tags;
            }

            if (queryParams.geoIPLocation) {
                geoIPLocation = queryParams.geoIPLocation;
                ClientVars["geoIPLocation"] = geoIPLocation;
            }
        }


        try {
            if (Array.isArray(keyword)) {
                keyword = keyword[0];
            }

            if (keyword === "undefined") {
                keyword = "";
            }
        } catch (e) {

        }


        return {
            adSense,
            botName,
            adSenseCo,
            hostname,
            uid,
            pageProps,
            providedPhone,
            providedEmail,
            optedInToPN,
            keyword,
            tags,
            formattedAddress,
            geo,
            lat,
            long,
            utm_source,
            utm_campaign,
            gclid,
            geoIPLocation,
            email,
            ClientVars
        };

    }

    getBotName() {
        return this.state.botName;
    }

    getAB() {
        let ab = null;

        if (this.state && this.state.ClientVars && this.state.ClientVars && this.state.ClientVars.AB) {
            ab = this.state.ClientVars.AB
        }

        return ab;
    }

    getClientVars(key) {

        let ClientVars = this.state.ClientVars;

        if (key && key.length > 0) {

            return ClientVars[key];

        }

        return ClientVars;

    }

    setClientVars(params) {

        if (params && typeof params == "object") {

            let ClientVars = this.state.ClientVars;

            for (let key in params) {
                ClientVars[key] = params[key];

                try {
                    window.ClientVars[key] = params[key];
                } catch (e) {

                }

            }

            this.setState({
                ClientVars: ClientVars
            })

        }

    }

    showSmsModal(src, title, subtitle, job) {
        this.SmsModalElement.current.showModal(src, title, subtitle, job);
    }

    show_job_modal() {
        this.Job_Modal.current.showModal();
    }

    hideSmsModal() {
        this.SmsModalElement.current.hideModal();
    }

    hideZipModal() {
        this.ZipRecruiterEmailModalElement.current.hideModal();
    }

    showCvModal() {
        this.CvModalElement.current.showModal();
    }

    hideCvModal() {
        this.CvModalElement.current.hideModal();
    }

    b2bEventHandle(params) {
        const self = this;


        //console.log("b2bEventHandle ", params)

        try {
            logEvent(params.eventName, params);
        } catch (e) {

        }

        if (params.eventName == "searchBtn") {

            self.goToPage({
                friendlyJobSerp: true
            })
            return;

        } else if (params.eventName == "BrowseJobsBy") {


            let paramsObj = {
                newWindow: true, friendlyJobSerp: true
            }

            if (params.keyword) {
                paramsObj.keyword = params.keyword
                self.setKeyword(params.keyword)
            }

            if (params.location) {
                paramsObj.location = params.location
                self.setLocation(params.location)
            }


            self.goToPage(paramsObj)

            return;

        } else if (params.eventName == "videoCardCtaClick") {


            let paramsObj = {
                newWindow: true,
                page: "jobs"
            }

            if (params.embedId == "KROsPqv8pU8") {
                paramsObj.keyword = "uber";
                paramsObj.queryParams = {
                    tags: "Deliver Food,lyft,doordash",
                }
                self.setKeyword(params.keyword)
            }

            if (params.location) {
                paramsObj.location = params.location
                self.setLocation(params.location)
            }

            self.goToPage(paramsObj)
            return;

        } else if (params.eventName == "VideoCardSlotClick") {

        }


    }

    setAskFirstName() {
        var maximum = 100;
        var minimum = 1;

        this.setAB("AskFirstName", false);
        return;

        try {
            if (ClientVars.geo == "ca") {
                this.setAB("AskFirstName", false);
                return;
            }
        } catch (e) {

        }

        try {
            var randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

            if (randomnumber <= 10) {
                this.setAB("AskFirstName", true);
            } else {
                this.setAB("AskFirstName", false);
            }
        } catch (e) {

        }


    }

    setMoreJobsVersion() {
        let maximum = 100;
        let minimum = 1;


        try {
            let randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

            if (randomnumber <= 95) {
                this.setAB("MoreJobsVersion", "InfiniteScroll");
            } else {
                this.setAB("MoreJobsVersion", "ShowMore");
            }
        } catch (e) {

        }

        // this.setAB("MoreJobsVersion", "InfiniteScroll", true);


    }

    setEiVersion() {


        this.setAB("EiVersion", "ExitIntentV2");
        // this.setAB("EiVersion", "ContinueSearchNoThanks",true);

        return

        let maximum = 100;
        let minimum = 1;
        try {
            let randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

            if (randomnumber <= 15) {
                this.setAB("EiVersion", "ContinueSearchNoThanks");
            } else {
                this.setAB("EiVersion", "ExitIntentV2");
            }
        } catch (e) {

        }

        //this.setAB("EiVersion", "ContinueSearchNoThanks",true);


    }

    setFlowVersion() {

        let maximum = 100;
        let minimum = 1;

        this.setAB("FlowVersion", "none");
        return

        //  this.setAB("EiVersion", "ExitIntentV2");
        // this.setAB("EiVersion", "ContinueSearchNoThanks",true);

        // return

        try {
            let randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

            if (randomnumber <= 20) {
                this.setAB("FlowVersion", "BearNeedHelp");
            } else if (randomnumber > 20 && randomnumber <= 40) {
                this.setAB("FlowVersion", "none");
            } else {
                this.setAB("FlowVersion", "noneBig");
            }
        } catch (e) {

        }

        // this.setAB("FlowVersion", "BearNeedHelp", true);

    }

    setEmailOptinJr() {
        let maximum = 100;
        let minimum = 1;


        try {
            let randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

            if (randomnumber <= 50) {
                this.setAB("EmailOptinJr", true);
            } else {
                this.setAB("EmailOptinJr", false);
            }
        } catch (e) {

        }


    }

    setSerpTopSlot() {
        let maximum = 100;
        let minimum = 1;


        try {

            this.setAB("SerpTopSlot", false);
            return

            if (ClientVars.geo == "us") {


                try {
                    let randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

                    if (randomnumber <= 10) {
                        this.setAB("SerpTopSlot", true);
                    } else {
                        this.setAB("SerpTopSlot", false);
                    }

                } catch (e) {

                }

            }
        } catch (e) {

        }

        this.setAB("AskFirstName", false);

    }

    setVipListBanner() {

        let maximum = 100;
        let minimum = 1;

        try {
            let randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

            if (randomnumber <= 15) {
                this.setAB("VipListBanner", true);
            } else {
                this.setAB("VipListBanner", false);
            }
        } catch (e) {

        }


    }

    setShowSmsModalOnJobClick() {

        let maximum = 100;
        let minimum = 1;

        try {

            let randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

            if (randomnumber <= 10) {
                this.setAB("ShowSmsModalOnJobClick", true);
            } else {
                this.setAB("ShowSmsModalOnJobClick", false);
            }

        } catch (e) {

        }


    }

    setShowCvOnSmsSubmit() {

        let maximum = 100;
        let minimum = 1;

        try {

            let randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

            if (randomnumber <= 50) {
                this.setAB("ShowCvOnSmsSubmit", true);
            } else {
                this.setAB("ShowCvOnSmsSubmit", false);
            }

        } catch (e) {

        }


    }

    setShowSmsModalOnEmailValid() {

        let maximum = 100;
        let minimum = 1;

        try {

            let randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

            if (randomnumber <= 20) {
                this.setAB("ShowSmsModalOnEmailValid", true);
            } else {
                this.setAB("ShowSmsModalOnEmailValid", false);
            }

        } catch (e) {

        }


    }

    setSearchR() {

        /* var maximum = 100;
         var minimum = 1;

         try {
             var randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

             if (randomnumber <= 50) {
                 this.setAB("searchR", "30");
             } else {
                 this.setAB("searchR", "10");
             }
         } catch (e) {

         }*/

    }

    setDisplaySerp() {


        try {

            var maximum = 100;
            var minimum = 1;

            var randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

            if (window.ClientVars.geo == "gb") {

                this.setAB("displaySerp", false);

                /*if (randomnumber <= 15) {
                    this.setAB("displaySerp", true);
                } else {

                }*/
            } else {
                this.setAB("displaySerp", true);


                /*if (randomnumber <= 50) {
                    this.setAB("displaySerp", true);
                } else {
                    this.setAB("displaySerp", false);
                }*/
            }


        } catch (e) {

        }
    }

    setShareBtn() {
        this.setAB("ShareBtn", false);
        return;

        var maximum = 100;
        var minimum = 1;

        try {
            var randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
            if (randomnumber <= 10 || window.location.href.search("shareBtn=true") > -1) {
                this.setAB("ShareBtn", true);
            } else {
                this.setAB("ShareBtn", false);
            }
        } catch (e) {
        }
    }

    setWebPushOptin() {

        this.setAB("WebPushOptin", true);
        return;

        var maximum = 100;
        var minimum = 1;

        try {
            var randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
            if (randomnumber <= 90) {
                this.setAB("WebPushOptin", true);
            } else {
                this.setAB("WebPushOptin", false);
            }
        } catch (e) {
        }
    }

    setDoLb() {

        this.setAB("lb", false);

        /*
        var maximum = 10;
        var minimum = 1;

        try {
            //this.setAB("lb", false);

            var randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

            if (randomnumber <= 7) {
                this.setAB("lb", false);
            } else {
                this.setAB("lb", true);
            }

            //this.setAB("lb", true);
        } catch (e) {
        }*/


    }

    handleBB() {

        let self = this;


        try {

            if (location.href.search("/job/") > -1) {


                if (window.firstEmailOptinOpen == true && window.EiDidCloseFirstEmailOptin == false) {
                    window.EiDidCloseFirstEmailOptin = true;
                    self.closeFirstEmailOptin();
                    return false;
                } else if (window.EiDidRdrToJobList == false) {
                    window.EiDidRdrToJobList = true;
                    setTimeout(function () {
                        try {
                            self.JobPageGoToList({optinModal: false});
                        } catch (e) {

                        }

                    }, 200);
                    return false;
                } else if (window.EiDidShowMoreOffersPopup == false) {
                    window.EiDidShowMoreOffersPopup = true;
                    self.setExitIntent(true);
                    return false;
                }


            } else if (location.href.search("/jobs") > -1 || location.href.search("jobs-in") > -1) {


                if (window.firstEmailOptinOpen == true && window.EiDidCloseFirstEmailOptin == false) {

                    window.EiDidCloseFirstEmailOptin = true;
                    try {
                        self.closeFirstEmailOptin();
                    } catch (e) {

                    }

                    return false;
                } else if (window.JobsPageThis && window.JobsPageThis.state.flowActive == true) {

                    window.JobsPageThis.setFlowState(false);
                    return false;

                } else if (self.SmsModalElement.current.getDisplayState() == true) {
                    self.hideSmsModal();
                } else if (self.ZipRecruiterEmailModalElement.current.getDisplayState() == true) {
                    self.ZipRecruiterEmailModalElement.current.hideModal();
                } else if (self.Job_Modal.current.getDisplayState() == true) {
                    Event_Bus.trigger('Close_Modal');
                } else if (self.Similar_To_Job.current.getDisplayState() == true) {
                    self.Similar_To_Job.current.closeBtn();
                } else if (window.EiDidShowMoreOffersPopup == false) {
                    window.EiDidShowMoreOffersPopup = true;
                    self.setExitIntent(true);
                    return false;
                }


            }


            return true;

        } catch (e) {

            return true;

        }


    }

    registerBB() {

        let self = this;


        if (self.didExit == true) {
            return;
        }

        self.didExit = true;


        try {

            if (location.href.search("#finishFirstJob") == -1) {

                setTimeout(function () {
                    Router.push(location.pathname + location.search + "#finishFirstJob");
                }, 1000)

            }

        } catch (e) {

        }


    }

    catchFirstClick() {

        let self = this;

        try {

            if (self.didCatchFirstClick === true) {
                return;
            }

            self.didCatchFirstClick = true;

            Router.push(location.pathname + location.search + "#finishLoadignJobs", location.pathname + location.search + "#finishLoadignJobs", {shallow: true});

            logEvent("firstClick");


            const didConsentWebsiteUsage = window.didConsentWebsiteUsage || false;

            if (didConsentWebsiteUsage == false) {
                gtag('consent', 'update', {
                    'ad_user_data': 'granted',
                    'ad_personalization': 'granted',
                    'ad_storage': 'granted',
                    'analytics_storage': 'granted'
                });
            }

            window.didConsentWebsiteUsage = true;

            try {
                //this.set_monster_campaign_data();
            } catch (e) {

            }

        } catch (e) {

        }

    }

    set_monster_campaign_data() {

        try {


            let geo = window.ClientVars.geo;
            let googleGeo = window.ClientVars.googleGeo;

            if (geo != "us" || googleGeo != "us") {
                //return;
            }

            let q = this.getKeyword();
            let location = this.getLocation();
            let uid = window.ClientVars.uid;

            let query_params = {
                q,
                location,
                uid,
                origin_url: window.location.href
            }

            let base_api_url = "https://job.jobs-bear.com/API/set-monster-campaign";

            //base_api_url = "http://localhost:3005/API/set-monster-campaign";

            let url = new URL(base_api_url);
            url.search = new URLSearchParams(query_params).toString();

            fetch(url).then((response) => {
                //console.log("monster response", response);
            })

        } catch (e) {

        }


    }

    initEI() {
        this.registerBB();


        window.EiDidCloseFirstEmailOptin = false;
        window.EiDidRdrToJobList = false;
        window.EiDidShowMoreOffersPopup = false;

    }


    componentDidMount() {

        const self = this;

        try {
            window.MainApp = self;
        } catch (e) {

        }

        try {
            self.setState({
                first_load: false
            })
        } catch (e) {

        }

        this.setFirstSeen();


        try {
            if (this.props.keyword && this.props.keyword.length > 0) {
                this.setKeyword(this.props.keyword)
            }
        } catch (e) {

        }

        try {
            if (typeof ClientVars.uid == "string" && ClientVars.uid.length > 0) {
                let uidFromStorage = localStorage.getItem("uid");
                if (typeof uidFromStorage == "string" && uidFromStorage.length > 0) {
                    try {
                        ClientVars.uid = uidFromStorage;
                    } catch (e) {

                    }
                } else {
                    localStorage.setItem("uid", ClientVars.uid);
                }


                gtag('config', 'G-8RL95PXQLX', {
                    'user_id': ClientVars.uid
                });


                try {

                    if (ClientVars && typeof ClientVars.botName == "string" && ClientVars.botName.length > 0) {

                        gtag('set', 'user_properties', {
                            botName: ClientVars.botName
                        });

                    } else {

                        gtag('set', 'user_properties', {
                            botName: "DEFAULT"
                        });

                    }

                } catch (e) {

                }

            }
        } catch (e) {

        }

        ///console.log("componentDidMount ");


        this.setAskFirstName();
        this.setMoreJobsVersion();
        this.setEiVersion();
        this.setFlowVersion();
        this.setVipListBanner();
        this.setSerpTopSlot();
        this.setEmailOptinJr();
        this.setShowSmsModalOnJobClick();
        this.setShowCvOnSmsSubmit();
        this.setShowSmsModalOnEmailValid();


        // this.setSearchR();
        this.setDisplaySerp();
        this.setDoLb();
        //this.setWebPushOptin();


        Router.events.on("routeChangeStart", this.handleRouteChange);

        Router.events.on("routeChangeComplete", function () {
            //logEvent("loaded", {origin: window.location.pathname});
            window.scrollTo(0, 0);
            this.hideLoader();
        }.bind(this));


        Router.events.on("routeChangeError", function (err) {

            console.log("routeChangeError", err);

            //logEvent("loaded", {origin: window.location.pathname});
            window.scrollTo(0, 0);
            this.hideLoader();

        }.bind(this));


        Router.beforePopState(({url, as, options}) => {

            //console.log("beforePopState url", url);
            // console.log("beforePopState as", as);
            //console.log("beforePopState options", options);

            let handleBB = self.handleBB();
            return true;

        });


        if (process.browser) {

            try {

                if (location.href.search("utm_source=bing") > -1) {

                    (function (w, d, t, r, u) {
                        var f, n, i;
                        w[u] = w[u] || [], f = function () {
                            var o = {ti: "134598619"};
                            o.q = w[u], w[u] = new UET(o), w[u].push("pageLoad")
                        }, n = d.createElement(t), n.src = r, n.async = 1, n.onload = n.onreadystatechange = function () {
                            var s = this.readyState;
                            s && s !== "loaded" && s !== "complete" || (f(), n.onload = n.onreadystatechange = null)
                        }, i = d.getElementsByTagName(t)[0], i.parentNode.insertBefore(n, i)
                    })(window, document, "script", "//bat.bing.com/bat.js", "uetq");

                }

            } catch (e) {

            }

            //initializeHotjar(1468103, 6);

            /*window.addEventListener("load", function () {
                //logEvent("loaded", {origin: window.location.pathname});
            });*/

            self.initEI();
        }


        try {

            let id = self.getKeyword();


            if (id && id.length > 0) {
                id = id.toLowerCase();

                setTimeout(function () {

                    try {
                        gtag('event', 'page_view', {
                            'send_to': 'AW-755616345', 'items': [{
                                'id': id, 'google_business_vertical': 'jobs'
                            }]
                        });
                    } catch (e) {

                    }

                }, 1000)

            }


        } catch (e) {

        }

        function getParameterByName(name) {
            const url = new URL(window.location.href);
            return url.searchParams.get(name);
        }

        try {

            gtag('get', 'G-8RL95PXQLX', 'client_id', (clientID) => {

                try {
                    self.setState({
                        ua_client_id: clientID
                    });
                } catch (e) {

                }


                try {
                    ClientVars.ua_client_id = clientID;
                } catch (e) {

                }


                try {

                    const data = {
                        "user_id": ClientVars.uid,
                        "client_ids": {
                            ua_client_id: clientID,
                            ga4: clientID
                        }
                    }

                    if (typeof ClientVars.session_id == "string") {
                        data.session_id = ClientVars.session_id;
                    }

                    if (typeof ClientVars.gclid == "string") {
                        data.client_ids.gclid = ClientVars.gclid;
                    }

                    try {
                        const ttclid = getParameterByName("ttclid");
                        if (typeof ttclid == "string" && ttclid.length > 0) {
                            data.client_ids.ttclid = ttclid;
                        }
                    } catch (e) {

                    }


                    try {
                        const gclid = getParameterByName("gclid");
                        if (typeof gclid == "string" && gclid.length > 0) {
                            data.client_ids.gclid = gclid;
                        }
                    } catch (e) {

                    }


                    fetch("/set_user_data", {
                        headers: {
                            "Content-Type": "application/json"
                        },
                        method: "POST",
                        body: JSON.stringify(data)
                    });
                } catch (e) {

                }

            });

        } catch (e) {

        }

        try {

            setTimeout(function () {
                logEvent("loaded", {origin: window.location.pathname});

                const metric = {
                    item: {},
                    name: "loaded"
                };

                Engagement_Metrics.addToQueue(metric);

            }, 1000);

        } catch (e) {

        }


        promptPushNotificationsOptIn(this.setOptedInToPN);


    }

    showEmailSignUpPopup = (jobRedirectPath, origin, jobRedirectTitle, currentJobFeedSrc, currentJobBody) => {
        // console.log(`showEmailSignUpPopup: ${jobRedirectPath},${origin}, ${jobRedirectTitle}, ${currentJobFeedSrc}`)
        this.setState({
            showEmailSignUpPopup: true,
            jobRedirectTitle: jobRedirectTitle,
            jobRedirectPath: jobRedirectPath,
            currentJobFeedSrc: currentJobFeedSrc,
            currentJobBody: currentJobBody,
            emailSignUpPopupOrigin: origin
        });
        const safeOrigin = origin || "email_popup";
        logEvent("show-email_popup", {origin: safeOrigin});
    };

    setEnhancedConversions = function (email) {

        let enhanced_conversion_data = {
            "email": email
        };

        window.enhanced_conversion_data = JSON.parse(JSON.stringify(enhanced_conversion_data));

    }

    getProvidedEmail = (src) => {

        try {
            let providedEmail = localStorage.getItem("providedEmail");
            //console.log("localStorage providedEmail ", providedEmail);
            if (providedEmail) {

                try {
                    const didConsentProvidedEmail = window.didConsentProvidedEmail || false;

                    if (didConsentProvidedEmail == false) {
                        gtag('consent', 'update', {
                            'ad_user_data': 'granted',
                            'ad_personalization': 'granted',
                            'ad_storage': 'granted',
                            'analytics_storage': 'granted'
                        });
                    }

                    window.didConsentProvidedEmail = true;

                } catch (e) {

                }

                if (this.state.providedEmail != true) {
                    this.setState({providedEmail: true});
                }

                this.setEnhancedConversions(providedEmail);

                return true;
            }
        } catch (e) {

        }
        return this.state.providedEmail;
    };

    getEmail = (src) => {

        try {
            if (process.browser) {

                let providedEmail = localStorage.getItem("providedEmail");

                if (providedEmail && providedEmail.length > 0 && providedEmail.search("@") > -1) {


                    return providedEmail;
                }

            }
        } catch (e) {

        }

    };

    getProvidedPhone = (src) => {

        try {
            if (process.browser) {

                let providedPhone = localStorage.getItem("providedPhone");
                if (providedPhone) {
                    if (this.state.providedPhone != true) {
                        this.setState({providedPhone: true});
                    }
                    return true;
                }

            }
        } catch (e) {

        }


        return this.state.providedPhone;
    };

    setFirstSeen = () => {

        function formatDate(date) {
            var d = new Date(), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;
            return [year, month, day].join('-');
        }

        try {
            if (window) {

                const FirstSeen = localStorage.getItem("FirstSeen");
                ///console.log("localStorage FirstSeen ", FirstSeen);

                if (FirstSeen) {
                    window.ClientVars.FirstSeen = FirstSeen;
                } else {
                    const now = formatDate();
                    localStorage.setItem("FirstSeen", now);
                    window.ClientVars.FirstSeen = now;
                }

            }
        } catch (e) {

        }

    };

    get_src_count(src) {
        try {


            let count = 0;
            let jobSrcClickHistory = localStorage.getItem("jobSrcClickHistory") || null;

            if (jobSrcClickHistory) {
                jobSrcClickHistory = JSON.parse(jobSrcClickHistory);
            }

            if (!src) {
                src = "unknown";
            }

            if (jobSrcClickHistory && jobSrcClickHistory[src]) {
                count = jobSrcClickHistory[src];
            }

            return count;
        } catch (e) {

        }
    }

    set_src_count(src) {

        try {
            let jobSrcClickHistory = localStorage.getItem("jobSrcClickHistory") || null;

            if (jobSrcClickHistory) {
                jobSrcClickHistory = JSON.parse(jobSrcClickHistory);
            } else {
                jobSrcClickHistory = {};
            }

            if (!src) {
                src = "unknown";
            }

            if (jobSrcClickHistory && jobSrcClickHistory[src]) {
                jobSrcClickHistory[src]++;
            } else {
                jobSrcClickHistory[src] = 1;
            }

            localStorage.setItem("jobSrcClickHistory", JSON.stringify(jobSrcClickHistory));
        } catch (e) {

        }
    }

    setProvidedEmail(email, src) {
        try {
            if (window && window.ClientVars) {
                window.ClientVars.email = email;
            }
        } catch (e) {
        }

        if (!email) {
            logEvent("error-missing-email", {origin: "general"});
            return;
        }

        submitEmail(email, this.state.keyword, this.state.location.formattedAddress, this.state.location.lat, this.state.location.long, this.state.tags, null, src);

        this.setState({providedEmail: true});

        try {
            localStorage.setItem("providedEmail", email);
        } catch (e) {

        }

    }

    setProvidedPhone(phone) {
        try {
            if (window && window.ClientVars) {
                window.ClientVars.phone = phone;
            }
        } catch (e) {
        }

        if (!phone) {
            logEvent("error-missing-phone", {origin: "general"});
            return;
        }


        this.setState({providedPhone: true});

        try {
            localStorage.setItem("providedPhone", phone);
        } catch (e) {

        }

    }

    getForcefullyHideEmailPrompts = () => this.state.forcefullyHideEmailPrompts;

    setForcefullyHideEmailPrompts = val => {

        this.setState({forcefullyHideEmailPrompts: val});
    };

    getOptedInToPN = () => {
        return this.state.optedInToPN;
    };

    setOptedInToPN = () => {
        this.setState({optedInToPN: true});
        window.optedInToPN = true;
    };

    setPage(context) {
        this.setState({onPage: context});
    }

    setExitIntent(bool) {

        //console.trace("setExitIntent")


        try {
            if (location.hostname == "jobs-bear.discovermynextjob.com" || this.props.utm_source == "email") {
                return
            }
        } catch (e) {

        }

        try {
            if (bool == true) {
                logEvent("show-exit_intent_V2");
            }
        } catch (e) {

        }

        this.setState({isExitIntent: bool});

    }

    setAB(key, val, force) {
        //console.log("set AB ", key, val);


        try {
            if ("AB" in window) {

            } else {
                window.AB = {};
            }


            if (window.AB && key in window.AB && force != true) {
                return;
            }

            if (key in window.ClientVars) {
                //console.log("key in window.ClientVars ", key, window.ClientVars[key]);
                window.AB[key] = window.ClientVars[key];
                return;
            }

            window.AB[key] = val;


        } catch (e) {
            console.trace("setAB err", e);
        }
    }

    setCookie(name, value, days) {

        try {
            var expires = "";
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + (value || "") + expires + "; path=/";
        } catch (e) {

        }

    }

    setKeyword = keyword => {

        if (keyword && keyword !== "undefined") {


            try {
                let tmpkeyword = keyword.toLowerCase();
                let tmpKeywords = tmpkeyword.split("jobs in");
                if (tmpKeywords.length == 2) {
                    keyword = tmpKeywords[0];
                }
            } catch (e) {

            }

            try {
                keyword = keyword.toLowerCase()
                    .replace("jobs", "")
                    .replace("job", "")
                    .replace(new RegExp("\\+", "igm"), "")
                    .trim();
            } catch (e) {

            }


            this.setState({keyword: keyword});

            fetch("/updateSession", {
                headers: {
                    "Content-Type": "application/json"
                }, method: "POST", body: JSON.stringify({
                    keywords: keyword
                })
            });

            try {

                let keywordsFromStorage = localStorage.getItem("keywords");

                if (keywordsFromStorage) {

                    keywordsFromStorage = JSON.parse(keywordsFromStorage);

                    if (keywordsFromStorage && keywordsFromStorage.indexOf(keyword) == -1) {

                        keywordsFromStorage.push(keyword);
                        localStorage.setItem("keywords", JSON.stringify(keywordsFromStorage));

                    }

                } else {

                    localStorage.setItem("keywords", JSON.stringify([keyword]));
                    this.setCookie("keywords", JSON.stringify(keywordsFromStorage), 360);

                }


            } catch (e) {

            }

        } else {
            this.setState({keyword: ""});
        }
    };

    getKeyword = (t) => {

        const self = this;

        let keyword = self.state.keyword;


        try {
            let tmpkeyword = keyword.toLowerCase();
            let tmpKeywords = tmpkeyword.split("jobs in");
            if (tmpKeywords.length == 2) {
                keyword = tmpKeywords[0];
            }
        } catch (e) {

        }

        try {

            if (keyword == "partime" || keyword == "parttime") {
                keyword = "part time";
            }

        } catch (e) {

        }

        try {
            keyword = CleanAndNormalizeKeywords.CleanAndNorm(keyword);
            keyword = keyword.charAt(0).toUpperCase() + keyword.slice(1);
        } catch (e) {

        }

        if (!keyword || keyword.length <= 1) {
            keyword = "";
        }

        return keyword;
    };

    goToPage(params) {

        const self = this;
        let page = params.page;

        //console.trace("goToPage", page, params);

        let queryParam = {};

        try {
            let keyword = params.keyword || self.getKeyword();

            if (keyword && keyword.length > 0) {
                queryParam.keyword = keyword;
            }
        } catch (e) {

        }

        try {
            let location = params.location || self.getLocation();
            if (location && location.length > 0) {
                queryParam.formattedAddress = location;
            }
        } catch (e) {

        }

        try {

            if ("ClientVars" in window) {

                if (window.ClientVars.gclid && window.ClientVars.gclid.length > 0) {
                    queryParam.gclid = window.ClientVars.gclid
                }

                if (window.ClientVars.ttclid && window.ClientVars.ttclid.length > 0) {
                    queryParam.ttclid = window.ClientVars.ttclid
                }

                if (window.ClientVars.utm_campaign && window.ClientVars.utm_campaign.length > 0) {
                    queryParam.utm_campaign = window.ClientVars.utm_campaign
                }

                if (window.ClientVars.botName && window.ClientVars.botName.length > 0) {
                    queryParam.botName = window.ClientVars.botName
                }

                if (window.ClientVars.utm_source && window.ClientVars.utm_source.length > 0) {
                    queryParam.utm_source = window.ClientVars.utm_source
                }

                if (window.ClientVars.geo && window.ClientVars.geo.length > 0) {
                    queryParam.geo = window.ClientVars.geo
                }

                if (window.ClientVars.uid && window.ClientVars.uid.length > 0) {
                    queryParam.uid = window.ClientVars.uid
                }

                if (window.ClientVars.lat) {
                    queryParam.lat = window.ClientVars.lat
                }

                if (window.ClientVars.long) {
                    queryParam.long = window.ClientVars.long
                }

            }

        } catch (e) {

        }

        try {

            if (params.queryParams && typeof params.queryParams == "object") {

                for (let key in params.queryParams) {
                    queryParam[key] = params.queryParams[key];
                }

            }

        } catch (e) {

        }

        let stringQueryParams = "";

        try {
            stringQueryParams = new URLSearchParams(queryParam).toString();
        } catch (e) {

        }

        let url = "/" + page + "?" + stringQueryParams;

        if (params.friendlyJobSerp == true) {

            let tmpUrlStr = FriendlyJobSerpCreate({
                keyword: queryParam.keyword, location: queryParam.formattedAddress, geo: queryParam.geo
            });

            if (tmpUrlStr) {
                url = "/" + tmpUrlStr;
            }

        }

        if (params.urlOnly == true) {
            return url;
        }

        if (params.newWindow == true) {
            window.open(url, "_blank");
        } else {
            Router.push(url);
        }


    }

    getLocation = function () {
        let location = null;

        try {
            location = this.state.location.formattedAddress || ClientVars.formattedAddress || this.props.geoIPLocation;
        } catch (e) {

        }

        //ClientVars.formattedAddress

        // console.log("getLocation ", location);

        try {
            location = location.replace(new RegExp(", united states", "igm"), "")
        } catch (e) {

        }

        return location;

    };

    isBot = function () {

        let res = false;

        try {
            res = /bot|googlebot|crawler|spider|robot|crawling/i.test(navigator.userAgent);
        } catch (e) {

        }


        return res

    };

    setLocation = location => {


        if (typeof location === "string" && location !== undefined) {


            this.setState({
                location: {
                    formattedAddress: location
                }
            });

            this.setClientVars({
                formattedAddress: location
            });


            /// TODO: issue here with setting the state of the app - location in the _app.js isn't updates
            fetch("/updateSession", {
                headers: {
                    "Content-Type": "application/json"
                }, method: "POST", body: JSON.stringify({
                    formattedAddress: location
                })
            });

        } else {
            if (location.geo && location.lat && location.long && location.formattedAddress) {


                this.setState({location});

                this.setClientVars({
                    formattedAddress: location.formattedAddress, lat: location.lat, long: location.long,
                });

                fetch("/updateSession", {
                    headers: {
                        "Content-Type": "application/json"
                    }, method: "POST", body: JSON.stringify({
                        ...location
                    })
                });


            }
        }
    };

    handleRouteChange = url => {

        //console.log("handleRouteChange url", url)

        if (url.search("/jobs") > -1) {
            this.setState({isLoading: true});
        }


    };

    componentWillUnmount() {
        Router.events.off("routeChangeStart", this.handleRouteChange);
    }

    showLoader = loaderContent => {
        this.setState({
            isLoading: true, loaderContent: loaderContent
        });
    };

    hideLoader = () => {
        this.setState({isLoading: false});
    };

    componentDidCatch(error, errorInfo) {
        logEvent("error", {value: error || "", info: errorInfo || ""});
        console.log(error);
    }

    JsonToUrlParams(params) {

        return Object.keys(params).map(function (k) {

            if (!params[k]) {
                return ""
            }

            return encodeURIComponent(k) + '=' + encodeURIComponent(params[k])
        }).join('&')

    }

    getEmilyUrl() {
        let self = this;
        let url = "https://emily-recruiter.com/job-listing";

        try {
            let keyword = self.getKeyword();
            let location = self.getLocation();
            let geo = ClientVars.geo;

            if (!keyword || keyword.length <= 1) {
                keyword = "";
            } else {
                keyword = encodeURIComponent(keyword);
            }

            if (!location || location.length <= 1) {
                location = "";
            } else {
                location = encodeURIComponent(location);
            }

            let showEmailOptin = false;

            if (self.getProvidedEmail() == true) {
                showEmailOptin = false;
            }

            //url = "https://emily-recruiter.com/job-listing?keyword=" + keyword + "&botName=jobs-bear&utm_source=ei&web-push=false&showEmailOptin=" + showEmailOptin + "&location=" + location + "&geo=" + geo;
            url = "https://emily-recruiter.com/job-listing?keyword=" + keyword + "&showYa=true&botName=jobs-bear&utm_source=ei&web-push=false&showEmailOptin=" + showEmailOptin + "&location=" + location + "&geo=" + geo;

        } catch (e) {

        }

        return url;
    }

    getFluentUrl() {
        let self = this;
        let url = "https://signup.finddreamjobs.com/default.aspx?Flow=73618ABD-27E4-7BF9-5B43-69FC0B2C428FC39C0C5F&subaff1=&subaff2=205027&subaff3=&subaff4=any&subaff5=$14-$31";

        try {
            let email = null;
            let zip = null;
            let keyword = self.getKeyword();
            let location = self.getLocation();
            let geo = ClientVars.geo;

            if (!keyword || keyword.length <= 1) {
                keyword = "";
            } else {
                keyword = encodeURIComponent(keyword);
            }

            if (!location || location.length <= 1) {
                location = "";
            } else {
                location = encodeURIComponent(location);
            }

            try {
                if (window.ClientVars && window.ClientVars.email && window.ClientVars.email.length > 0) {
                    email = window.ClientVars.email;
                }
            } catch (e) {

            }

            try {

                if (window.ClientVars.locpysical && window.ClientVars.locpysical["Target Type"] == "Postal Code") {
                    zip = window.ClientVars.locpysical["Name"];
                }

            } catch (e) {

            }


            //url = "https://emily-recruiter.com/job-listing?keyword=" + keyword + "&botName=jobs-bear&utm_source=ei&web-push=false&showEmailOptin=" + showEmailOptin + "&location=" + location + "&geo=" + geo;
            url = "https://signup.finddreamjobs.com/default.aspx?Flow=73618ABD-27E4-7BF9-5B43-69FC0B2C428FC39C0C5F&subaff1=&subaff2=205027&subaff3=&subaff4=" + keyword + "&subaff5=$14-$31";
            if (email && email.length > 0) {
                url = url + "&email=" + email;
            }

            if (location && location.length > 0) {
                url = url + "&address1=" + location;
            }

            if (zip && zip.length > 0) {
                url = url + "&zippost=" + zip;
            }


            //console.log("url fluent", url);

        } catch (e) {

        }

        return url;
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    goToLbJl(source) {

        handleJobClick("", this.getKeyword(), source || "ei", 0.1, true);

    }

    getFooter() {

        //hostname
        try {

            let empty = <></>;

            if (location.pathname.search(/(jobs-by|about-us|contact-us)/igm) > -1) {
                return empty
            }

            if (location.pathname == "/") {
                return empty
            }

        } catch (e) {

        }

        let footerMenu = [{
            path: "/jobs", title: "Jobs"
        }, {
            path: "/vip", title: "VIP package"
        }, {
            path: "/about", title: "About Us"
        }, {
            path: "/blog/all", title: "Blog"
        }, {
            path: "/unsubscribe", title: "Unsubscribe"
        }, {
            path: "/cookies", title: "Cookies"
        }, {
            path: "/privacy-policy", title: "Privacy Policy"
        }, {
            path: "/terms-and-conditions", title: "Terms and Conditions"
        }];

        if (this.props.hostname == "jobs-bear.co" || this.props.hostname == "jobs-bears.com") {
            footerMenu = [{
                path: "/jobs", title: "Jobs"
            }, {
                path: "/about", title: "About Us"
            },

                {
                    path: "/unsubscribe", title: "Unsubscribe"
                }, {
                    path: "/cookies", title: "Cookies"
                }, {
                    path: "/privacy-policy", title: "Privacy Policy"
                }, {
                    path: "/terms-and-conditions", title: "Terms and Conditions"
                }]
        }

        return <Footer
            facebookLink="https://www.facebook.com/jobsBear/"
            twitterLink="https://twitter.com/bear_jobs"
            linkedInLink="https://www.linkedin.com/company/jobsbear"
            copyrightText={`All Rights Reserved to jobsbear © ${new Date().getFullYear()}`}
            ads=""
            footerMenu={footerMenu}
            origin={this.state.onPage}
        />

    }

    render() {
        const {Component, pageProps} = this.props;


        try {
            window._app = this;
        } catch (e) {

        }

        let EiVersion = EiVersionMapper.ExitIntentV2;


        return (
            <>
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>

                </Head>

                <MyLoadingOverlay
                    isActive={this.state.isLoading || this.state.first_load == true}
                    fadeSpeed={600}
                    description={this.state.loaderContent || ""}
                >
                </MyLoadingOverlay>

                <div id="main-app-container" style={{display: this.state.first_load == true ? "none" : "block"}}
                     onClick={this.catchFirstClick.bind(this)}>

                    <NextSeo config={SEO}/>


                    <EmailSignUpPopup

                        keyword={this.getKeyword()}
                        location={this.getLocation()}

                        app={this}
                        show={this.state.showEmailSignUpPopup}
                        title="Your Dream Salary Awaits"
                        text={`Enter your email to get high pay ${this.props.keyword || ""} job offers ${this.getLocation() ? "in " + this.getLocation().replace(/^\w/, c => c.toUpperCase()) : ""}.`}
                        disclaimerText={this.i18n.emailOptinText}
                        CTA="Continue"
                        placeholder="Enter Your Email"
                        secondaryCTA="No thanks, continue to job"
                        validate={validateEmailForm}
                        successText={this.state.keyword ? `We’ll send you ${this.state.keyword} job offers soon!` : `We’ll send you job offers soon!`}
                        onSubmit={(data, onSuccess, onError) => {
                            onSuccess();
                            this.setProvidedEmail(data.email, "EmailSignUpPopup");
                            logEvent("click-email_submit", {origin: "email_popup"});
                        }}
                        distinationRedirect={() => {
                            this.setState({showEmailSignUpPopup: false});
                            if (this.state.jobRedirectPath !== "") {
                                handleJobClick(this.state.jobRedirectPath, this.state.jobRedirectTitle, this.state.currentJobFeedSrc, null, null, this.state.currentJobBody);
                            }
                        }}
                        closeModal={() => {
                            this.setState({
                                showEmailSignUpPopup: false
                            });
                            if (this.countClosedPopup >= 0) {
                                //this.setState({forcefullyHideEmailPrompts: true});
                                this.setForcefullyHideEmailPrompts(true)
                            }
                            logEvent("click-email_skip", {
                                origin: this.state.emailSignUpPopupOrigin
                            });
                            if (this.state.jobRedirectPath !== "") {
                                handleJobClick(this.state.jobRedirectPath, this.state.jobRedirectTitle, this.state.currentJobFeedSrc, null, null, this.state.currentJobBody);
                            }
                            ++this.countClosedPopup;
                        }}
                        origin={this.state.onPage}
                    />


                    <Component
                        {...pageProps}
                        isExitIntent={this.state.isExitIntent}
                        setExitIntent={this.setExitIntent}
                        showEmailSignUpPopup={this.showEmailSignUpPopup}
                        setProvidedEmail={this.setProvidedEmail}
                        getProvidedEmail={this.getProvidedEmail}
                        getForcefullyHideEmailPrompts={this.getForcefullyHideEmailPrompts}
                        setKeyword={this.setKeyword}
                        getKeyword={this.getKeyword}
                        keyword={this.state.keyword}
                        setPage={this.setPage}
                        showLoader={this.showLoader}
                        hideLoader={this.hideLoader}
                        setLocation={this.setLocation}
                        getLocation={this.getLocation}
                        uid={this.state.uid}
                        app={this}
                    />

                    {this.state.onPage !== "job_post" ? (
                        this.getFooter()
                    ) : null}

                    <EiVersion
                        show={this.state.isExitIntent}
                        keyword={this.getKeyword()}
                        app={this}
                        geo={this.props.geo}
                        location={this.getLocation()}
                        serpClick={(close) => {

                            this.goToLbJl("serp");
                            logEvent("serpClickEi");

                            try {
                                if (close == true) {
                                    this.setExitIntent(false);
                                }
                            } catch (e) {

                            }

                        }}
                        onClose={() => {


                            try {
                                if (
                                    ClientVars.botName == "rm" ||
                                    ClientVars.botName == "upward" ||
                                    ClientVars.botName == "sercanto" ||
                                    ClientVars.botName == "mjh" ||
                                    ClientVars.botName == "vhm" ||
                                    ClientVars.botName == "joblist" ||
                                    ClientVars.botName == "Birghtfire" ||
                                    ClientVars.botName == "connexus-buy" ||
                                    ClientVars.botName == "localstaffing" ||
                                    ClientVars.botName == "jr" ||
                                    ClientVars.botName == "jobsora" ||
                                    ClientVars.botName == "rg" ||
                                    ClientVars.botName == "ExplorerMedia" ||
                                    ClientVars.botName == "expertjobmatch-localstaffing" ||
                                    ClientVars.botName == "j2m" ||
                                    ClientVars.botName == "JobResource" ||
                                    ClientVars.botName == "tab" ||
                                    ClientVars.botName == "bing"
                                ) {
                                    this.goToLbJl();
                                }
                            } catch (e) {

                            }

                            logEvent("EiCloseClick");
                            this.setExitIntent(false);

                        }}

                        skipOfferAction={() => {

                            this.goToLbJl("serp");
                            // let url = this.getEmilyUrl();
                            // window.open(url, "_blank");
                            logEvent("EiOutClick");
                            this.setExitIntent(false);

                        }}

                    >

                    </EiVersion>


                    <SMSModalV1
                        ref={this.SmsModalElement}
                        app={this}
                        location={this.getLocation()}
                        keyword={this.getKeyword()}
                        modalIsOpen={false}
                    >
                    </SMSModalV1>

                    <Job_Modal
                        ref={this.Job_Modal}
                        app={this}
                        modalIsOpen={false}
                    >
                    </Job_Modal>

                    <Similar_To_Job_Modal
                        ref={this.Similar_To_Job}
                        app={this}
                        modalIsOpen={false}
                    >
                    </Similar_To_Job_Modal>


                    <ZipRecruiterEmailModal
                        ref={this.ZipRecruiterEmailModalElement}
                        app={this}
                        location={this.getLocation()}
                        keyword={this.getKeyword()}
                        modalIsOpen={false}
                    >

                    </ZipRecruiterEmailModal>


                </div>
            </>

        );
    }
}

export default MyApp;

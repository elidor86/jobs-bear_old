import JobList from "../components/Jobs/JobList";
import jobSearch from "../lib/jobSearch";
import determineLocation from "../lib/determineLocation";
import CleanAndNormalizeKeywords from "../lib/CleanAndNormalizeKeywords";
import styled from "styled-components";

import StandardPage from "../components/StandardPage/StandardPage";
import logEvent from "../lib/logEvent";
import Router from "next/router";
import {NextSeo} from "next-seo";
import KeywordCloudModal from "../components/KeywordCloudModal/KeywordCloudModal";
import SearchModal from "../components/JobSearch/SearchModal";
import ListEmptyState from "../components/ListEmptyState/ListEmptyState";
import OptinModalsEmailModalV3 from "../components/EmailModalV3/EmailModalV3";
import ThankYouModal from "../components/ThankYouModal/ThankYou";

import Gdpr from "../components/gdpr/Gdpr";
import AdSense from 'react-adsense';
import React from "react";


import fetch from "isomorphic-fetch";

const jobsPageModalVersionsArr = [
    "OptinModalsEmailModalV3",
    // "OptinModalsFree",
];

const listDecorationVersionArr = [
    "randomTags",
    //"randomTagsWithCPACards",
    //"randomTagsSortedByLocation",
    // "randomTagsWithWhatsappFlow",
    // "randomTagsWithSavePanadasBanner",
    // "randomTagsWithProgress",
    // "randomTagsWithNoDescription",
    // "firstToApply",
    // "trendingJob",
    // "premiumJob",
    // "hurry",
    // "social"
    // "plain",
    // "gamified",
    // "hideDescription"
];

const emailRegistrationVersionArr = [
    "onClick+onLoad",
    // "onLoad",
];


const PageTitle = styled.h1`
    background: #ffffff;
    margin: 0;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: #000639;
    max-width: 710px;
    margin: auto;
`;

const PageP = styled.p`
    margin: 0;
    font-size: 16px;
    line-height: 20px;
    color: #000639;
    padding: 0px 24px;
    margin-top: 10px;
    height: 44px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`;

const PagePReedMore = styled.a`
    text-decoration: underline;
    display: block;
    padding: 0px 23px;
    margin-top: -2px;
    margin-bottom: 20px;
`;

const PageHeaderContainer = styled.div`
    background: #ffffff;
    padding: 13px 22px;
    margin: 0;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    border-bottom: 1px solid #e5e6eb;
    color: #000639;
`;

class JobListPage extends React.Component {
    constructor(props) {
        super(props);


        this.initialLocation = props.app.getLocation() || props.formattedAddress;
        this.initialKeyword = props.app.getKeyword();


        this.state = {
            pHeight: "44px",
            serpIdCount: 4,
            page: 1,
            haveMoreJobs: true,
            jobs: props.jobs,
            loading: false,
            exitIntent: true,
            redirectToJob: this.props.redirect_to_job || false,
            forcefullyHideEmailPrompts: false,
            showKeywordCloudModal: false,
            //showKeywordCloudModal: !props.app.getKeyword(),
            showSearchModal: false,
            flowActive: false,
            hadFirstScrollEvent: false
        };


        this.getPageTitle = this.getPageTitle.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.emailSubmit = this.emailSubmit.bind(this);
        this.setFlowState = this.setFlowState.bind(this);

        if (this.props.emailRegistrationVersion !== "onClick+onLoad") {
            props.app.setForcefullyHideEmailPrompts(true);
        }


    }

    static async getInitialProps(ctx) {


        try {

            let neuvooCaBulkXml = false;
            let zipApiGb = false;
            let searchR = 35;
            let hostname = null;
            let client_ip = null;
            let Session = null;
            let session_id = null;
            let isTitleOnly = null;
            let TjCpcUk = false;
            let neuvooBulk = false;
            let prevKeywords = [];
            let jobsPageModalVersion = jobsPageModalVersionsArr[Math.floor(Math.random() * jobsPageModalVersionsArr.length)];
            let jobListDecorationVersion = listDecorationVersionArr[Math.floor(Math.random() * listDecorationVersionArr.length)];
            let emailRegistrationVersion = emailRegistrationVersionArr[Math.floor(Math.random() * emailRegistrationVersionArr.length)];

            let {
                keyword,
                uid,
                ua,
                formattedAddress,
                geo,
                lat,
                long,
                page,
                feed,
                title,
                gclid,
                flowType,
                redirect_to_job,
                job_id,
                ptitle,
                tags,
                botName,
                doAdsense,
                utm_campaign,
                utm_source,
                location
            } = ctx.query;


            try {
                if (ctx.query.kwd && ctx.query.kwd.length > 0) {
                    keyword = ctx.query.kwd;
                } else if (ctx.query.keyword && ctx.query.keyword.length > 0) {
                    keyword = ctx.query.keyword;
                }
            } catch (e) {

            }


            try {

                if (Array.isArray(keyword) == true) {
                    if (keyword[1] && keyword[1].length > 0) {
                        keyword = keyword[1];
                    } else {
                        keyword = keyword[0];
                    }
                }

                if ((!keyword || keyword.length == 0) && ctx.query.QueryString && ctx.query.QueryString.length > 0) {

                    keyword = ctx.query.QueryString;
                }

                //console.log("keyword", keyword)

                try {

                    if (keyword == "partime" || keyword == "parttime") {
                        keyword = "part time";
                    }

                } catch (e) {

                }


            } catch (e) {

            }


            try {
                if (ctx.req.locpysical) {

                    if ((!lat || !long) && ctx.req.locpysical.lat && ctx.req.locpysical.long) {
                        lat = ctx.req.locpysical.lat;
                        long = ctx.req.locpysical.long;
                    }

                }
            } catch (e) {

            }

            if (!formattedAddress || formattedAddress.length <= 1) {

                try {
                    if (ctx.req.locpysical) {


                        formattedAddress = ctx.req.locpysical["Name"].replace(new RegExp(",", "igm"), ", ");

                        if (geo == "ca" || geo == "us" || geo == "za") {
                            formattedAddress = ctx.req.locpysical["Canonical Name"].replace(new RegExp(",", "igm"), ", ");
                        }

                        if ((!lat || !long) && ctx.req.locpysical.lat && ctx.req.locpysical.long) {
                            lat = ctx.req.locpysical.lat;
                            long = ctx.req.locpysical.long;
                        }

                    } else if (ctx.req.session.geoIPLocation && ctx.req.session.geoIPLocation.length > 0) {

                        formattedAddress = ctx.req.session.geoIPLocation;

                        if (ctx.req.session.geoIPRegion && ctx.req.session.geoIPRegion.length > 0) {
                            formattedAddress += ", " + ctx.req.session.geoIPRegion;
                        }

                        if (ctx.req.session.geoIPCitylatlong && ctx.req.session.geoIPCitylatlong.length > 0) {
                            try {
                                let tmpLatLonArr = ctx.req.session.geoIPCitylatlong.split(",");
                                if (tmpLatLonArr && tmpLatLonArr.length == 2) {
                                    lat = tmpLatLonArr[0];
                                    long = tmpLatLonArr[1];
                                }
                            } catch (e) {

                            }
                        }

                    }
                } catch (e) {

                }

            }


            /*try {
                //console.log("ctx.req.session.AB.GoogleGeocode", ctx.req.session.AB.GoogleGeocode)
                if (ctx.req && ctx.req.session && ctx.req.session.AB.GoogleGeocode == "on") {
                    try {
                        if (formattedAddress && formattedAddress.length > 0) {

                            let start = new Date().getTime();

                            let geoCodeP = await fetch(`https://jobs-bear.com/geocode?locationStr=${formattedAddress}&geo=${geo}`);
                            let geoCode = await geoCodeP.json();

                            if (geoCode && geoCode.code == 200 && geoCode.formatted_address) {
                                // formattedAddress = geoCode.formatted_address;

                                lat = geoCode.lat;
                                long = geoCode.long;
                            }

                            let end = new Date().getTime();
                            //console.log("geoCode", geoCode, end - start)


                        }
                    } catch (e) {

                    }
                }
            } catch (e) {

            }*/


            if ((!lat || !long) && formattedAddress) {

                let latlong = null;

                try {
                    latlong = await determineLocation(formattedAddress, geo, ctx.query);
                    if (latlong && latlong.lat) {
                        lat = latlong.lat;
                        long = latlong.long;
                    }
                } catch (e) {

                }


            }


            let geoIPLocation;

            if (ctx.req) {


                try {
                    const getClientIp = function (req) {
                        try {
                            const headerKeys = [
                                'x-client-ip',
                                'x-appengine-user-ip',
                                'x-forwarded-for',
                                'x-real-ip',
                                'cf-connecting-ip' // Added for Cloudflare support, for example
                            ];

                            for (let key of headerKeys) {
                                const ip = req.headers[key];
                                if (ip) {
                                    return ip.split(',')[0].trim(); // Split and take the first IP in case of multiple IPs
                                }
                            }

                            return req.remoteIp || req.connection?.remoteAddress || req.socket?.remoteAddress;
                        } catch (e) {

                        }


                    }

                    client_ip = getClientIp(ctx.req);
                } catch (e) {

                }

                try {
                    if (ctx.req.headers["user-agent"] && ctx.req.headers["user-agent"].length > 0) {
                        ua = ctx.req.headers["user-agent"]
                    }
                } catch (e) {

                }

                try {
                    if (ctx.req.hostname && ctx.req.hostname.length > 0) {
                        hostname = ctx.req.hostname;
                    }
                } catch (e) {

                }

                if (ctx.req.session) {

                    //console.log("ctx.req.session", ctx.req.session);

                    Session = ctx.req.session || {};

                    try {
                        if (Session.session_id && typeof Session.session_id == "string" && Session.session_id.length > 0) {
                            session_id = Session.session_id;
                        }
                    } catch (e) {

                    }

                    if (ctx.req.session.zipApiGb == true) {
                        zipApiGb = true;
                    }

                    if (ctx.req.session.adSense == true) {
                        doAdsense = true;
                    }

                    if (ctx.req.session.searchR) {
                        searchR = ctx.req.session.searchR;
                    }

                    if (ctx.req.session.gclid) {
                        gclid = ctx.req.session.gclid;
                    }

                    if (!botName && ctx.req.session.botName && ctx.req.session.botName.length > 0) {
                        botName = ctx.req.session.botName;
                    }

                    if ("isTitleOnly" in ctx.req.session) {
                        isTitleOnly = ctx.req.session.isTitleOnly;
                    }

                    if (ctx.req.session.neuvooCaBulkXml == true) {
                        neuvooCaBulkXml = true;
                    }

                    if (ctx.req.session.TjCpcUk == true) {
                        TjCpcUk = true;
                    }

                    if (ctx.req.session.neuvooBulk == true) {
                        neuvooBulk = true;
                    }

                    if (ctx.req.session.prevKeywords && ctx.req.session.prevKeywords.length > 0) {
                        prevKeywords = ctx.req.session.prevKeywords;
                    }

                    if (!utm_campaign) {
                        utm_campaign = ctx.req.session.utm_campaign
                    }

                    if (!utm_source) {
                        utm_source = ctx.req.session.utm_source
                    }

                    if (!geo) {
                        geo = ctx.req.session.geo;
                    }

                    if (!uid) {
                        uid = ctx.req.session.uid;
                    }

                    if (!keyword && ctx.req.session.keyword && ctx.req.session.keyword.length > 0) {
                        keyword = CleanAndNormalizeKeywords.CleanAndNorm(ctx.req.session.keyword)
                    }

                    try {
                        if (keyword !== "" && keyword) {
                            if (!ctx.req.session.keywords) {
                                ctx.req.session.keywords = [];
                            }
                            ctx.req.session.keywords.push(keyword);
                        }
                    } catch (e) {

                    }


                    if (formattedAddress) {
                        ctx.req.session.location = formattedAddress;
                    }

                    if (ctx.req.session.geoIPLocation) {
                        geoIPLocation = ctx.req.session.geoIPLocation;
                    }

                    if (ctx.req.session.jobListDecorationVersion) {
                        jobListDecorationVersion = ctx.req.session.jobListDecorationVersion;
                    }

                }

            } else {


                try {
                    if ("ClientVars" in window) {
                        Session = ClientVars
                    }
                } catch (e) {

                }

                try {
                    if ("location" in window && window.location.hostname) {
                        hostname = window.location.hostname;
                    }
                } catch (e) {

                }

                try {
                    if (!session_id && ClientVars.session_id && typeof ClientVars.session_id == "string" && ClientVars.session_id.length > 0) {
                        session_id = ClientVars.session_id
                    }
                } catch (e) {

                }


                try {
                    if (!utm_campaign) {
                        utm_campaign = ClientVars.utm_campaign
                    }
                } catch (e) {

                }


                try {
                    if (!utm_source) {
                        utm_source = ClientVars.utm_source
                    }
                } catch (e) {

                }

                try {
                    if (!ua && typeof ClientVars.ua_str == "string") {
                        ua = ClientVars.ua_str
                    }
                } catch (e) {

                }

                try {
                    if (!botName && ClientVars && ClientVars.botName && ClientVars.botName.length > 0) {
                        botName = ClientVars.botName
                    }
                } catch (e) {

                }

                try {
                    if (ClientVars.zipApiGb == true) {
                        zipApiGb = true;
                    }
                } catch (e) {

                }

                try {
                    if (ClientVars.TjCpcUk == true) {
                        TjCpcUk = true;
                    }
                } catch (e) {

                }

                try {
                    if (ClientVars.searchR) {
                        searchR = ClientVars.searchR;
                    }
                } catch (e) {

                }

                try {
                    if (ClientVars.gclid) {
                        gclid = ClientVars.gclid;
                    }
                } catch (e) {

                }

                try {
                    if ("adSense" in ClientVars) {
                        doAdsense = ClientVars.adSense;
                    }
                } catch (e) {

                }

                try {
                    if ("isTitleOnly" in ClientVars) {
                        isTitleOnly = ClientVars.isTitleOnly;
                    }
                } catch (e) {

                }

                try {
                    if (ClientVars.neuvooBulk == true) {
                        neuvooBulk = true;
                    }
                } catch (e) {

                }


                if (!uid) {

                    try {
                        if (ClientVars.uid) {
                            uid = ClientVars.uid;
                        }

                    } catch (e) {

                    }

                }

                if (!geo) {

                    try {
                        if (ClientVars.geo) {
                            geo = ClientVars.geo;
                        }

                    } catch (e) {

                    }

                }

                try {
                    if (!keyword && ClientVars.keyword && ClientVars.keyword.length > 0) {
                        keyword = ClientVars.keyword
                    }
                } catch (e) {

                }

                geoIPLocation = JSON.parse(document.getElementById("session").textContent).clientVars.geoIPLocation || null;

                try {
                    if (window) {
                        if (window.AB) {
                            if (window.AB.jobListDecorationVersion) {
                                jobListDecorationVersion = window.AB.jobListDecorationVersion;
                            }
                        }
                    }
                } catch (e) {

                }


                try {
                    fetch("/updateSession", {
                        headers: {
                            "Content-Type": "application/json"
                        },
                        method: "POST",
                        body: JSON.stringify({
                            keywords: keyword || "",
                            formattedAddress: formattedAddress || "",
                            lat: lat || "",
                            long: long || "",
                            geo: geo || ""
                        })
                    });
                } catch (e) {

                }


            }

            let jobs = null;


            try {
                if (process.browser) {
                    if ("Jobs" in window) {
                        jobs = window.Jobs;
                        delete window.Jobs;
                    }
                }
            } catch (e) {

            }


            try {
                let tmpkeyword = keyword.toLowerCase();
                let tmpKeywords = tmpkeyword.split("jobs in");
                if (tmpKeywords.length == 2) {
                    keyword = tmpKeywords[0];
                }
            } catch (e) {

            }

            try {
                keyword = CleanAndNormalizeKeywords.CleanAndNorm(keyword);
            } catch (e) {

            }

            if (!jobs) {

                let startTs = new Date().getTime();

                let jobSearchParams = {
                    client_ip: client_ip,
                    session_id: session_id,
                    botName: botName || "jobs-bear",
                    searchR: searchR,
                    gclid: gclid,
                    isTitleOnly: isTitleOnly,
                    neuvooCaBulkXml: neuvooCaBulkXml,
                    zipApiGb: zipApiGb,
                    TjCpcUk: TjCpcUk,
                    neuvooBulk: neuvooBulk,
                    utm_campaign: utm_campaign,
                    utm_source: utm_source,
                    keywords: keyword || "",
                    uid: uid,
                    prevKeywords: prevKeywords,
                    hostname: hostname,
                    geo: geo,
                    formattedAddress: formattedAddress || "",
                    lat: lat || "",
                    long: long || "",
                    page: page || 1,
                    tags: tags ? tags.split(",") : []
                };

                try {
                    jobSearchParams.keywords = CleanAndNormalizeKeywords.CleanAndNorm(jobSearchParams.keywords);
                } catch (e) {

                }

                try {
                    const AB = Session.AB;
                    if (AB) {
                        jobSearchParams.AB = AB;
                    }
                } catch (e) {

                }

                if (ua && ua.length > 0) {
                    jobSearchParams.ua = ua;
                }

                jobs = await jobSearch(jobSearchParams);


            }


            if (!jobs) {
                jobs = [];
            }


            try {
                for (let index in jobs) {
                    //jobs[index].job_source_id = jobs[index].extId
                    jobs[index].extId = index
                }
            } catch (e) {

            }


            //console.log("jobs", jobs);

            return {
                Session,
                jobsPageModalVersion,
                jobListDecorationVersion,
                emailRegistrationVersion,
                jobs,
                keyword,
                redirect_to_job,
                feed,
                doAdsense,
                page,
                title,
                ptitle,
                flowType,
                job_id,
                lat,
                long,
                geo,
                formattedAddress,
                geoIPLocation
            };

        } catch (error) {

            if (process.browser) {
                logEvent("error", {value: error.message});
            }
            console.trace("jobs error", error);
        }
    }

    setFlowState(bool) {


        //console.log("setFlowState ",bool)


        try {
            if (!window.ClientVars.AB.FlowVersion || window.ClientVars.AB.FlowVersion == "none" || window.ClientVars.AB.FlowVersion == "noneBig") {
                return
            }
        } catch (e) {
            return
        }

        try {
            if (bool == true) {
                logEvent("showFlow");
            }
        } catch (e) {

        }

        this.setState({flowActive: bool});

    }


    getPageTitle() {
        let title = "";
        let {formattedAddress, jobs, keyword, Session} = this.props;

        try {
            if (Session && Session.FriendlyJobsTitle && typeof Session.FriendlyJobsTitle == "string") {
                return Session.FriendlyJobsTitle
            }
        } catch (e) {

        }

        if (!jobs) {
            return title;
        }

        keyword = this.props.app.getKeyword() || keyword;

        if (keyword && formattedAddress && jobs.length > 0) {
            title = `+${jobs.length} job offers for ${keyword} in ${formattedAddress}`;
        } else if (keyword && jobs.length > 0) {
            title = `+${jobs.length} job offers for ${keyword}`;
        } else if (formattedAddress && jobs.length > 0) {
            title = `+${jobs.length} job offers in ${formattedAddress}`;
        } else if (jobs.length > 0) {
            title = `Showing +${jobs.length} job offers`;
        }
        return title;
    }

    getH1() {
        const self = this;


    }

    getJobListTitle() {
        let title = "";
        let {formattedAddress, jobs, keyword, Session} = this.props;

        try {
            if (Session && Session.FriendlyJobsTitle && typeof Session.FriendlyJobsTitle == "string") {
                return Session.FriendlyJobsTitle
            }
        } catch (e) {

        }

        if (!jobs) {
            return title;
        }

        keyword = this.props.app.getKeyword() || keyword;

        if (keyword && formattedAddress && jobs.length > 0) {
            title = `+${jobs.length} job offers for <span class="page-title-bold">${keyword}</span> in <span class="page-title-bold">${formattedAddress} </span>(<span class="page-title-change-btn">change</span>)`;
        } else if (keyword && jobs.length > 0) {
            title = `+${jobs.length} job offers for <span class="page-title-bold">${keyword}</span>`;
        } else if (formattedAddress && jobs.length > 0) {
            title = `+${jobs.length} job offers in <span class="page-title-bold">${formattedAddress}</span>`;
        } else if (jobs.length > 0) {
            title = `Showing +${jobs.length} job offers`;
        }
        return title;
    }

    getJobsListP() {

        let {formattedAddress, jobs, keyword, Session} = this.props;
        //pHeight
        const self = this;

        try {
            if (Session && Session.FriendlyJobsP && typeof Session.FriendlyJobsP == "string") {


                let html =
                    <div style={{maxWidth: "760px", margin: "auto"}}>
                        <PageP style={{height: (this.state.pHeight)}}>
                            {Session.FriendlyJobsP}
                        </PageP>


                        <PagePReedMore onClick={() => {
                            try {
                                self.setState({
                                    pHeight: "317px"
                                })
                            } catch (e) {

                            }

                        }}>Read More</PagePReedMore>
                    </div>

                return html
            }
        } catch (e) {
            return <></>
        }

        return <></>

        //PageP
    }

    trackJobView() {

        let self = this;

        return;

        let jobElements = document.querySelectorAll(".job-card-el");

        const config = {
            rootMargin: '0px 0px 100px 0px',
            threshold: 1
        };

        const observeElement = function (jobEl) {

            setTimeout(function () {

                let el = document.getElementById(jobEl.id);
                console.log(el);

                let observer = new IntersectionObserver((entry, observer) => {
                    //console.log('entry:', entry);

                    if (entry[0].intersectionRatio > 0 && entry[0].isIntersecting) {
                        console.log('entry intersectionRatio :', entry[0].intersectionRatio);
                        console.log('entry target :', entry[0].target);
                        console.log('entry:', entry);
                        console.log('observer:', observer);
                        console.log('----\n');

                        self.trackJobView();
                        observer.unobserve(el);

                    }


                }, config);

                observer.observe(el);

                /*try {
                    if (window.Observers) {
                        window.Observers.push({observer: observer, el: jobEl});
                    } else {
                        window.Observers = [{observer: observer, el: jobEl}]
                    }
                } catch (e) {

                }*/
            }, 1000);


        };

        for (let i in jobElements) {
            let jobEl = jobElements[i];


            if (jobEl && jobEl.id && jobEl.id.length > 0 && jobEl.haveObserver != true) {
                jobEl.haveObserver = true;

                observeElement(jobEl);

                //console.log("jobEl", jobEl);
            }

        }


    }

    tagClick() {

    }

    componentDidMount() {

        //console.log("componentDidMount")

        try {
            //this.trackJobView();
        } catch (e) {

        }


        this.props.setPage("job_list");
        const {lat, long, formattedAddress, geo} = this.props;


        if (lat && long && formattedAddress && geo) {
            this.props.setLocation({
                lat,
                long,
                geo,
                formattedAddress
            });
        } else if (formattedAddress && formattedAddress.length > 0) {
            // console.log("setLocation", formattedAddress);
            this.props.setLocation(formattedAddress);
        }

        if (this.state.redirectToJob && !document.referrer.search("/job/") > -1) {

            const queryParams = {
                feed: this.props.feed,
                title: this.props.title,
                flowType: this.props.flowType
            };

            if (this.props.job_id && this.props.feed) {
                this.props.showLoader();
                this.props.setRedirected();
                const esc = encodeURIComponent;
                const queryString = Object.keys(queryParams)
                    .map(k => {
                        return queryParams[k] !== undefined
                            ? esc(k) + "=" + esc(queryParams[k]) + "&"
                            : "";
                    })
                    .join("");
                Router.push(`/job/${this.props.job_id}?${queryString}`);
            }
        }

        //this.props.app.setAB("jobsPageModalVersion", this.props.jobsPageModalVersion);

        //this.props.app.setAB("jobListDecorationVersion", this.props.jobListDecorationVersion);

        //this.props.app.setAB("emailRegistrationVersion", this.props.emailRegistrationVersion);

        try {
            document.querySelector("._loading_overlay_wrapper").style.overflow = "auto";
        } catch (e) {
        }


        if (process.browser) {

            //report first scroll event on page
            window.addEventListener("scroll", this.handleScroll);
            if (this.props.jobs.length === 0) {
                logEvent("show-list_empty_state");
            }

            window.JobsPageThis = this;


            try {
                Router.events.on("routeChangeComplete", function () {

                    this.setState({
                        jobs: this.props.jobs
                    })

                }.bind(this));
            } catch (e) {

            }
        }


        try {
            this.createObserver();
        } catch (e) {

        }

    }

    componentWillUnmount() {


        if (process.browser) {
            window.removeEventListener("scroll", this.handleScroll);
        }
    }

    handleScroll() {
        if (!this.state.hadFirstScrollEvent) {
            logEvent("first_scroll-job_list");
            this.setState({hadFirstScrollEvent: true});
        }
    }

    noThanks() {

    }

    emailSubmit(email, src) {

        if (!email) {
            logEvent("error-missing-email", {origin: "email-popup"});
            return;
        }
        logEvent("click-email_submit", {origin: "premium"});
        this.props.app.setProvidedEmail(email, src);

    }


    OptinModalsEmailModalV3emailSubmit(email) {
        // console.log(`email:` + email);
        this.emailSubmit(email, "OptinModalsEmailModalV3");


        let Location = this.props.app.getLocation() || this.props.formattedAddress;
        let keyword = this.props.app.getKeyword();


        try {
            Location = Location.toLowerCase().trim();
        } catch (e) {

        }

        try {
            keyword = keyword.toLowerCase().trim();
        } catch (e) {

        }

        try {
            this.initialLocation = this.initialLocation.toLowerCase().trim();
        } catch (e) {

        }

        try {
            this.initialKeyword = this.initialKeyword.toLowerCase().trim();
        } catch (e) {

        }


        try {

            let didShowSmsModal = localStorage.getItem("didShowSmsModal");


            //AB.ShowSmsModalOnEmailValid = true;
            //didShowSmsModal = null;


            if (didShowSmsModal) {

            } else {


                if (ClientVars.geo == "us") {

                    this.props.app.showSmsModal();
                    localStorage.setItem("didShowSmsModal", true);

                } else if (ClientVars.geo == "ca" && (ClientVars.AB.ShowSmsModal == "on")) {

                    this.props.app.showSmsModal();
                    localStorage.setItem("didShowSmsModal", true);

                }

            }


        } catch (e) {

        }


        //console.log("Keyword ", Keyword);

        //console.log("this.initialLocation ", this.initialLocation);
        // console.log("this.initialKeyword ", this.initialKeyword);


        if (Location == this.initialLocation && keyword == this.initialKeyword) {

            //console.log("keyword and location are the same dont refresh jobs ");


        } else {
            //console.log("keyword and location are not the same do refresh jobs ");


            /*let params = _.omit(Router.query, 'keyword', 'formattedAddress', 'geo', 'lat', 'long');
            params = {...params, keyword, ...this.props.app.state.location};

            //console.log("OptinModalsEmailModalV3emailSubmit params", params);

            Router.push(`/jobs?${buildJobSearchQueryString(params)}`);*/


        }


    }

    trackFBsearchEv() {

        try {

            let searchString = this.props.getKeyword() || "";

            try {
                searchString = searchString.toLowerCase()
                    .replace("jobs", "")
                    .replace("job", "")
                    .replace(new RegExp("\\+", "igm"), "")
                    .trim();
            } catch (e) {

            }


        } catch (e) {

        }
    }

    getSerpId() {

        let count = this.state.serpIdCount;
        count++;

        this.setState({
            serpIdCount: count
        });

        return count;


    }

    getSerpJobs() {


        return [];


    }

    fetchData() {


        let self = this;

        // debugger
        try {

            //ua

            let page = self.state.page;
            page = page + 1;

            self.setState({
                page: page
            })

            let jobSearchParams = {
                botName: self.props.app.getBotName() || "jobs-bear",
                searchR: 25,
                gclid: ClientVars.gclid || "",
                isTitleOnly: ClientVars.isTitleOnly || true,
                utm_campaign: ClientVars.utm_campaign || "",
                keywords: self.props.app.getKeyword() || "",
                uid: ClientVars.uid || "",
                hostname: window.location.hostname,
                geo: ClientVars.geo,
                formattedAddress: self.props.getLocation() || "",
                lat: ClientVars.lat || "",
                long: ClientVars.long || "",
                page: this.state.page
            };

            try {
                jobSearchParams.session_id = ClientVars.session_id;
            } catch (e) {

            }

            //console.log("jobSearchParams ", jobSearchParams)

            try {

                jobSearch(jobSearchParams).then(function (data) {


                    if (data && data.length > 0) {


                        let tmpJobsArr = self.state.jobs.concat(data);

                        for (let index in tmpJobsArr) {
                            tmpJobsArr[index].extId = index
                        }

                        self.setState({
                            jobs: tmpJobsArr,
                            page: page
                        })

                        logEvent("InfiniteScrollDataFetch", {length: data.length, page: self.state.page});

                        try {
                            if (page == 2) {

                                if ("jobClickCount" in window == false) {
                                    self.setFlowState(true);
                                }

                            }
                        } catch (e) {

                        }

                    } else {
                        logEvent("InfiniteScrollDataFetch", {length: 0, page: self.state.page});
                    }

                });
            } catch (e) {

                console.log("error jobSearch ", e);

            }


        } catch (e) {
            console.log("error fetchData ", e);
        }


    }

    getJobListVersion(jobs, keyword, formattedAddress, toggleLoader) {

        let self = this;

        let jobList =
            <JobList

                email={this.props.app.getEmail()}
                jobs={this.state.jobs}
                keyword={keyword}
                location={formattedAddress}
                toggleLoader={toggleLoader}
                showEmailSignUpPopup={this.props.showEmailSignUpPopup}
                getProvidedEmail={this.props.getProvidedEmail}
                setProvidedEmail={this.props.setProvidedEmail}
                getForcefullyHideEmailPrompts={
                    this.props.getForcefullyHideEmailPrompts
                }
                getKeyword={this.props.getKeyword}
                setKeyword={this.props.setKeyword}
                getLocation={this.props.getLocation}
                uid={this.props.uid}
                decoration={this.props.jobListDecorationVersion}
                toggleJobCardDescriptionVersion={
                    this.props.toggleJobCardDescriptionVersion
                }
                app={this.props.app}
                jobListPage={this.props.page}
            />


        return jobList;


    }

    createObserver() {


        const self = this;


        if ("IntersectionObserver" in window == false) {
            return;
        }

        let observer;

        let options = {
            root: null,
            rootMargin: "0px 0px 1500px 0px",
            threshold: 0
        };


        observer = new IntersectionObserver(function (entries, observer) {


            //debugger

            if (self.state.jobs.length <= 8) {
                return;
            }

            let entry = entries[0];

            if (entry && entry.isIntersecting == true && self.state.page <= 10) {
                // console.log("entries ", entries)
                // console.log("self.state.page ", self.state.page)

                self.fetchData()
            }


        }, options);


        setTimeout(function () {

            let target = document.querySelector('#show-more-btn');
            //console.log("target ", target)


            if (target) {
                observer.observe(target);
            }

        }, 1000)


    }

    getMetaKeywords() {

        let {formattedAddress, jobs, keyword, Session} = this.props;

        let resKeywords = "jobs near me, jobs bear";

        if (Session && Session.FriendlyJobsMetaKeywords && Session.FriendlyJobsMetaKeywords.length > 0) {
            resKeywords = Session.FriendlyJobsMetaKeywords;
        } else if (keyword && keyword.length > 0) {
            resKeywords = keyword;
        }

        //FriendlyJobsMetaKeywords

        return resKeywords
    }

    render() {


        let {
            formattedAddress,
            jobs,
            keyword,
            toggleLoader,
            isExitIntent,
            setExitIntent,
            ptitle,
            app
        } = this.props;

        //console.log("formattedAddress ", formattedAddress);

        if (!jobs) {
            jobs = [];
        }

        //jobs = jobs.splice(0, 4);

        let jobsPageModalVersionHtml = "";

        if (this.props.app.getProvidedEmail("OptinModalsEmailModalV3 jobs") == false && !this.state.forcefullyHideEmailPrompts) {

            if (this.props.jobsPageModalVersion == "OptinModalsEmailModalV3") {


                jobsPageModalVersionHtml = (
                    <OptinModalsEmailModalV3
                        app={app}
                        location={this.props.getLocation() || formattedAddress}
                        keyword={this.props.getKeyword()}
                        emailSubmit={this.OptinModalsEmailModalV3emailSubmit.bind(this)}
                        noThanks={this.noThanks.bind(this)}
                        onClose={() => {
                            this.setState({forcefullyHideEmailPrompts: true});
                        }}
                    ></OptinModalsEmailModalV3>
                );


                try {
                    if (window.AB.EmailOptinJr == false && ClientVars.utm_source == "jr") {
                        jobsPageModalVersionHtml = "";
                    }
                } catch (e) {

                }


            }
        }


        let utm_campaign = "";

        try {
            if (app.props.utm_campaign) {
                utm_campaign = app.props.utm_campaign;
            }
        } catch (e) {

        }


        return (
            <StandardPage
                getKeyword={this.props.getKeyword}
                setKeyword={this.props.setKeyword}
                setProvidedEmail={this.props.setProvidedEmail}
                getProvidedEmail={this.props.getProvidedEmail}
                keyword={keyword}
                hideBottomEmailBar={true}
                origin="job_list"
                getLocation={this.props.getLocation}
                app={app}>

                <NextSeo
                    title={ptitle || this.getPageTitle() || ""}
                    additionalMetaTags={[
                        {
                            property: "keywords",
                            content: this.getMetaKeywords()
                        }
                    ]}
                />

                {app.props.adSenseCo == true ? <div style={{textAlign: "center"}}
                                                    dangerouslySetInnerHTML={{__html: "<script type=\"text/javascript\"> google_ad_client = \"ca-pub-8573325940152694\"; /* botson_336x280_1 */ google_ad_slot = \"botson\\/botson_336x280_1\"; google_ad_width = 336; google_ad_height = 280; </script> <script type=\"text/javascript\" src=\"//pagead2.googlesyndication.com/pagead/show_ads.js\"> </script>"}}></div> : null}

                {jobs.length > 0 ? (
                    <>

                        <PageHeaderContainer>

                            <PageTitle onClick={() => {
                                try {
                                    this.props.app.OpenModalSearch("pageTitle");
                                } catch (e) {

                                }

                            }}
                                       dangerouslySetInnerHTML={{__html: this.getJobListTitle()}}>

                            </PageTitle>


                        </PageHeaderContainer>

                        {this.getJobsListP()}

                        {this.props.doAdsense == true ? <AdSense.Google
                            style={{textAlign: "center"}}
                            client='ca-pub-5290535689125396'
                            slot='1299884479'
                            format='auto'
                            responsive='true'
                        /> : null}


                        {this.getJobListVersion(jobs, keyword, formattedAddress, toggleLoader)}


                    </>
                ) : (
                    <ListEmptyState
                        app={app}
                        keyword={keyword}
                        formattedAddress={formattedAddress}
                        providedEmail={this.props.getProvidedEmail()}
                    />
                )}

                {app.props.adSenseCo == true ? <div style={{textAlign: "center"}}
                                                    dangerouslySetInnerHTML={{__html: "<script type=\"text/javascript\"> google_ad_client = \"ca-pub-8573325940152694\"; /* botson_336x280_2 */ google_ad_slot = \"botson\\/botson_336x280_2\"; google_ad_width = 336; google_ad_height = 280; </script> <script type=\"text/javascript\" src=\"//pagead2.googlesyndication.com/pagead/show_ads.js\"> </script>"}}></div> : null}


                <KeywordCloudModal
                    isOpen={this.state.showKeywordCloudModal}
                    onRequestClose={() => {
                        this.setState({showKeywordCloudModal: false});
                        //open modal if mobile
                    }}
                    onSelectKeyword={() => {
                    }}
                    onOpenSearchModal={() => {
                        // open the search modal only on mobile resolutions
                        if (window.innerWidth < 1152) {
                            this.setState({showSearchModal: true});
                        }
                    }}
                    app={app}
                />

                <SearchModal
                    isOpen={this.state.showSearchModal}
                    onSubmit={() => {
                    }}
                    onRequestClose={() => {
                        this.setState({showSearchModal: false});
                    }}
                    buttonTitle={"Find Jobs"}
                    origin="job_list"
                    getKeyword={this.props.getKeyword}
                    setKeyword={this.props.setKeyword}
                    getLocation={this.props.getLocation}
                    keyword={keyword}
                    app={app}
                />

                {!this.props.getForcefullyHideEmailPrompts() && jobsPageModalVersionHtml}

                <Gdpr
                    pageVersion={this.props.pageVersion}
                    app={app}
                    jobPageVersion={this.props.pageVersion}>
                </Gdpr>

                {utm_campaign == "confirmEmail" ? <ThankYouModal></ThankYouModal> : null}


            </StandardPage>
        );
    }
}

export default JobListPage;

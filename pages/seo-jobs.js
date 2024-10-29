import JobList from "../components/Jobs/JobList";
import jobSearch from "../lib/jobSearch";
import determineLocation from "../lib/determineLocation";
import styled from "styled-components";
//import "../static/styles/style.scss";
import StandardPage from "../components/StandardPage/StandardPage";
import logEvent from "../lib/logEvent";
import Router from "next/router";
import {NextSeo} from "next-seo";
import KeywordCloudModal from "../components/KeywordCloudModal/KeywordCloudModal";
import SearchModal from "../components/JobSearch/SearchModal";
import OneTap from "../components/OneTap/OneTap";
import ListEmptyState from "../components/ListEmptyState/ListEmptyState";
import OptinModalsEmailModalV3 from "../components/EmailModalV3/EmailModalV3";
import buildJobSearchQueryString from "../lib/buildJobSearchQueryString"
import _ from 'underscore'
import Gdpr from "../components/gdpr/Gdpr";
import AdSense from 'react-adsense';
import React, {Component} from "react";

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
  padding: 13px 16px;
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
            loading: false,
            exitIntent: true,
            redirectToJob: this.props.redirect_to_job || false,
            forcefullyHideEmailPrompts: false,
            showKeywordCloudModal: !props.app.getKeyword(),
            showSearchModal: false,
            hadFirstScrollEvent: false
        };

        this.getPageTitle = this.getPageTitle.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.emailSubmit = this.emailSubmit.bind(this);

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
            let isTitleOnly = null;
            let TjCpcUk = false;
            let neuvooBulk = false;
            let jobsPageModalVersion = jobsPageModalVersionsArr[Math.floor(Math.random() * jobsPageModalVersionsArr.length)];
            let jobListDecorationVersion = listDecorationVersionArr[Math.floor(Math.random() * listDecorationVersionArr.length)];
            let emailRegistrationVersion = emailRegistrationVersionArr[Math.floor(Math.random() * emailRegistrationVersionArr.length)];

            let keyword = null;
            let geo = null;
            let formattedAddress = null;

            let {
                uid,
                ua,
                lat,
                long,
                page,
                feed,
                title,
                flowType,
                redirect_to_job,
                job_id,
                ptitle,
                tags,
                doAdsense,
                utm_campaign,
                location
            } = ctx.query;

            //console.log("geo ", geo);

            try {

                let path = "";

                if (ctx && ctx.req) {
                    path = ctx.req.path;
                } else {

                }


                if (path[path.length - 1] == "/") {
                    path = path.substring(0, path.length - 1);
                }


                let pathArr = path.split("/");


                if (pathArr && pathArr[2] == "jobs") {

                    geo = pathArr[1];

                    if (pathArr.length == 5) {
                        formattedAddress = pathArr[3];
                        keyword = pathArr[4];
                        keyword = keyword.replace("-jobs", "").replace(new RegExp("-", "ig"), " ");
                    } else if (pathArr.length == 4) {

                        let tmpStr = pathArr[3];
                        if (tmpStr.search("-jobs") > -1) {
                            keyword = pathArr[3];
                            keyword = keyword.replace("-jobs", "").replace(new RegExp("-", "ig"), " ");
                        } else {
                            formattedAddress = pathArr[3];
                        }

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

            if ((!lat || !long) && formattedAddress) {
                let latlong = null;

                try {
                    latlong = await determineLocation(formattedAddress);
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

                    // console.log("ctx.req.session", ctx.req.session);

                    if (ctx.req.session.zipApiGb == true) {
                        zipApiGb = true;
                    }

                    if (ctx.req.session.adSense == true) {
                        doAdsense = true;
                    }

                    if (ctx.req.session.searchR) {
                        searchR = ctx.req.session.searchR;
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

                    if (!utm_campaign) {
                        utm_campaign = ctx.req.session.utm_campaign
                    }

                    if (!geo) {
                        geo = ctx.req.session.geo;
                    }

                    if (!uid) {
                        uid = ctx.req.session.uid;
                    }

                    if (keyword !== "" && keyword) {
                        if (!ctx.req.session.keywords) {
                            ctx.req.session.keywords = [];
                        }
                        ctx.req.session.keywords.push(keyword);
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
                    if ("location" in window && window.location.hostname) {
                        hostname = window.location.hostname;
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
                keyword = keyword.toLowerCase().replace("jobs", "").replace("job", "").trim();
            } catch (e) {

            }

            try {
                if (geo == "uk") {
                    geo = "gb";
                }
            } catch (e) {

            }


            console.log(ctx.req.query)

            if (!jobs) {

                let jobSearchParams = {
                    searchR: searchR,
                    isTitleOnly: isTitleOnly,
                    neuvooCaBulkXml: neuvooCaBulkXml,
                    zipApiGb: zipApiGb,
                    TjCpcUk: TjCpcUk,
                    neuvooBulk: neuvooBulk,
                    utm_campaign: utm_campaign,
                    keywords: keyword || "",
                    uid: uid,
                    hostname: hostname,
                    geo: geo,
                    formattedAddress: formattedAddress || "",
                    lat: lat || "",
                    long: long || "",
                    page: page || 1,
                    tags: tags ? tags.split(",") : []
                };

                if (ua && ua.length > 0) {
                    jobSearchParams.ua = ua;
                }

               // console.log("jobSearchParams ", jobSearchParams)

                jobs = await jobSearch(jobSearchParams);


            }


            if (!jobs) {
                jobs = [];
            }


            try {
                if (keyword && keyword.length > 0) {

                    let serpJob = {
                        title: (keyword.charAt(0).toUpperCase() + keyword.slice(1)) + " Jobs (Hiring Now) - FT/PT - Apply Online",
                        body: "Now Accepting Online Applications for Immediate Job Openings! | Up to $25/HR | Apply Now",
                        location: formattedAddress,
                        src: "serp",
                        url: "https://myfirsttab.com/api/redirect-search?sid=10594&cid=Your_click_id&t=" + keyword + " jobs"
                    };

                    if (geo == "gb") {
                        serpJob.body = serpJob.body.replace("$", "£")
                    }

                    jobs.push(serpJob);


                    serpJob = {
                        title: "$8-32/Hr " + (keyword.charAt(0).toUpperCase() + keyword.slice(1)) + " Jobs - No Experience Needed (FT/PT)",
                        body: "Hiring Immediately. Need Entry Level & Experienced. View Local " + keyword + " Openings. All Experience Levels. Training Available. Get Hired Fast.",
                        src: "serp",
                        location: formattedAddress,
                        url: "https://myfirsttab.com/api/redirect-search?sid=10594&cid=Your_click_id&t=" + keyword + " jobs"
                    };

                    if (geo == "gb") {
                        serpJob.body = serpJob.body.replace("$", "£");
                        serpJob.title = serpJob.title.replace("$", "£");
                    }

                    jobs.push(serpJob);


                    serpJob = {
                        title: "Full time and part time " + (keyword.charAt(0).toUpperCase() + keyword.slice(1)) + " to start ASAP in " + formattedAddress,
                        body: "Flexible hours. Great earnings. Make £12-£18/hr",
                        src: "serp",
                        location: formattedAddress,
                        url: "https://myfirsttab.com/api/redirect-search?sid=10594&cid=Your_click_id&t=" + keyword + " jobs"
                    };

                    if (geo == "gb") {
                        serpJob.body = serpJob.body.replace("$", "£");
                        serpJob.title = serpJob.title.replace("$", "£");
                    }

                    jobs.push(serpJob);

                    /*
                                                            serpJob = {
                                            title: (keyword.charAt(0).toUpperCase() + keyword.slice(1)) + " jobs 14 urgent Openings. Apply Now",
                                            body: "We've just got new applications for " + (keyword.charAt(0).toUpperCase() + keyword.slice(1)) + " Jobs. Don't miss out!",
                                            src: "serp",
                                            url: "https://myfirsttab.com/api/redirect-search?sid=10594&cid=Your_click_id&t=" + keyword + " jobs"
                                        };

                                        if (geo == "gb") {
                                            serpJob.body = serpJob.body.replace("$", "£");
                                            serpJob.title = serpJob.title.replace("$", "£");
                                        }

                                        jobs.push(serpJob);*/


                }


                /*let serpJob = {
                    title: "This is the year to start a home-based business!",
                    body: "2020's hottest home-based business opportunities - Register now!",
                    location: formattedAddress,
                    src: "workFromHome",
                    url: "https://www.mb104.com/lnk.asp?o=18468&c=918273&a=191204&k=43417D6F674167DE5FDF7CF184B3A41D&l=19688"
                };

                jobs.push(serpJob);*/


                /* let serpJob = {
                     CTA: "Get your free CV review",
                     title: "Upload Your CV For Free | Receive An Expert Review‎",
                     body: "Improve Your Resume Now With Professional Feedback From TopCv. Get Your Job Search Back on Track Today! 2x More Job Interviews. Job Search Experts. Certified Writers. Satisfaction Guaranteed. Over 1M Resumes Evaluated.",
                     location: formattedAddress,
                     src: "cvReview",
                     url: "https://www.topcv.co.uk/cv-review?pt=54m8qafn9DhTA&utm_medium=referral&utm_source=Job-Bear+UK"
                 };*/

                let serpJob = {
                    CTA: "Join Today For FREE!",
                    title: "Make money in your spare time with 20Cogs",
                    body: "Turn your spare time into big rewards by completing Competitions, Offers, Gaming and Surveys.",
                    location: formattedAddress,
                    src: "cvReview",
                    url: "http://monetisetrk5.co.uk/?a=14421&c=23820&s1="
                };

                jobs.push(serpJob);

            } catch (e) {

            }


            return {
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

    getPageTitle() {
        let title = "";
        let {formattedAddress, jobs, keyword} = this.props;
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

    getJobListTitle() {
        let title = "";
        let {formattedAddress, jobs, keyword} = this.props;
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

    componentDidMount() {


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

    emailSubmit(email) {
        if (!email) {
            logEvent("error-missing-email", {origin: "email-popup"});
            return;
        }
        logEvent("click-email_submit", {origin: "premium"});
        this.props.app.setProvidedEmail(email);
    }

    OptinModalsEmailModalV3emailSubmit(email) {
        // console.log(`email:` + email);
        this.emailSubmit(email);


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

        //console.log("Location ", Location);
        //console.log("Keyword ", Keyword);

        //console.log("this.initialLocation ", this.initialLocation);
        // console.log("this.initialKeyword ", this.initialKeyword);


        if (Location == this.initialLocation && keyword == this.initialKeyword) {

            //console.log("keyword and location are the same dont refresh jobs ");


        } else {
            //console.log("keyword and location are not the same do refresh jobs ");


            let params = _.omit(Router.query, 'keyword', 'formattedAddress', 'geo', 'lat', 'long');
            params = {...params, keyword, ...this.props.app.state.location};

            //console.log("OptinModalsEmailModalV3emailSubmit params", params);

            Router.push(`/jobs?${buildJobSearchQueryString(params)}`);

        }


    }

    trackFBsearchEv() {

        try {

            let searchString = this.props.getKeyword() || "";

            try {
                searchString = searchString.toLowerCase().replace("jobs", "").replace("job", "").trim();
            } catch (e) {

            }



        } catch (e) {

        }
    }

    render() {

        this.trackFBsearchEv();

        try {
            if (process.browser) {
                this.trackJobView();
            }
        } catch (e) {

        }

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

        var jobsPageModalVersionHtml = "";

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
            }
        }


        //console.log("app.props.adSenseCo ", app.props.adSenseCo);

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
                            content: keyword || ""
                        }
                    ]}
                />

                {app.props.adSenseCo == true ? <div style={{textAlign: "center"}}
                                                    dangerouslySetInnerHTML={{__html: "<script type=\"text/javascript\"> google_ad_client = \"ca-pub-8573325940152694\"; /* botson_336x280_1 */ google_ad_slot = \"botson\\/botson_336x280_1\"; google_ad_width = 336; google_ad_height = 280; </script> <script type=\"text/javascript\" src=\"//pagead2.googlesyndication.com/pagead/show_ads.js\"> </script>"}}></div> : null}

                {jobs.length > 0 ? (
                    <>

                        <PageTitle onClick={() => {
                            try {
                                this.props.app.OpenModalSearch("pageTitle");
                            } catch (e) {

                            }

                        }}
                                   dangerouslySetInnerHTML={{__html: this.getJobListTitle()}}>

                        </PageTitle>

                        {this.props.doAdsense == true ? <AdSense.Google
                            style={{textAlign: "center"}}
                            client='ca-pub-5290535689125396'
                            slot='1299884479'
                            format='auto'
                            responsive='true'
                        /> : null}


                        <JobList

                            jobs={jobs}
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
                            app={app}
                            jobListPage={this.props.page}
                        />
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

                <OneTap
                    app={app}
                >

                </OneTap>

            </StandardPage>
        );
    }
}

export default JobListPage;

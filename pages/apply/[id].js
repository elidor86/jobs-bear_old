import React, {Component} from "react";
import parseHTML from "html-react-parser";
import EmailModalV3 from "../../components/EmailModalV3/EmailModalV3";
import StandardPage from "../../components/StandardPage/StandardPage";

import Router from "next/router";
import logEvent from "../../lib/logEvent";
import handleJobClick from "../../lib/handleJobClick";


import {NextSeo} from "next-seo";



import SignUp from "../../components/JobPages/SignUp/SignUp";
import SignUpWithJobs from "../../components/JobPages/SignUpWithJobs/SignUp";


import jobSearch from "../../lib/jobSearch";



const PageVersionsArr = [
    // "Fake",
    //"SignUp",
    "SignUpWithJobs",
    //"ApplyV2",
    //"BasicApply",
    //"UsCpa",
    //"Basic"
];

const OptInModalVersionArr = [
    //"bonus",
    //"signup",
    "emily"
];

function buildQuery(queryParams, flowType, params) {
    let query = [];

    for (var key in queryParams) {
        if (queryParams.hasOwnProperty(key)) {
            if (queryParams[key] !== "") {
                query.push(
                    encodeURIComponent(key) + "=" + encodeURIComponent(queryParams[key])
                );
            }
        }
    }

    if (params && typeof params == "object") {
        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                if (params[key] !== "") {
                    query.push(
                        encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
                    );
                }
            }
        }
    }


    query.push("page=1");
    const clientVars = window.ClientVars;

    if (clientVars) {
        query.push(`uid=${clientVars.uid}`);
        query.push(`geo=${clientVars.geo}`);

        clientVars.gclid ? query.push(`gclid=${clientVars.gclid}`) : null;
        clientVars.utm_source ? query.push(`utm_source=${clientVars.utm_source}`) : null;
        clientVars.utm_campaign ? query.push(`utm_campaign=${clientVars.utm_campaign}`) : null;
    }

    return query.join("&");
}

function safeParseHTML(markup) {
    let parsedHtml = markup;
    try {
        parsedHtml = parseHTML(markup);
    } catch (error) {
        console.log(`error in safeParseHTML. \nmarkup: ${markup}`);
    }
    return parsedHtml;
}

class JobPage extends React.Component {

    constructor(props) {

        //console.log(props)

        super(props);

        this.didLogFirstClick = false;

        this.state = {
            jobs: [],
            nextJobId: "",
            keyword: "",
            lat: "",
            long: ""
        };


    }

    emailSubmit(email, origin, newTab, name, doJobClick, url, title, jobSrc, ppc, jobBody) {


        logEvent("click-email_submit", {origin: "premium"});

        this.props.app.setProvidedEmail(email);

        if (doJobClick === false) {

        } else {
            handleJobClick(
                url || this.props.url,
                title || this.props.title,
                jobSrc || this.props.src,
                this.props.cpc || this.props.ppc,
                newTab,
                jobBody || this.props.body
            );
        }


        if (newTab == false) {

        } else {
            Router.push(
                `/jobs?${buildQuery(this.props.searchParams, this.state.flowType)}`
            );
        }


    }

    noThanks(newTab, url, title, jobSrc, ppc, body) {
        // console.log("noThanks");

        handleJobClick(
            url || this.props.url,
            title || this.props.title,
            jobSrc || this.props.src,
            this.props.cpc || this.props.ppc,
            newTab,
            body || this.props.body
        );

        if (newTab === false) {

        } else {
            Router.push(
                `/jobs?${buildQuery(this.props.searchParams, this.state.flowType, {optinModal: false})}`
            );
        }


    }

    moreJobsClick() {
        // console.log("noThanks");

        Router.push(
            `/jobs?${buildQuery(this.props.searchParams, this.state.flowType)}`
        );

    }

    goToJob(url, title, jobSrc, ppc, body) {
        // console.log("goToJob");

        handleJobClick(
            url || this.props.url,
            title || this.props.title,
            jobSrc || this.props.src,
            this.props.cpc || this.props.ppc,
            null,
            body || this.props.body
        );

        Router.push(
            `/jobs?${buildQuery(this.props.searchParams, this.state.flowType)}`
        );

    }

    getListUrl(params) {
        return `https://jobs-bear.com/jobs?${buildQuery(this.props.searchParams, this.state.flowType, params)}`
    }

    goToList(params) {

        let searchParams = this.props.searchParams;

        let keyword = this.props.app.getKeyword();
        let location = this.props.app.getLocation();


        try {

            if ("keywordFromEmailOptin" in window && keywordFromEmailOptin.length > 0) {
                keyword = window.keywordFromEmailOptin;
                delete window.keywordFromEmailOptin;
                delete searchParams.tags;
            }

        } catch (e) {

        }


        if (keyword && keyword.length > 0) {
            searchParams.keyword = keyword;
        }

        if (location && location.length > 0) {
            searchParams.formattedAddress = location;
        }

        let url = `/jobs?${buildQuery(searchParams, this.state.flowType, params)}`;
        //console.log("goToList url ", url);

        Router.push(url);

    }

    logFirstClick() {


    }


    fetchJobs() {

        //console.log("fetchJobs jobpage");

        var self = this;

        var tags = null;
        var lat = null;
        var long = null;
        var utm_campaign = null;
        var formattedAddress = null;


        try {
            utm_campaign = ClientVars.utm_campaign || null;
        } catch (e) {

        }

        if (this.props.searchParams) {

            if (this.props.searchParams.tags) {
                tags = this.props.searchParams.tags;
            }

            if (this.props.searchParams.lat && this.props.searchParams.long) {
                lat = this.props.searchParams.lat;
                long = this.props.searchParams.long;
            } else {

                try {

                    if (ClientVars && ClientVars.locpysical && ClientVars.locpysical.lat && ClientVars.locpysical.long) {
                        lat = ClientVars.locpysical.lat;
                        long = ClientVars.locpysical.long;
                    }

                } catch (e) {

                }
            }

            if (this.props.searchParams.formattedAddress) {
                formattedAddress = this.props.searchParams.formattedAddress;
            }


        } else {
            return
        }

        try {

            var params = {
                utm_campaign: utm_campaign,
                size: 7,
                lat: lat,
                long: long,
                uid: window.ClientVars.uid,
                geo: ClientVars.geo,
                formattedAddress: formattedAddress || "",
                page: 1,
                tags: tags
            };

            jobSearch(params).then(function (jobs) {

                // console.log("jobs ", jobs);

                if (jobs && jobs.length >= 2) {
                    self.setState({jobs: jobs});
                    try {
                        //window.Jobs = jobs;
                    } catch (e) {

                    }
                }

            }).then(function (err) {

            });

        } catch (e) {

        }


    }


    static async getInitialProps(ctx) {

        // console.log("getInitialProps ctx, ");


        try {
            const {id, feed, title, flowType, ptitle, tags} = ctx.query;

            let pageVersion = PageVersionsArr[Math.floor(Math.random() * PageVersionsArr.length)];
            let OptInModalVersion = OptInModalVersionArr[Math.floor(Math.random() * OptInModalVersionArr.length)];

            //console.log("ctx.req.query.v ", ctx.req.query.pageVersion);
            //console.log("PageVersionsArr[ctx.req.query.v] ", PageVersionsArr);
            //console.log("PageVersionsArr[ctx.req.query.v] ", PageVersionsArr.indexOf(ctx.req.query.pageVersion) );

            try {
                if (ctx.req && ctx.req.query && ctx.req.query.pageVersion && ctx.req.query.pageVersion.length > 0 && PageVersionsArr.indexOf(ctx.req.query.pageVersion) > -1) {
                    pageVersion = ctx.req.query.pageVersion;
                }
            } catch (e) {

            }


            let geoIPLocation;

            if (ctx.req && ctx.req.session) {
                geoIPLocation = ctx.req.session.geoIPLocation;
            }
            // console.log(`id: ${id}`)

            let demoJobs = {
                "title": "Amazon Warehouse Assistant (Overnight Shifts Available)",
                "body": "Warehouse Team Member (Seasonal, Part-Time, Full-Time, Flexible Hours)Shifts: Overnight, Sunrise, Day, Evening, WeekendLocation Avenel NJJob opportunities vary by location. We update postings daily with open positions.Salary Earn $15 or more Amazon remains open as an essential service to serve our communities delivering critical supplies directly to the doorsteps of people who need them.Job Description AMAZON FRESH WAREHOUSES – Amazon Fresh is our grocery delivery service.  We offer fresh, frozen, and packaged groceries, so you’ll work in varying climates from room temperature to freezer environments. We will provide you with the right gear to stay warm during the colder parts of your shift. If you need flexibility in your schedule, this job allows you to choose from available shifts each week to create your own.* Flexible hours, a reliable pay rate, and no surprises!*Full-time and part-time roles with set schedules may also be available. Apply now.",
                "city": "Bound Brook",
                "zip": "",
                "state": "NJ",
                "referencenumber": "9ea270d9402e6e8c2177a2845bc50531",
                "src": "PandologicAmazonXmlCpc",
                "url": "http://amazonhvh.thejobnetwork.com/Job/293987847?etd=LAFFER2UEHPRB46D5QPEX4D5JKKQMQBJIMDKMICVMSZVDXAGP5VNGLV62ZTIXN6HXKXAFQCXD3VTYQCFWZOADTV74SF6UV46IDKZZGWTASIPS4KAH5QXEIS7RC5EDQV3DLIF6TEDAS4HP344SMT3OPA5M46F356QIOWY25Y%3d",
                "category": "Logistics",
                "company": "Amazon Workforce Staffing",
                "date": "2020-08-04T14:26:03.788Z",
                "dbInsert": "2020-08-04T14:26:03.788Z",
                "hash": "9ea270d9402e6e8c2177a2845bc50531",
                "extId": "293987847",
                "cpc": 1,
                "isPartTime": true,
                "latlon": {
                    "lat": 40.56844,
                    "lon": -74.53849
                },
                "haveLoc": true,
                "locationStr": "Bound Brook, NJ"
            }

            // console.log(`fetched this job object: ${JSON.stringify(jobListing)}`);

            let job = {
                title: demoJobs.title,
                src: demoJobs.src,
                body: demoJobs.body,
                city: demoJobs.city,
                url: demoJobs.url,
                company: demoJobs.company,
                jobPostingDate: demoJobs.date,
                cpc: demoJobs.cpc,
                views: Math.floor(Math.random() * (633 - 10 + 1)) + 10,
                searchParams: {
                    keyword: "amazon warehouse",

                    lat: demoJobs.latlon.lat,
                    long: demoJobs.latlon.lon
                }
            };
            return {...job, flowType, ptitle, geoIPLocation, demoJobs, pageVersion, OptInModalVersion};

        } catch (error) {

            console.trace("error getInitialProps page job", error);

            if (process.browser) {
                logEvent("error", {value: error.message});
            }
        }
    }

    componentDidMount() {

        this.props.hideLoader();

        if (this.props.searchParams) {
            const keyword = this.props.searchParams.keyword || "undefined";
            this.props.setKeyword(keyword);
        }

        this.props.setPage("job_post");

        this.props.app.setAB("jobPageVersion", this.props.pageVersion);
        this.props.app.setAB("JobPageOptinModal", this.props.OptInModalVersion);


        // console.log("componentDidMount prop", this.props);

        if (!this.props.title || this.props.title.length <= 1) {
            //this.goToList({optinModal: false});
        }

        this.props.app.JobPageGoToList = this.goToList.bind(this);

        this.fetchJobs();
    }

    componentWillUnmount() {

    }

    componentDidCatch(error, info) {
        console.log(`error in [id].js.\n error: ${error}\n info: ${info}`);
    }

    render() {


        var {
            title,
            body,
            city,
            url,
            geoIPLocation,
            company,
            views,
            searchParams,
            jobPostingDate,
            ptitle,
            app
        } = this.props;


        let doAdsense = false;

        if ("adSense" in app.props) {
            doAdsense = app.props.adSense;
        }

        if (searchParams && searchParams.formattedAddress) {
            city = searchParams.formattedAddress;
        }

        //console.log("searchParams ",searchParams)


        const jobScehme = {
            "@context": "https://schema.org/",
            "@type": "JobPosting",
            title: title || "",
            datePosted: jobPostingDate || "",
            description: body ? body.replace(/<[^>]*>?/gm, "") : "",
            hiringOrganization: {
                "@type": "Organization",
                name: title || ""
            },
            jobLocation: {
                "@type": "Place",
                address: {
                    "@type": "PostalAddress",
                    streetAddress: city || "",
                    addressCountry: geoIPLocation || ""
                }
            }
        };

        var versionHtml = "";
        var modalVersionHtml = "";


        if (this.props.pageVersion == "BasicApply") {
            versionHtml =
                <ApplyV2
                    emailSubmit={this.emailSubmit.bind(this)}
                    noThanks={this.noThanks.bind(this)}
                    goToJob={this.goToJob.bind(this)}
                    app={app}
                    city={this.props.city}
                    company={this.props.company}
                    views="36"
                    title={this.props.title}
                    body={this.props.body}>
                </ApplyV2>

            modalVersionHtml =
                <EmailModalV3
                    emailSubmit={this.emailSubmit.bind(this)}
                    app={app}
                    keyword={this.props.searchParams.keyword}
                    location={this.props.searchParams.formattedAddress}
                >
                </EmailModalV3>
        } else if (this.props.pageVersion == "SignUp") {
            versionHtml =
                <SignUp
                    keyword={this.props.searchParams.keyword}
                    OptInModalVersion={this.props.OptInModalVersion}
                    emailSubmit={this.emailSubmit.bind(this)}
                    noThanks={this.noThanks.bind(this)}
                    goToJob={this.goToJob.bind(this)}
                    goToList={this.goToList.bind(this)}
                    app={app}
                    city={city}
                    company={this.props.company}
                    views="36"
                    title={this.props.title}
                    body={this.props.body}>
                </SignUp>

            modalVersionHtml =
                <EmailModalV3
                    goToList={this.goToList.bind(this)}
                    title={this.props.title}
                    emailSubmit={this.emailSubmit.bind(this)}
                    app={app}
                    keyword={this.props.searchParams.keyword}
                    location={this.props.searchParams.formattedAddress}
                >
                </EmailModalV3>
        } else if (this.props.pageVersion == "SignUpWithJobs") {
            versionHtml =
                <SignUpWithJobs
                    getListUrl={this.getListUrl.bind(this)}
                    jobs={this.state.jobs}
                    keyword={this.props.searchParams.keyword}
                    OptInModalVersion={this.props.OptInModalVersion}
                    emailSubmit={this.emailSubmit.bind(this)}
                    noThanks={this.noThanks.bind(this)}
                    goToJob={this.goToJob.bind(this)}
                    goToList={this.goToList.bind(this)}
                    app={app}
                    city={city}
                    company={this.props.company}
                    views="36"
                    title={this.props.title}
                    body={this.props.body}>
                </SignUpWithJobs>

            modalVersionHtml =
                <EmailModalV3
                    goToList={this.goToList.bind(this)}
                    title={this.props.title}
                    emailSubmit={this.emailSubmit.bind(this)}
                    app={app}
                    keyword={this.props.searchParams.keyword}
                    location={this.props.searchParams.formattedAddress}
                >
                </EmailModalV3>
        }


        return (
            <StandardPage
                getKeyword={this.props.getKeyword}
                setKeyword={this.props.setKeyword}
                setProvidedEmail={this.props.setProvidedEmail}
                getProvidedEmail={this.props.getProvidedEmail}
                origin="job_page"
                hideBottomEmailBar={true}
                app={app}>

                <NextSeo
                    title={
                        ptitle || `${title} | ${searchParams ? searchParams.tags : ""}`
                    }
                    description={body ? body.replace(/<[^>]*>?/gm, "") : ""}
                    additionalMetaTags={[
                        {
                            property: "keywords",
                            content: searchParams ? searchParams.tags : ""
                        }
                    ]}
                />


                {versionHtml}


            </StandardPage>
        );
    }
}

export default JobPage;

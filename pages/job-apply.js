import StandardPage from "../components/StandardPage/StandardPage";

import Router from "next/router";
import logEvent from "../lib/logEvent";
import handleJobClick from "../lib/handleJobClick";
import jobSearch from "../lib/jobSearch";

import AdSense from "react-adsense";
import {NextSeo} from "next-seo";
import Head from "next/head";


import SignUpWithJobs from "../components/JobPages/SignUpWithJobs/SignUp";

import Gdpr from "../components/gdpr/Gdpr";

import React from "react";

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
            this.props.app.goToPage({
                newWindow: false,
                page: "jobs"
            })
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
            this.props.app.goToPage({
                newWindow: false,
                page: "jobs"
            })
        }


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

        this.props.app.goToPage({
            newWindow: false,
            page: "jobs"
        })

    }

    getListUrl(params) {

        let URL = this.props.app.goToPage({
            urlOnly: true,
            newWindow: false,
            page: "jobs"
        })

        return URL;

    }

    goToList(params) {


        this.props.app.goToPage({
            newWindow: false,
            page: "jobs"
        })


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

//this.props.searchParams.keyword

        try {
            utm_campaign = this.props.searchParams.utm_campaign || null;
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

            let params = {
                keywords: this.props.searchParams.keyword,
                utm_campaign: utm_campaign,
                size: 7,
                lat: lat,
                long: long,
                uid: window.ClientVars.uid,
                geo: ClientVars.geo,
                formattedAddress: formattedAddress || "",
                page: 1,
                tags: []
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

        let hostname = "";

        try {
            const {id, feed, title, flowType, ptitle, botName, tags, keyword, utm_campaign, utm_source, formattedAddress, gclid, firstName, lastName, geo, lat, long} = ctx.query;


            let geoIPLocation;

            if (ctx.req && ctx.req.session && ctx.req.session.geoIPLocation) {
                geoIPLocation = ctx.req.session.geoIPLocation;
            }

            try {
                if (ctx.req.hostname && ctx.req.hostname.length > 0) {
                    hostname = ctx.req.hostname;
                }
            } catch (e) {

            }


            let searchParams = {
                utm_source: utm_source,
                page: 1,
                hostname: hostname,
                utm_campaign: utm_campaign,
                utm_medium: "jobApply",
                botName: botName || "jobs-bear",
                geo: geo,
                tags: [],
                keyword: keyword || "",
                lat: lat,
                long: long,
                formattedAddress: formattedAddress
            }

            let jobs = await jobSearch(searchParams);


            let qToSerp = new String(keyword);


            let job = {
                body: "Now Accepting Online Applications for Immediate Job Openings! | Up to $25/HR | Apply Now",
                title: (qToSerp.charAt(0).toUpperCase() + qToSerp.slice(1)) + " Jobs (Hiring Now) - FT/PT - Apply Online",
                src: "serp",
                location: formattedAddress,
                url: "https://myfirsttab.com/api/redirect-search?sid=10594&cid=Your_click_id&t=" + qToSerp + " jobs"
            }

            if (jobs && jobs[0]) {

                let tmpJob = jobs[0];

                job = {
                    title: tmpJob.title,
                    src: tmpJob.src,
                    body: tmpJob.body,
                    city: tmpJob.city,
                    url: tmpJob.url,
                    company: tmpJob.company,
                    jobPostingDate: tmpJob.date,
                    cpc: tmpJob.cpc,
                    views: Math.floor(Math.random() * (633 - 10 + 1)) + 10,
                    searchParams: searchParams
                };

                try {
                    job.body = job.body.split(" ").splice(0, 50).join(" ");
                } catch (e) {

                }


            }

            return {...job, flowType, ptitle, geoIPLocation, searchParams};

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
            const keyword = this.props.searchParams.keyword;
            this.props.setKeyword(keyword);
        }

        this.props.setPage("job_search");

        // this.props.app.setAB("jobPageVersion", this.props.pageVersion);
        // this.props.app.setAB("JobPageOptinModal", this.props.OptInModalVersion);


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


        let {
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

        let versionHtml = "";

        versionHtml =
            <SignUpWithJobs
                displayOurPartner={false}
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


        return (
            <StandardPage
                getKeyword={this.props.getKeyword}
                setKeyword={this.props.setKeyword}
                setProvidedEmail={this.props.setProvidedEmail}
                getProvidedEmail={this.props.getProvidedEmail}
                origin="job_list"
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

                <Head>
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{__html: JSON.stringify(jobScehme)}}
                    ></script>
                </Head>

                {doAdsense == true ? <AdSense.Google
                    style={{textAlign: "center"}}
                    client='ca-pub-5290535689125396'
                    slot='1299884479'
                    format='auto'
                    responsive='true'
                /> : null}

                {versionHtml}


                <Gdpr
                    pageVersion={this.props.pageVersion}
                    app={app}
                    jobPageVersion={this.props.pageVersion}>
                </Gdpr>

            </StandardPage>
        );
    }
}

export default JobPage;

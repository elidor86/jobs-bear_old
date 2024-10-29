import React, {Component} from "react";
import parseHTML from "html-react-parser";

import StandardPage from "../components/StandardPage/StandardPage";

import Router from "next/router";
import logEvent from "../lib/logEvent";


import {NextSeo} from "next-seo";


import Fake from "../components/JobPages/FakeJob/Fake";

import Gdpr from "../components/gdpr/Gdpr";


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
    const clientVars = JSON.parse(document.getElementById("session").textContent)
        .clientVars;
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

        Router.push(
            `/jobs?${buildQuery(this.props.searchParams, this.state.flowType, {optinModal: false})}`
        );


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


    static async getInitialProps(ctx) {

        // console.log("getInitialProps ctx, ");


        try {
            const {uid, keyword, formattedAddress, lat, long, email, geo, JobTitle} = ctx.query;

            return {
                geo,
                JobTitle,
                email,
                lat,
                long,
                uid,
                searchParams: {
                    keyword,
                    formattedAddress,
                    lat,
                    long
                }
            }

        } catch (error) {


        }
    }

    componentDidMount() {

        this.props.hideLoader();

        if (this.props.searchParams) {
            const keyword = this.props.searchParams.keyword || "";
            this.props.setKeyword(keyword);
        }


        this.props.app.JobPageGoToList = this.goToList.bind(this);


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


        let versionHtml =
            <Fake
                JobTitle={this.props.JobTitle}
                keyword={this.props.searchParams.keyword}
                emailSubmit={this.emailSubmit.bind(this)}
                noThanks={this.noThanks.bind(this)}
                goToJob={this.goToJob.bind(this)}
                goToList={this.goToList.bind(this)}
                app={app}
                views="36"
            >
            </Fake>;


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
                    title="Apply Now"
                    description=""
                />

                {app.props.adSenseCo == true ? <div style={{textAlign: "center"}}
                                                    dangerouslySetInnerHTML={{__html: "<script type=\"text/javascript\"> google_ad_client = \"ca-pub-8573325940152694\"; /* botson_336x280_1 */ google_ad_slot = \"botson\\/botson_336x280_1\"; google_ad_width = 336; google_ad_height = 280; </script> <script type=\"text/javascript\" src=\"//pagead2.googlesyndication.com/pagead/show_ads.js\"> </script>"}}></div> : null}


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

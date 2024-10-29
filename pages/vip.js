
import parseHTML from "html-react-parser";

import StandardPage from "../components/StandardPage/StandardPage";

import Router from "next/router";
import logEvent from "../lib/logEvent";


import {NextSeo} from "next-seo";

import VipBear from "../components/Vip/Bear";

import Gdpr from "../components/gdpr/Gdpr";
import React from "react";


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


        super(props);


        this.state = {};


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


        try {

            let VersionName = null;

            let FeaturesArr = [
                {
                    side: "left",
                    title: "CV Distribution",
                    body: "Land your next job from job groups on Facebook and LinkedIn. We will distribute your CV in leading job-seeking platforms",
                    img: "/static/images/img-distribution.svg"
                },
                {
                    side: "right",
                    title: "Online course bundle",
                    body: "Watch 10 hours of hand-picked  videos that will prepare you for your next job. Watch at home or on-the-go",
                    img: "/static/images/img-video.svg"
                },
                {
                    side: "left",
                    title: "Get 1st priority on application",
                    body: "Enjoy VIP ONLY instant CV dispatch. Beat the competition on relevant job posts. Non-VIP CVs will be sent after 2 hours",
                    img: "/static/images/img-priority.svg"
                },
                {
                    side: "right",
                    title: "View job postings before anyone else",
                    body: "Get ahead of the competition by being a registered VIP user. View the jobs board’s new postings 2 hours before the rest",
                    img: "/static/images/img-viewjobs.svg"
                },
                {
                    side: "left",
                    title: "Get notified when someone views your CV",
                    body: "Receive Email and SMS notifications whenever someone is interested in your CV",
                    img: "/static/images/vip-notifiy.svg"
                }
            ];

            let PricesArr = [2.99, 8.99, 20];

            let MoneyVersionArr = ["beer", "general"];


            let {
                geo,
                Price,
                MoneyVersion
            } = ctx.query;


            if (!geo) {
                geo = "gb";
            }

            if (ctx.req) {

                try {
                    if (ctx.req.session && ctx.req.session.vipConfig && !Price) {

                        Price = ctx.req.session.vipConfig.Price;
                        MoneyVersion = ctx.req.session.vipConfig.MoneyVersion;

                    }
                } catch (e) {

                }

            } else {

                try {

                    if (window.ClientVars.vipConfig && window.ClientVars.vipConfig.MoneyVersion) {
                        Price = window.ClientVars.vipConfig.Price;
                        MoneyVersion = window.ClientVars.vipConfig.MoneyVersion;
                    }

                } catch (e) {

                }

            }


            if (!MoneyVersion || !Price) {
                Price = PricesArr[Math.floor(Math.random() * PricesArr.length)];

                if (Price <= 5) {
                    MoneyVersion = MoneyVersionArr[Math.floor(Math.random() * MoneyVersionArr.length)];
                } else {
                    MoneyVersion = "general"
                }
            }


            try {
                VersionName = Price + "_" + MoneyVersion + "_base";
            } catch (e) {

            }


            if (ctx.req) {

                try {
                    if (ctx.req.session) {
                        ctx.req.session.vipConfig = {
                            VersionName: VersionName,
                            Price: Price,
                            MoneyVersion: MoneyVersion
                        }
                    }
                } catch (e) {

                }

            }

            return {
                VersionName,
                Price,
                FeaturesArr,
                MoneyVersion,
                geo
            };

        } catch (error) {

            if (process.browser) {
                logEvent("error", {value: error.message});
            }
            console.trace("vip error", error);

        }
    }


    componentDidMount() {

        this.props.hideLoader();


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


        let FeaturesArr = [
            {
                side: "left",
                title: "CV Distribution",
                body: "Land your next job from job groups on Facebook and LinkedIn. We will distribute your CV in leading job-seeking platforms",
                img: "/static/images/img-distribution.svg"
            },
            {
                side: "right",
                title: "Online course bundle",
                body: "Watch 10 hours of hand-picked  videos that will prepare you for your next job. Watch at home or on-the-go",
                img: "/static/images/img-video.svg"
            },
            {
                side: "left",
                title: "Get 1st priority on application",
                body: "Enjoy VIP ONLY instant CV dispatch. Beat the competition on relevant job posts. Non-VIP CVs will be sent after 2 hours",
                img: "/static/images/img-priority.svg"
            },
            {
                side: "right",
                title: "View job postings before anyone else",
                body: "Get ahead of the competition by being a registered VIP user. View the jobs board’s new postings 2 hours before the rest",
                img: "/static/images/img-viewjobs.svg"
            },
            {
                side: "left",
                title: "Get notified when someone views your CV",
                body: "Receive Email and SMS notifications whenever someone is interested in your CV",
                img: "/static/images/vip-notifiy.svg"
            },
            {
                side: "right",
                title: "Career Change Counseling",
                body: "It is never too late to switch your career. Explore your options, consult with experts and pick the career you like",
                img: "/static/images/img-careerchange.svg"
            },
            {
                side: "left",
                title: "4-in-1 Mentorship Bundle",
                body: "Connect with expert mentors to update your CV, Cover Letter and LinkedIn profile, and prepare for job Interviews",
                img: "/static/images/img-mentor.svg"
            }
        ];


        let versionHtml =
            <VipBear
                geo={this.props.geo}
                app={app}
                Price={this.props.Price}
                MoneyVersion={this.props.MoneyVersion}
                FeaturesArr={this.props.FeaturesArr}
            >
            </VipBear>;


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
                    title="Jobs-Bear VIP"
                    description=""
                />


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

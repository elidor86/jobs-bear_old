import parseHTML from "html-react-parser";
import EmailModalV3 from "../../components/EmailModalV3/EmailModalV3";
import StandardPage from "../../components/StandardPage/StandardPage";
import fetchJobById from "../../lib/fetchJobById";
import Router from "next/router";
import logEvent from "../../lib/logEvent";
import handleJobClick from "../../lib/handleJobClick";



import {NextSeo} from "next-seo";
import Head from "next/head";


import PremiumJob from "../../components/JobPages/Premium/PremiumJob";
import Social from "../../components/JobPages/Social/Social";

import ApplyV2 from "../../components/JobPages/ApplyV2/Apply";
import Basic from "../../components/JobPages/Basic/Basic";
import SignUp from "../../components/JobPages/SignUp/SignUp";
import SignUpWithJobs from "../../components/JobPages/SignUpWithJobs/SignUp";
import UsCpa from "../../components/JobPages/UsCpa/UsCpa";
import Fake from "../../components/JobPages/Fake/Fake";


import Gdpr from "../../components/gdpr/Gdpr";
import jobSearch from "../../lib/jobSearch";

const PageVersionsArr = [
    // "Fake",
    "SignUp",
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
    const clientVars = JSON.parse(document.getElementById("session").textContent)
        .clientVars;
    if (clientVars) {
        query.push(`uid=${clientVars.uid}`);
        query.push(`geo=${clientVars.geo}`);

        clientVars.gclid ? query.push(`gclid=${clientVars.gclid}`) : null;
        clientVars.utm_source
            ? query.push(`utm_source=${clientVars.utm_source}`)
            : null;
        clientVars.utm_campaign
            ? query.push(`utm_campaign=${clientVars.utm_campaign}`)
            : null;
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

    emailSubmit(email, origin, newTab, name, doJobClick, url, title, jobSrc, ppc) {


        logEvent("click-email_submit", {origin: "premium"});

        this.props.app.setProvidedEmail(email);

        if (doJobClick === false) {

        } else {
            handleJobClick(
                url || this.props.url,
                title || this.props.title,
                jobSrc || this.props.src,
                this.props.cpc || this.props.ppc,
                newTab
            );
        }


        if (newTab == false) {

        } else {
            Router.push(
                `/jobs?${buildQuery(this.props.searchParams, this.state.flowType)}`
            );
        }


    }

    noThanks(newTab, url, title, jobSrc, ppc) {
        // console.log("noThanks");

        handleJobClick(
            url || this.props.url,
            title || this.props.title,
            jobSrc || this.props.src,
            this.props.cpc || this.props.ppc,
            newTab
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

    goToJob(url, title, jobSrc, ppc) {
        // console.log("goToJob");

        handleJobClick(
            url || this.props.url,
            title || this.props.title,
            jobSrc || this.props.src,
            this.props.cpc || this.props.ppc
        );

        Router.push(
            `/jobs?${buildQuery(this.props.searchParams, this.state.flowType)}`
        );

    }

    getListUrl(params) {
        return `https://jobs-bear.com/jobs?${buildQuery(this.props.searchParams, this.state.flowType, params)}`
    }

    goToList(params) {

        Router.push(
            `/jobs?${buildQuery(this.props.searchParams, this.state.flowType, params)}`
        );

    }

    logFirstClick() {


    }


    fetchJobs() {

        var self = this;

        var tags = null;
        var lat = null;
        var long = null;
        var formattedAddress = null;

        if (this.props.searchParams) {

            if (this.props.searchParams.tags) {
                tags = this.props.searchParams.tags;
            }

            if (this.props.searchParams.lat && this.props.searchParams.long) {
                lat = this.props.searchParams.lat;
                long = this.props.searchParams.long;
            }

            if (this.props.searchParams.formattedAddress) {
                formattedAddress = this.props.searchParams.formattedAddress;
            }


        } else {
            return
        }

        try {

            var params = {
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

            try {

                if (ctx.req.url.search("feed=appcast") > -1 && ctx.req.url.search("geo=us") > -1) {
                    // pageVersion = "UsCpa";
                }

            } catch (e) {
                console.trace("feed=appcast", e);
            }


            let geoIPLocation;

            if (ctx.req.session) {
                geoIPLocation = ctx.req.session.geoIPLocation;
            }
            // console.log(`id: ${id}`)
            const jobListing = await fetchJobById(id, feed, title);
            // console.log(`fetched this job object: ${JSON.stringify(jobListing)}`);
            if (jobListing && jobListing.job && jobListing.searchParams) {

                let job = {
                    title: jobListing.job.title,
                    src: jobListing.job.src,
                    body: jobListing.job.body,
                    city: jobListing.job.city,
                    url: jobListing.job.url,
                    company: jobListing.job.company,
                    jobPostingDate: jobListing.job.date,
                    cpc: jobListing.job.cpc,
                    views: Math.floor(Math.random() * (633 - 10 + 1)) + 10,
                    searchParams: {
                        keyword: jobListing.searchParams.q || "",
                        tags: tags || jobListing.searchParams.tags,
                        lat: jobListing.searchParams.latlong.lat,
                        long: jobListing.searchParams.latlong.lon,
                        formattedAddress: jobListing.searchParams.location
                    }
                };

                //console.log("job ", job);

                return {...job, flowType, ptitle, geoIPLocation, jobListing, pageVersion, OptInModalVersion};
            }

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


        if (this.props.pageVersion == "ApplyV2") {
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

        } else if (this.props.pageVersion == "BasicApply") {
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
        } else if (this.props.pageVersion == "Social") {
            versionHtml =
                <Social
                    emailSubmit={this.emailSubmit.bind(this)}
                    noThanks={this.noThanks.bind(this)}
                    goToJob={this.goToJob.bind(this)}
                    app={app}
                    city={this.props.city}
                    company={this.props.company}
                    views="36"
                    title={this.props.title}
                    body={this.props.body}>
                </Social>
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
        } else if (this.props.pageVersion == "Fake") {
            versionHtml =
                <Fake
                    location={this.props.searchParams.formattedAddress}
                    emailSubmit={this.emailSubmit.bind(this)}
                    noThanks={this.noThanks.bind(this)}
                    goToJob={this.goToJob.bind(this)}
                    app={app}
                    city={this.props.city}
                    company={this.props.company}
                    views="36"
                    title={this.props.title}
                    body={this.props.body}>
                </Fake>
        } else if (this.props.pageVersion == "UsCpa") {
            versionHtml =
                <UsCpa
                    emailSubmit={this.emailSubmit.bind(this)}
                    noThanks={this.noThanks.bind(this)}
                    goToJob={this.goToJob.bind(this)}
                    app={app}
                    city={this.props.city}
                    company={this.props.company}
                    views="36"
                    title={this.props.title}
                    body={this.props.body}>
                </UsCpa>
        } else if (this.props.pageVersion == "PremiumJob") {
            versionHtml =
                <PremiumJob
                    emailSubmit={this.emailSubmit.bind(this)}
                    noThanks={this.noThanks.bind(this)}
                    goToJob={this.goToJob.bind(this)}
                    app={app}
                    city={this.props.city}
                    company={this.props.company}
                    views="36"
                    title={this.props.title}
                    body={this.props.body}>
                </PremiumJob>;
        } else if (this.props.pageVersion == "Basic") {

            versionHtml =
                <Basic
                    moreJobsClick={this.moreJobsClick.bind(this)}
                    emailSubmit={this.emailSubmit.bind(this)}
                    noThanks={this.noThanks.bind(this)}
                    goToJob={this.goToJob.bind(this)}
                    app={app}
                    city={this.props.city}
                    company={this.props.company}
                    views="36"
                    title={this.props.title}
                    body={this.props.body}>
                </Basic>;

            modalVersionHtml =
                <EmailModalV3
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

                <Head>
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{__html: JSON.stringify(jobScehme)}}
                    ></script>
                </Head>

                {versionHtml}

                {modalVersionHtml}

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

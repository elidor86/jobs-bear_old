import styled from "styled-components";
import parseHTML from "html-react-parser";
import EmailModalV3 from "../../components/EmailModalV3/EmailModalV3";
import StandardPage from "../../components/StandardPage/StandardPage";
import config from "../../components/config/styleConsts";
import fetchJobById from "../../lib/fetchJobById";
import Router from "next/router";
import logEvent from "../../lib/logEvent";
import handleJobClick from "../../lib/handleJobClick";
import EmailPromptBar from "../../components/EmailPromptBar/EmailPromptBar";
import validateEmailForm from "../../lib/validateEmailForm";
import {NextSeo} from "next-seo";
import Head from "next/head";



import Basic from "../../components/JobPages/Basic/Basic";


//let PageV = Social;
let PageV = Basic;


const {mobileMaxWidth, black, purple} = config;

const JobListingHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  height: 46px;
  width: 100%;
  border-bottom: 1px solid rgba(0, 6, 57, 0.1);
  padding: 0px 20px;
  @media (max-width: ${mobileMaxWidth}) {
    padding: 0px 16px;
  }
`;

const PrimaryButton = styled.button`
  background: linear-gradient(180deg, #606fc7 0%, #5865c1 100%);
  box-shadow: 0px 4px 4px rgba(0, 6, 57, 0.12);
  border-radius: 5px;
  height: 46px;
  width: 150px;
  color: white;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
`;

const SecondaryButton = styled.button`
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #606fc7;
  background: none;
  cursor: pointer;
  border: none;
  flex: row;
  justify-content: center;
`;
const JobListingContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 16px 20px 16px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const DesktopButtonsPanel = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid #606fc7;
  box-sizing: border-box;
  border-radius: 10px;
  width: 210px;
  height: 145px;
  padding: 18px 0px;
  button {
    margin: auto;
  }
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 30px;
  line-height: 34px;
  color: ${black};
  margin: 0rem;
  margin: 0px 0px 5px 0px;
`;

const CompanyName = styled.h3`
  color: ${black};
  opacity: 0.6;
  font-size: 16px;
  line-height: 20px;
  margin: 5px 0px;
  max-width: 300px;
`;

const ProminentFeature = styled.a`
  margin: 5px 0px;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  flex-direction: row;
  justify-content: start;
  color: #5d6cc5;
  cursor: pointer;
  img {
    margin-right: 10px;
    vertical-align: middle;
  }
`;

const SecondaryFeature = styled.div`
  margin: 5px 0px;
  flex-direction: row;
  justify-content: start;
  box-sizing: border-box;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: ${black};
  opacity: 0.3;
  img {
    margin-right: 10px;
    vertical-align: middle;
  }
`;

const Description = styled.div`
  color: rgba(0, 6, 57, 0.6);
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  min-height: 120px;
`;

const JobListingViews = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  text-align: center;
  justify-content: center;
  max-width: 110px;
  height: 30px;
  background: rgba(96, 111, 199, 0.1);
  font-size: 14px;
  line-height: 30px;
  color: rgba(96, 111, 199, 0.4);
  border-radius: 5px;
  img {
    margin-right: 4px;
    vertical-align: middle;
  }
`;

const BottomBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 16px;
  height: 80px;
  border-top: 1px solid rgba(0, 6, 57, 0.1);
  margin-top: 32px;
  @media (max-width: ${mobileMaxWidth}) {
    height: 70px;
    box-shadow: 0px -2px 4px rgba(0, 6, 57, 0.2);
    position: fixed;
    bottom: 0px;
    background: white;
    width: 100%;
    z-index: 100;
  }
  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: auto 0px;
    width: 300px;
    @media (max-width: ${mobileMaxWidth}) {
      width: 100%;
    }
  }
  p {
    margin: auto 0px;
    @media (max-width: ${mobileMaxWidth}) {
      display: none;
    }
  }
`;

function buildQuery(queryParams, flowType) {
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

        //console.log("JobPage props ",props)

        super(props);

        this.state = {
            nextJobId: "",
            keyword: "",
            lat: "",
            long: "",
            flowType:
                this.props.flowType === "b" && !this.props.getProvidedEmail()
                    ? "b"
                    : "a"
        };


    }


    emailSubmit(email, origin) {

        //console.log("Email submit");


        logEvent("click-email_submit", {origin: "premium"});


        this.props.app.setProvidedEmail(email);

        handleJobClick(
            this.props.url,
            this.props.title,
            this.props.src,
            this.props.cpc || this.props.ppc
        );

        Router.push(
            `/jobs?${buildQuery(this.props.searchParams, this.state.flowType)}`
        );
    }

    noThanks() {
        // console.log("noThanks");

        handleJobClick(
            this.props.url,
            this.props.title,
            this.props.src,
            this.props.cpc || this.props.ppc
        );

        Router.push(
            `/jobs?${buildQuery(this.props.searchParams, this.state.flowType)}`
        );

    }

    handleClick(jobRedirectPath) {
        if (this.props.getProvidedEmail()) {
            handleJobClick(
                this.props.url,
                this.props.title,
                this.props.src,
                this.props.cpc || this.props.ppc
            );
        } else {
            this.props.showEmailSignUpPopup(
                jobRedirectPath,
                "job_post",
                this.props.title,
                this.props.src
            );
        }
    }

    static async getInitialProps(ctx) {

        // console.log("getInitialProps ctx, ");

        try {
            const {id, feed, title, flowType, ptitle, tags} = ctx.query;

            let pageVersion = "Free";

            let geoIPLocation;

            if (ctx.req.session) {
                geoIPLocation = ctx.req.session.geoIPLocation;
            }
            // console.log(`id: ${id}`)
            const jobListing = await fetchJobById(id, feed, title);
            //console.log(`fetched this job object: ${JSON.stringify(jobListing)}`);
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

                return {...job, flowType, ptitle, geoIPLocation, jobListing, pageVersion};
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

        if (this.state.flowType === "b" && document && window.innerWidth < 1152) {
            //  document.getElementsByTagName("body")[0].className += "no-overflow";
            //  document.getElementsByTagName("html")[0].className += "no-overflow";
        }


    }

    componentWillUnmount() {
        if (this.state.flowType === "b" && document) {
            //document.getElementsByTagName("body")[0].className = "";
            //document.getElementsByTagName("html")[0].className = "";
        }
    }

    componentDidCatch(error, info) {
        console.log(`error in [id].js.\n error: ${error}\n info: ${info}`);
    }

    render() {


        const {
            pageVersion,
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

        return (
            <StandardPage
                getKeyword={this.props.getKeyword}
                setKeyword={this.props.setKeyword}
                setProvidedEmail={this.props.setProvidedEmail}
                getProvidedEmail={this.props.getProvidedEmail}
                origin="job_page"
                hideBottomEmailBar={this.state.flowType === "b"}
                app={app}>

                <EmailModalV3 app={app} keyword="test"></EmailModalV3>



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




                <PageV

                    emailSubmit={this.emailSubmit.bind(this)}
                    noThanks={this.noThanks.bind(this)}
                    app={app}
                    title={this.props.title}
                    body={this.props.body}

                >

                </PageV>


            </StandardPage>
        );
    }
}

export default JobPage;

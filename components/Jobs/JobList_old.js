import Job_oldV2 from "./Job_oldV2";
import styled from "styled-components";

import DisplayAd from "../DisplayAd/DisplayAd";
import Tags from "../Tags/Tags";

/*
import TJ_IB_v2 from "../SerpCards/TJ/IB_v2/V2";
import TJ_IB_v3 from "../SerpCards/TJ/IB_v3/V3";

import Monster_IB_v1 from "../SerpCards/Monster/IB_v1/V1";
import Monster_IB_v2 from "../SerpCards/Monster/IB_v2/V2";
*/


/*
const IB_Mapper = {
    Distance: TJ_IB_v3,
    JobType: TJ_IB_v2,
    Monster_IB_v1: Monster_IB_v1,

    Monster_IB_v2: Monster_IB_v2,


}*/

import Router from "next/router";
import logEvent from "../../lib/logEvent";
import buildJobSearchQueryString from "../../lib/buildJobSearchQueryString";
import Arrow_forward_icon_purple_1 from "../Svgs/arrow_forward_icon_purple_1";

import React from "react";


const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  background-color: transparent;
  padding: 8px 16px 0px 16px;
  max-width: 750px;
  margin: auto;
  @media (max-width: 1000px) {
    margin: 0px;
  }
`;

const CardContainerDiv = styled.div`
  margin-top: 8px;
  margin-bottom: 8px;
  /* box-shadow: 0px 4px 4px rgba(0, 6, 57, 0.12); */
  width: 100%;
`;

const ShowMoreJobButton = styled.button`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  color: #606fc7;
  border: 2px solid #606fc7;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 6, 57, 0.12);
  border-radius: 5px;
  width: 230px;
  height: 46px;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: auto;
  margin: 16px auto 26px auto;
`;
const Button = styled.button`
  min-height: 46px;
  border-radius: 5px;
  border: 2px solid #ffffff;
  background: none;
  padding: 0px 20px;
  align-items: center;
  color: white;
  font-size: 16px;
  box-sizing: border-box;
  line-height: 19px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ButtonIcon = styled.img`
  margin-right: 6px;
  width: 18px;
  height: 18px;
`;

const ButtonDesktop = styled(Button)`
  background: linear-gradient(94.2deg, #fe909c 0.65%, #ff6c98 96.18%);
  border: none;
  border-radius: 5px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 32px;
`;

const jobListOrderingConfig = {
    noRelevantResultsIndexes: {
        emailSmallCard: -1,
        displayAd: [-1],
        cpaCard: -1
    },
    oneResultIndexes: {
        emailSmallCard: -1,
        displayAd: [-1],
        cpaCard: -1
    },
    moreThanOneResultIndexes: {
        emailSmallCard: 2,
        displayAd: [-1],
        cpaCard: 1
    },
    moreThanTenResultsIndexes: {
        emailSmallCard: 5,
        displayAd: [-1],
        cpaCard: 1
    }
};


export default class JobList extends React.Component {

    constructor(props) {

        //console.log("jobs joblist ", props.jobs)

        super(props);


        this.state = {
            loading: false,
            jobClickCount: 0
        };

        this.incrementJobClickCount = this.incrementJobClickCount.bind(this);
        this.getAppGeo = this.getAppGeo.bind(this);


    }

    incrementJobClickCount() {
        this.setState({
            jobClickCount: ++this.state.jobClickCount
        });
    }

    determineListOrder() {
        const numOfJobs = this.props.jobs.length;
        let listProps;
        if (numOfJobs === 0) {
            listProps = jobListOrderingConfig.noRelevantResultsIndexes;
        } else if (numOfJobs === 1) {
            listProps = jobListOrderingConfig.oneResultIndexes;
        } else if (numOfJobs > 1 && numOfJobs <= 10) {
            listProps = jobListOrderingConfig.moreThanOneResultIndexes;
        } else if (numOfJobs > 10) {
            listProps = jobListOrderingConfig.moreThanTenResultsIndexes;
        }
        return listProps;
    }

    getCardDecoration(jobIndex, jobListLength, jobTitle, jobSrc) {
        let cardDecoration = "plain";

        if (this.props.decoration) {
            switch (this.props.decoration) {
                case "randomTags":

                    if (jobSrc == "serp") {
                        cardDecoration = "serp"
                    } else if (jobListLength < 4 && jobIndex === 1) {
                        cardDecoration = ["noExperience", "immediateStart", "highSalary"][parseInt(jobTitle.replace(/\s/g, ""), 36) % 3];
                    } else if (jobListLength >= 4 && (jobIndex === 1 || jobIndex % 2 === 0)) {
                        cardDecoration = ["noExperience", "immediateStart", "highSalary"][parseInt(jobTitle.replace(/\s/g, ""), 36) % 3];
                    }
                    break;
                case "randomTagsWithWhatsappFlow":
                    if (jobListLength < 4 && jobIndex === 1) {
                        cardDecoration = ["noExperience", "immediateStart", "highSalary"][
                        parseInt(jobTitle.replace(/\s/g, ""), 36) % 3];
                    } else if (
                        jobListLength >= 4 &&
                        (jobIndex === 1 || jobIndex % 2 === 0)
                    ) {
                        cardDecoration = ["noExperience", "immediateStart", "highSalary"][
                        parseInt(jobTitle.replace(/\s/g, ""), 36) % 3];
                    }
                    break;
                case "randomTagsWithCPACards":
                    if (jobListLength < 4 && jobIndex === 1) {
                        cardDecoration = ["noExperience", "immediateStart", "highSalary"][
                        parseInt(jobTitle.replace(/\s/g, ""), 36) % 3];
                    } else if (
                        jobListLength >= 4 &&
                        (jobIndex === 1 || jobIndex % 2 === 0)
                    ) {
                        cardDecoration = ["noExperience", "immediateStart", "highSalary"][
                        parseInt(jobTitle.replace(/\s/g, ""), 36) % 3];
                    }
                    break;
                case "randomTagsSortedByLocation":
                    if (jobListLength < 4 && jobIndex === 1) {
                        cardDecoration = ["noExperience", "immediateStart", "highSalary"][
                        parseInt(jobTitle.replace(/\s/g, ""), 36) % 3];
                    } else if (
                        jobListLength >= 4 &&
                        (jobIndex === 1 || jobIndex % 2 === 0)
                    ) {
                        cardDecoration = ["noExperience", "immediateStart", "highSalary"][parseInt(jobTitle.replace(/\s/g, ""), 36) % 3];
                    }
                    break;
            }
        }
        return cardDecoration;
    }

    uid(src, extId, referencenumber) {

        let uid = '_' + Math.random().toString(36).substr(2, 9);
        return uid


        //console.log("referencenumber ", referencenumber,src)
        //console.log("src ", src)

        if (src != "serp" && referencenumber && referencenumber.length > 0) {
            return referencenumber;
        }

        //let uid = '_' + Math.random().toString(36).substr(2, 9);

        //console.log("uid", uid);

        return uid

        return extId;

        return '_' + Math.random().toString(36).substr(2, 9);

        if (src != "serp") {
            return referencenumber;
        }

        return '_' + Math.random().toString(36).substr(2, 9);
        console.log("referencenumber ", referencenumber)

        return referencenumber;

        //jobs[0].extId, jobs[0].referencenumber

        if (extId && extId.length > 0) {
            return extId;
        }

        if (referencenumber && referencenumber.length > 0) {
            return referencenumber;
        }

        //console.log("src", src)

        if (src == "serp") {
            return 10;
        }

        return '_' + Math.random().toString(36).substr(2, 9);
    }

    getAllUrlParams(url) {

        // get query string from url (optional) or window
        var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

        // we'll store the parameters here
        var obj = {};

        // if query string exists
        if (queryString) {

            // stuff after # is not part of query string, so get rid of it
            queryString = queryString.split('#')[0];

            // split our query string into its component parts
            var arr = queryString.split('&');

            for (var i = 0; i < arr.length; i++) {
                // separate the keys and the values
                var a = arr[i].split('=');

                // set parameter name and value (use 'true' if empty)
                var paramName = a[0];
                var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

                // (optional) keep case consistent
                paramName = paramName.toLowerCase();
                if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

                // if the paramName ends with square brackets, e.g. colors[] or colors[2]
                if (paramName.match(/\[(\d+)?\]$/)) {

                    // create key if it doesn't exist
                    var key = paramName.replace(/\[(\d+)?\]/, '');
                    if (!obj[key]) obj[key] = [];

                    // if it's an indexed array e.g. colors[2]
                    if (paramName.match(/\[\d+\]$/)) {
                        // get the index value and add the entry at the appropriate position
                        var index = /\[(\d+)\]/.exec(paramName)[1];
                        obj[key][index] = paramValue;
                    } else {
                        // otherwise add the value to the end of the array
                        obj[key].push(paramValue);
                    }
                } else {
                    // we're dealing with a string
                    if (!obj[paramName]) {
                        // if it doesn't exist, create property
                        obj[paramName] = paramValue;
                    } else if (obj[paramName] && typeof obj[paramName] === 'string') {
                        // if property does exist and it's a string, convert it to an array
                        obj[paramName] = [obj[paramName]];
                        obj[paramName].push(paramValue);
                    } else {
                        // otherwise add the property
                        obj[paramName].push(paramValue);
                    }
                }
            }
        }

        return obj;
    }

    getJoblist() {
        // console.log(`getJoblist: ${this.props.jobs}`)
        let jobs = [...this.props.jobs];

        //console.log("jobs", jobs);

        const jobListLength = jobs.length;
        let jobList = [];
        let index = 0;
        const jobListOrderProps = this.determineListOrder();


        try {

            let keyword = this.props.app.getKeyword();

            if (keyword && keyword.length > 0) {

            } else {

                jobList.push(
                    <Tags
                        text="What are you looking for?"
                        key={"tags1"}
                        tagClick={this.ShowMoreJobsClick.bind(this)}
                        app={this.props.app}>

                    </Tags>
                );

            }

        } catch (e) {

        }


        while (jobs.length > 0) {

            try {
                jobs[0].list_index = index;
            } catch (e) {

            }

            try {
                if (!jobs[0].referencenumber || jobs[0].referencenumber.length <= 1) {
                    let uid = '_' + Math.random().toString(36).substr(2, 9);
                    jobs[0].referencenumber = uid;
                }
            } catch (e) {

            }

            /*jobList.push(
                <CVLibrary
                    index={index}
                    display={true}
                    uid={"uid"}
                    showEmailSignUpPopup={this.props.showEmailSignUpPopup}
                    getProvidedEmail={this.props.getProvidedEmail}
                    getForcefullyHideEmailPrompts={this.props.getForcefullyHideEmailPrompts}
                    key={this.uid()}
                    keyword={this.props.keyword}
                    setKeyword={this.props.setKeyword}
                    {...jobs[0]}
                    decoration={this.getCardDecoration(
                        index,
                        jobListLength,
                        jobs[0].title,
                        jobs[0].src
                    )}
                    hideDescription={this.props.decoration === "randomTagsWithNoDescription"}
                    incrementJobClickCount={this.incrementJobClickCount}
                />
            );*/


            if (jobListOrderProps.emailSmallCard === index && !this.props.getProvidedEmail()) {

            } else {


                if (jobs[0].src == "serp") {

                    //console.log("jobs[0].title ", jobs[0].title)

                    try {

                        jobList.push(
                            <Job_oldV2
                                job={jobs[0]}
                                app={this.props.app}
                                display={true}
                                uid={"uid"}
                                showEmailSignUpPopup={this.props.showEmailSignUpPopup}
                                getProvidedEmail={this.props.getProvidedEmail}
                                getForcefullyHideEmailPrompts={this.props.getForcefullyHideEmailPrompts}
                                key={this.uid(jobs[0].src, jobs[0].extId, jobs[0].referencenumber)}
                                keyword={this.props.keyword}
                                setKeyword={this.props.setKeyword}
                                {...jobs[0]}
                                decoration={this.getCardDecoration(
                                    index,
                                    jobListLength,
                                    jobs[0].title,
                                    jobs[0].src
                                )}
                                hideDescription={this.props.decoration === "randomTagsWithNoDescription"}
                                incrementJobClickCount={this.incrementJobClickCount}
                            />
                        );

                    } catch (e) {

                    }

                } else if (jobs[0].cardType == "Interactive_Banner") {

                    const Card = IB_Mapper[jobs[0].version];

                    if (Card) {

                        jobList.push(
                            <Card
                                app={this.props.app}
                                timeOut={true}
                                display={true}
                                uid={"uid"}
                                showEmailSignUpPopup={this.props.showEmailSignUpPopup}
                                getProvidedEmail={this.props.getProvidedEmail}
                                getForcefullyHideEmailPrompts={this.props.getForcefullyHideEmailPrompts}
                                key={this.uid(jobs[0].src, jobs[0].extId, jobs[0].referencenumber)}
                                keyword={this.props.keyword}
                                setKeyword={this.props.setKeyword}
                                {...jobs[0]}
                                hideDescription={this.props.decoration === "randomTagsWithNoDescription"}
                                incrementJobClickCount={this.incrementJobClickCount}
                            />)
                    }

                } else {

                    jobList.push(
                        <Job_oldV2
                            job={jobs[0]}
                            app={this.props.app}
                            index={index}
                            display={true}
                            uid={"uid"}
                            showEmailSignUpPopup={this.props.showEmailSignUpPopup}
                            getProvidedEmail={this.props.getProvidedEmail}
                            getForcefullyHideEmailPrompts={this.props.getForcefullyHideEmailPrompts}
                            key={this.uid(jobs[0].src, jobs[0].extId, jobs[0].referencenumber)}
                            keyword={this.props.keyword}
                            setKeyword={this.props.setKeyword}
                            {...jobs[0]}
                            decoration={this.getCardDecoration(
                                index,
                                jobListLength,
                                jobs[0].title,
                                jobs[0].src
                            )}
                            hideDescription={this.props.decoration === "randomTagsWithNoDescription"}
                            incrementJobClickCount={this.incrementJobClickCount}
                        />
                    );
                }


                jobs.splice(0, 1);
            }
            ++index;
        }

        if (jobList.length < 3 && jobList.length > 1) {
            jobList.push(
                <CardContainerDiv key="cardContainerDiv2">
                    <DisplayAd height="auto" width="100%" key={++index}/>
                </CardContainerDiv>
            );
        } else if (jobList.length < 6 && jobList.length > 3) {
            jobList.push(
                <CardContainerDiv key="cardContainerDiv3">
                    <DisplayAd height="auto" width="100%" key={++index}/>
                </CardContainerDiv>
            );
        }


        /*try {

            if (AB.VipListBanner == true) {

                jobList.push(
                    <ListBanner
                        eventName="CvUploadListBanner"
                        queryParams={{utm_medium: "CvUploadListBanner"}}
                        newWindow={false}
                        title="Send me your CV"
                        body="Your CV helps employers understand what a good fit you’ll be! Plus, candidates with CVs are more likely to be considered."
                        ctaText="Upload your CV"
                        page="upload-cv"
                        app={this.props.app}
                    >
                    </ListBanner>
                );


            }

        } catch (e) {

        }*/

        /*try {


            let ProvidedPhone = this.props.app.getProvidedPhone();


            if (ClientVars.geo == "us" && ProvidedPhone == false) {

                jobList.push(
                    <ListBanner
                        onCtaClick={() => {
                            this.props.app.showSmsModal();
                        }}
                        eventName="ShowSmsModalListBanner"
                        queryParams={{utm_medium: "CvUploadListBanner"}}
                        newWindow={false}
                        title="Make it easy for employers to contact you"
                        body="Provide a few more details so that employers can reach you"
                        ctaText="Continue"
                        page="upload-cv"
                        app={this.props.app}
                    >
                    </ListBanner>
                );


            }

        } catch (e) {

        }*/

        jobList.push(
            <ShowMoreJobButton
                id={"show-more-btn"}
                key={"showMoreJobsButton"}
                onClick={this.ShowMoreJobsClick.bind(this)}>
                More Offers
                <Arrow_forward_icon_purple_1></Arrow_forward_icon_purple_1>
            </ShowMoreJobButton>
        );

        jobList.push(
            <Tags
                key={"tags"}
                tagClick={this.ShowMoreJobsClick.bind(this)}
                app={this.props.app}>

            </Tags>
        );


        return jobList;
    }

    ShowMoreJobsClick(keyword) {

        let RouterQuery = Router.query;
        let app = this.props.app;

        logEvent("click-load_more_jobs", {origin: "job_list"});

        let page = 2;

        try {

            if (RouterQuery.page) {
                let tmpPage = RouterQuery.page;
                tmpPage = parseInt(tmpPage);
                tmpPage++;
                page = tmpPage;
            }

        } catch (e) {

        }


        let keywordParam = app.getKeyword();

        if (keyword && typeof keyword == "string") {
            keywordParam = keyword;

        }

        //console.log("keywordParam ", keywordParam)

        app.goToPage({
            newWindow: false,
            queryParams: {
                keyword: keywordParam,
                utm_medium: "moreJobs",
                page: page
            },
            page: "jobs"
        });

        return;


        try {

            if (!RouterQuery.formattedAddress || RouterQuery.formattedAddress.length <= 2 && ClientVars.locpysical.Name) {
                RouterQuery.formattedAddress = ClientVars.locpysical.Name;
            }

        } catch (e) {

        }

        try {

            if (!RouterQuery.lat || RouterQuery.lat.length <= 2 && ClientVars.locpysical.lat) {
                RouterQuery.lat = ClientVars.locpysical.lat;
                RouterQuery.long = ClientVars.locpysical.long;
            }

        } catch (e) {

        }


        try {
            window.HaveJobClick = false;
        } catch (e) {

        }

        try {
            if (keyword && keyword.length > 0) {
                RouterQuery.keyword = keyword;
            }
        } catch (e) {

        }

        const queryParams = buildJobSearchQueryString(RouterQuery);


        try {

            if (window.ClientVars.didLb != true && window.AB.lb == true) {



                logEvent("lb");

                try {
                    window.ClientVars.didLb = true;
                } catch (e) {

                }


                var newTabUrl = `https://jobs-bear.com/jobs?${queryParams}`;

                if (location.href.search("/job/") > -1 && this.props.getListUrl) {
                    newTabUrl = this.props.getListUrl();
                }

                var doWebPushOptIn = false;

                /*if (app.state.optedInToPN === true) {
                    doWebPushOptIn = false;
                }*/

                var lbUrl = `https://nextcareernow.com/?botName=jobs-bear&utm_source=lb&doWebPushOptIn=${doWebPushOptIn}&geo=${app
                    .props.geo ||
                app.state.location.geo ||
                ""}&q=${encodeURI(app.state.keyword || "")}&l=${encodeURI(
                    app.state.location.formattedAddress || ""
                )}`;

                //console.log("lbUrl ", lbUrl);
                //console.log("newTabUrl ", newTabUrl);

                window.open(newTabUrl);
                location.replace(lbUrl);

            } else {

                var newTabUrl = `/jobs?${queryParams}`;

                if (location.href.search("/job/") > -1 && this.props.getListUrl) {
                    newTabUrl = this.props.getListUrl();
                    newTabUrl = newTabUrl.replace("https://jobs-bear.com", "");
                }

                Router.push(newTabUrl);
            }
        } catch (e) {
            Router.push(`/jobs?${queryParams}`);
        }


        //Router.push(`https://jobs-bear.com/jobs?${queryParams}`);
        //Router.push(`/jobs?${queryParams}`);
    }

    componentDidMount() {
        if (process.browser) {


            const numOfJobs = this.props.jobs.length;

        }
    }

    getAppGeo() {

        if (this.props.app) {
            if (this.props.app.state) {
                if (this.props.app.state.location) {
                    return this.props.app.state.location.geo;
                }
            }
        }

    }


    render() {


        return (
            <React.Fragment>

                <ContainerDiv>


                    {this.getJoblist()}


                </ContainerDiv>


            </React.Fragment>
        );
    }
}

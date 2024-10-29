import React, {useEffect, useState, memo, useMemo} from 'react'; // Import memo from React
import styled from 'styled-components';
import {useRouter} from 'next/router';

import Job from './Job';

import Tags from '../Tags/Tags';
import ArrowForwardIconPurple from '../Svgs/arrow_forward_icon_purple_1';
import {
    getCardDecoration,
    generateUid,
    insertAdCardAtIndexes,
    listOrderingConfig,
} from './jobListHelpers'; // Extract helper functions into a separate file for better organization

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

function rearrangeArray(arr, position) {

    try {
        if (!Array.isArray(arr)) {
            return arr;
        }

        if (typeof position !== "number" || position < 0 || position > arr.length) {
            return arr;
        }

        const serpObjects = arr.filter(obj => obj.src === "serp");
        const nonSerpObjects = arr.filter(obj => obj.src !== "serp");

        const rearrangedArray = [
            ...nonSerpObjects.slice(0, position),
            ...serpObjects,
            ...nonSerpObjects.slice(position)
        ];

        return rearrangedArray;
    } catch (e) {
        return arr;
    }

}

const JobList = ({
                     jobs,
                     app,
                     email,
                     decoration,
                     showEmailSignUpPopup,
                     getProvidedEmail,
                     getForcefullyHideEmailPrompts,
                     keyword,
                     setKeyword
                 }) => {


    const router = useRouter();
    const [jobClickCount, setJobClickCount] = useState(0);
    const [rearrangedJobs, setRearrangedJobs] = useState(jobs);


    useEffect(() => {

        try {

            const geo = app.getClientVars().geo;
            let did_rerank_counter = parseInt(localStorage.getItem('did_rerank_counter')) || 0;


            if (typeof email == "string" && geo == "us" && !window.did_rerank && did_rerank_counter < 3) {
                const rearranged = rearrangeArray(jobs, 1);
                setRearrangedJobs(rearranged);
                localStorage.setItem('did_rerank_counter', did_rerank_counter + 1);
                window.did_rerank = true;
            } else {
                setRearrangedJobs(jobs);
            }

        } catch (e) {
            setRearrangedJobs(jobs);
        }


    }, [email, jobs]);

    const handleJobClick = () => setJobClickCount(jobClickCount + 1);

    const handleShowMoreJobsClick = (givenKeyword) => {
        const queryParams = router.query;
        let page = parseInt(queryParams.page || 1) + 1;
        let searchKeyword = keyword;

        if (typeof givenKeyword === 'string') {
            searchKeyword = givenKeyword;
        }

        app.goToPage({
            newWindow: false,
            queryParams: {
                keyword: searchKeyword,
                utm_medium: 'moreJobs',
                page,
            },
            page: 'jobs'
        });
    };

    const renderJobList = () => {
        console.log("rearrangedJobs", rearrangedJobs)
        const jobListLength = rearrangedJobs.length;
        let jobList = [];

        const keyword = app.getKeyword() || '';

        if (typeof keyword === 'string' && keyword.length == 0) {
            jobList.push(<Tags key="tags_top" tagClick={handleShowMoreJobsClick} app={app}/>);
        }


        rearrangedJobs.forEach((job, index) => {

            const key = generateUid(job.src, job.extId, job.referencenumber);
            //console.log("JobList.js key", key)
            //const key = index + "_" + (job.src || job.referencenumber);
            //console.log("JobList.js key", key)

            const selected_decoration = getCardDecoration({
                index,
                jobListLength,
                jobTitle: job.title,
                jobSrc: job.src,
                company: job.company,
                decorationType: decoration
            });


            // Push Job or other card types
            jobList.push(
                <Job
                    key={key}
                    job={job}
                    app={app}
                    showEmailSignUpPopup={showEmailSignUpPopup}
                    getProvidedEmail={getProvidedEmail}
                    getForcefullyHideEmailPrompts={getForcefullyHideEmailPrompts}
                    keyword={keyword}
                    setKeyword={setKeyword}
                    decoration={selected_decoration}
                    hideDescription={decoration === 'randomTagsWithNoDescription'}
                    incrementJobClickCount={handleJobClick}
                    {...job}
                />
            );
        });

        jobList.push(
            <ShowMoreJobButton
                id={"show-more-btn"}
                key="showMoreJobsButton"
                onClick={() => handleShowMoreJobsClick(keyword)}
            >
                More Offers
                <ArrowForwardIconPurple/>
            </ShowMoreJobButton>
        );

        jobList.push(<Tags key="tags_bottom" tagClick={handleShowMoreJobsClick} app={app}/>);

        return jobList;
    }

    const renderedJobList = useMemo(() => {
        //console.log("renderedJobList")
        const jobList = [];
        const keyword = app.getKeyword() || '';

        if (typeof keyword === 'string' && keyword.length == 0) {
            jobList.push(<Tags key="tags_top" tagClick={handleShowMoreJobsClick} app={app}/>);
        }

        rearrangedJobs.forEach((job, index) => {
            const key = generateUid(job.src, job.extId, job.referencenumber);
            //console.log("JobList.js key", key)
            const selectedDecoration = getCardDecoration({
                index,
                jobListLength: rearrangedJobs.length,
                jobTitle: job.title,
                jobSrc: job.src,
                company: job.company,
                decorationType: decoration
            });

            jobList.push(
                <Job
                    key={key}
                    job={job}
                    app={app}
                    showEmailSignUpPopup={showEmailSignUpPopup}
                    getProvidedEmail={getProvidedEmail}
                    getForcefullyHideEmailPrompts={getForcefullyHideEmailPrompts}
                    keyword={keyword}
                    setKeyword={setKeyword}
                    decoration={selectedDecoration}
                    hideDescription={decoration === 'randomTagsWithNoDescription'}
                    incrementJobClickCount={handleJobClick}
                    {...job}
                />
            );
        });

        jobList.push(
            <ShowMoreJobButton id={"show-more-btn"} key="showMoreJobsButton"
                               onClick={() => handleShowMoreJobsClick(keyword)}>
                More Offers
                <ArrowForwardIconPurple/>
            </ShowMoreJobButton>
        );

        jobList.push(<Tags key="tags_bottom" tagClick={handleShowMoreJobsClick} app={app}/>);

        return jobList;
    }, [rearrangedJobs]);

    return (
        <ContainerDiv>
            {renderedJobList}
        </ContainerDiv>
    );
};

//const MemoizedJobList = memo(JobList);

const arePropsEqual = (prevProps, nextProps) => {


    try {
        const prev_email = prevProps.email;
        const next_email = nextProps.email;
        // console.log("prev_email", prev_email);
        // console.log("next_email", next_email);

        if (prev_email !== next_email) {
            return false;
        }

    } catch (e) {
        return false;
    }


    try {
        if (prevProps.jobs !== nextProps.jobs) {
            return false;
        }
    } catch (e) {
        return false;
    }


    return true;
};

const JobListMemo = memo(JobList, arePropsEqual);

export default JobListMemo;
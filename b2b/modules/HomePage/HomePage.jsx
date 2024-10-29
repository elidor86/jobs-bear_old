import React from "react";

import {header} from "../../lib/homepageUtils";
import Header from "./components/Header";
import WhyUs from "./components/WhyUs";
import BrowseJobs from "./components/BrowseJobs";
import Feedback from "./components/Feedback";
import PageLayout from "../../layouts/PageLayouts";
import Statistics from "./components/Statistics";

const HomePage = ({country, feedback, statistics, jobs, advantages, app}) => {
    header.app = app || {};
    return (
        <PageLayout country={country}>
            <Header  {...header} />
            <BrowseJobs app={app} industryJobs={jobs.industry} locationJobs={jobs.location} country={country}/>
            <WhyUs advantages={advantages}/>
            <Feedback feedback={feedback}/>
            <Statistics statistics={statistics}/>
        </PageLayout>
    );
};

export default HomePage;

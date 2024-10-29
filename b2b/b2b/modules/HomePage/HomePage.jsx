import React from "react";

import {header} from "../../lib/homepageUtils";
import Header from "./components/Header";
import BlogList from "./components/BlogList";
import WhyUs from "./components/WhyUs";
import BrowseJobs from "./components/BrowseJobs";
import Feedback from "./components/Feedback";
import PageLayout from "../../layouts/PageLayouts";
import Statistics from "./components/Statistics";
//<BlogList posts={blogPosts}/>

const HomePage = ({country, feedback, statistics, jobs, blogPosts, advantages, app}) => {
    //console.log("app", app);
    header.app = app;
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

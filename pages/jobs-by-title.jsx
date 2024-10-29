import React from "react";

import BrowseJobsPage from "../b2b/modules/BrowseJobsPage/BrowseJobsPage";
import {defaultCountry} from "../b2b/lib/countryUtils";
import PopularData from "../b2b/lib/jobsPageUtils";

const BrowseJobs = ({country, popularTitleData}) => <BrowseJobsPage country={country} data={popularTitleData}/>;

BrowseJobs.getInitialProps = async (ctx) => {
    let session = null;
    let popularTitle = PopularData.popularTitleData;

    if (ctx && ctx.req && ctx.req.session) {
        session = ctx.req.session;
    } else {

        try {
            if (window && window.ClientVars) {
                session = window.ClientVars;
            }
        } catch (e) {
        }

    }

    if (session && session.popularTitleData) {
        popularTitle = session.popularTitleData
    }

    const country = session?.geo || defaultCountry;

    return {
        country,
        popularTitleData:popularTitle
    };
};

export default BrowseJobs;

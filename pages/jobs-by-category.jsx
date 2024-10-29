import React from "react";
import BrowseJobsPage from "../b2b/modules/BrowseJobsPage/BrowseJobsPage";
import {defaultCountry} from "../b2b/lib/countryUtils";
import {popularCategoryData} from "../b2b/lib/jobsPageUtils";

const BrowseJobs = ({country, popularCategoryData}) => <BrowseJobsPage country={country} data={popularCategoryData}/>;

BrowseJobs.getInitialProps = async (ctx) => {
    let session = null;

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
    const country = session?.geo || defaultCountry;

    return {
        country,
        popularCategoryData
    };

};

export default BrowseJobs;

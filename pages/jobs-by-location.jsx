import React from "react";

import BrowseJobsPage from "../b2b/modules/BrowseJobsPage/BrowseJobsPage";
import {defaultCountry} from "../b2b/lib/countryUtils";
import PopularData from "../b2b/lib/jobsPageUtils";

const BrowseJobs = ({country, popularLocationData}) => <BrowseJobsPage country={country} data={popularLocationData}/>;

BrowseJobs.getInitialProps = async (ctx) => {

    let session = null;
    let popularLocationData = PopularData.popularLocationData;

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

    if (session && session.popularLocationData) {
        popularLocationData = session.popularLocationData
    }


    return {
        country,
        popularLocationData
    };

};

export default BrowseJobs;

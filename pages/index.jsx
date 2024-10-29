import Homepage from "../b2b/modules/HomePage/HomePage";
import {advantages, feedback, jobs, statistics} from "../b2b/lib/homepageUtils";
import {NextSeo} from "next-seo";

const Home = ({country, jobs, advantages, feedback, statistics, app}) => (

    <div>

        <NextSeo
            title="We learn. We understand. We deliver jobs. | Jobs-Bear"
            description="Personalizing each and every search for millions of job seekers."
        />

        <Homepage
            app={app}
            jobs={jobs}
            country={country}
            advantages={advantages}
            feedback={feedback}
            statistics={statistics}
        >
        </Homepage>

    </div>

);

Home.getInitialProps = async (ctx) => {
    let country = "US";

    try {
        country = ctx?.req?.session?.geo;
    } catch (e) {

    }

    if (!country || country.length != 2 || typeof country != "string") {
        country = "US";
    } else {

        try {
            country = country.toUpperCase();
        } catch (e) {

        }

    }

    if (country == "GB") {
        country = "UK";
    }

    return {
        country,
        jobs,
        advantages,
        feedback,
        statistics
    };
};

export default Home;

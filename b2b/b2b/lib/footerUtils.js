import {pages} from "./routeUtils";
import {FacebookIcon, TwitterIcon, LinkedinIcon} from "../components/Icons";

export const footer = {
    socials: [
        {
            icon: <FacebookIcon/>,
            link: "https://www.facebook.com/jobsBear/",
        },
        {
            icon: <LinkedinIcon/>,
            link: "https://www.linkedin.com/company/26186856",
        },
        {
            icon: <TwitterIcon/>,
            link: "https://twitter.com/bear_jobs",
        },
    ],
    links: [
        /*{
            label: "Blog",
            link: pages.blog(),
        },*/
        {
            label: "About Us",
            link: pages.aboutUs(),
        },
        {
            label: "Contact Us",
            link: pages.contactUs(),
        }
    ],
    browseJobs: [
        /*{
            label: "Browse Jobs By Category",
            link: pages.jobsByCategory(),
        },*/
        {
            label: "Browse Jobs By Location",
            link: pages.jobsByLocation(),
        },
        {
            label: "Browse Jobs By Title",
            link: pages.jobsByTitle(),
        },
    ],
    privacy: [
        {
            label: "Contact Us",
            link: pages.contactUs(),
        },
        {
            label: "Privacy Policy",
            link: pages.privacyPolicy(),
        },
        {
            label: "Terms and Conditions",
            link: pages.termsAndConditions(),
        },
    ],

    countries: [
        {
            label: "JobsBear UK",
            link: "https://uk.jobs-bear.com",
        },
        {
            label: "JobsBear US",
            link: "https://us.jobs-bear.com",
        },
        {
            label: "JobsBear CA",
            link: "https://ca.jobs-bear.com",
        },
        {
            label: "JobsBear ZA",
            link: "https://za.jobs-bear.com",
        },
    ],
};

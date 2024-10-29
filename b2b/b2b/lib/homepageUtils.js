import styled from "styled-components";

import {NotificationIcon, SavingIcon, SettingsIcon} from "../components/Icons";
import {countries} from "./countryUtils";

const Highlight = styled.span`
  color: #d92cff;
`;

export const header = {
    title: (
        <>
            We learn. <br/>
            We understand. <br/>
            We <Highlight>deliver jobs.</Highlight>
        </>
    ),
    subtitle: "Personalizing each and every search for millions of job seekers.",
    jobsTextfield: {
        placeholder: "Search by job titles, company, or industry",
    },
    locationTextfield: {
        placeholder: "Enter location or “remote”",
    },
    searchAction: {
        label: "Search Jobs",
    },
};

export const blogPosts = [
    {
        title: "Why is your credit score important to employers?",
        image: "/static/b2b/images/blog/why-is-your-score.png",
        link: "/blog/why-your-credit",
    },
    {
        title: "20 Gig Jobs to Maximize Your Earnings",
        image: "/static/b2b/images/blog/20-gig-jobs.png",
        link: "/blog/20-gig-jobs",
    },
    {
        title: "12 Things You Need to Know About Employment Law",
        image: "/static/b2b/images/blog/12-things-you-need-know.png",
        link: "/blog/12-things-to-know",
    },
];

export const advantages = [
    {
        icon: '/static/b2b/images/homepage/why/settingsIcon.png',
        title: "Personalised feed",
        description:
            "A list curated just for you.<br>We generate a selection of job options based on your unique criteria, meeting yo ur every need.",
        link: "/personalised-feed",
    },
    {
        icon: '/static/b2b/images/homepage/why/savingIcon.png',
        title: "Time saving",
        description:
            "Your time is valuable.<br>Our system scans millions of job postings to identify those most relevant to you based on your skills.",
        link: "/time-saving",
    },
    {
        icon: '/static/b2b/images/homepage/why/notificationIcon.png',
        title: "Real time notifications",
        description:
            "Stay updated.<br>We send notifications straight to your phone or email, so you never miss a beat and can quickly respond to new opportunities.",
        link: "/notifications",
    },
];

export const jobs = {
    industry: [
        {
            icon: "/static/b2b/images/homepage/jobs/1.svg",
            title: "Administrative & Clerical",
            description: "Customer Service, Administrative Assistant, Office Manager & More",
            link: {keyword: "Administrative"},
        },
        {
            icon: "/static/b2b/images/homepage/jobs/2.svg",
            title: 'Retail Sales',
            description: "Sales Associate,Team Member, Cashier & More",
            link: {keyword: "Retail"},
        },
        {
            icon: "/static/b2b/images/homepage/jobs/3.svg",
            title: "Manufacturing & Warehouse",
            description: "Warehouse, Inventory Coordinator, & More",
            link: {keyword: "Warehouse"},
        },
        {
            icon: "/static/b2b/images/homepage/jobs/4.svg",
            title: 'Food Service',
            description: "Waiter/waitress, Dishwasher, Bartender & More",
            link: {keyword: "Waiter"},
        },
        {
            icon: "/static/b2b/images/homepage/jobs/5.svg",
            title: "Healthcare",
            description: "Registered Nurse, Pharmacy Technician & More",
            link: {keyword: "nurse"},
        },
        {
            icon: "/static/b2b/images/homepage/jobs/6.svg",
            title: "Transportation & Logistics",
            description: "Truck Driver, Delivery Driver, Courier & More",
            link: {keyword: "driver"},
        },
    ],
    location: {
        [countries.US]: [
            {
                title: "New York City, New York",
                link: {location: "New York City, New York"},
                underline: true,
            },
            {
                title: "Los Angeles, California",
                link: {location: "Los Angeles, California"},
                underline: true,
            },
            {
                title: "Chicago, Illinois",
                link: {location: "Chicago, Illinois"},
                underline: true,
            },

            {
                title: "Houston, Texas",
                link: {location: "Houston, Texas"},
                underline: true,
            },

            {
                title: "Phoenix, Arizona",
                link: {location: "Phoenix, Arizona"},
                underline: true,
            },
            {
                title: "Philadelphia, Pennsylvania",
                link: {location: "Philadelphia, Pennsylvania"},
                underline: true,
            },
            {
                title: "San Antonio, Texas",
                link: {location: "San Antonio, Texas"},
                underline: true,
            },
            {
                title: "San Diego, California",
                link: {location: "San Diego, California"},
                underline: true,
            },
            {
                title: "Dallas, Texas",
                link: {location: "Dallas, Texas"},
                underline: true,
            },
            {
                title: "San Jose, California",
                link: {location: "San Jose, California"},
                underline: true,
            }
        ],
        [countries.UK]: [
            {
                title: "London",
                link: {location: "London"},
            },
            {
                title: "Birmingham",
                link: {location: "Birmingham"},
            },
            {
                title: "Manchester",
                link: {location: "Manchester"},
            },
            {
                title: "Leeds",
                link: {location: "Leeds"},
            },
            {
                title: "Liverpool",
                link: {location: "Liverpool"},
            },
            {
                title: "Sheffield",
                link: {location: "Sheffield"},
            },
            {
                title: "Newcastle",
                link: {location: "Newcastle"},
            },
            {
                title: "Glasgow",
                link: {location: "San Jose, California"},
            },
            {
                title: "Bristol",
                link: {location: "Bristol"},
            },
            {
                title: "Leicester",
                link: {location: "Leicester"},
            }
        ],
        [countries.ZA]: [
            {
                title: "Johannesburg",
                link: {location: "Johannesburg"},
            },
            {
                title: "Cape Town",
                link: {location: "Cape Town"},
            },
            {
                title: "Durban",
                link: {location: "Durban"},
            },
            {
                title: "Soweto",
                link: {location: "Soweto"},
            },
            {
                title: "Pretoria",
                link: {location: "Pretoria"},
            },
            {
                title: "Port Elizabeth",
                link: {location: "Port Elizabeth"},
            },
            {
                title: "Pietermaritzburg",
                link: {location: "Pietermaritzburg"},
            },
            {
                title: "Benoni",
                link: {location: "Benoni"},
            },
            {
                title: "Bloemfontein",
                link: {location: "Bloemfontein"},
            },
            {
                title: "Tembisa",
                link: {location: "Tembisa"},
            }
        ],
        [countries.CA]: [
            {
                title: "Toronto",
                link: {location: "Toronto"},
            },
            {
                title: "Montreal",
                link: {location: "Montreal"},
            },
            {
                title: "Calgary",
                link: {location: "Calgary"},
            },
            {
                title: "Ottawa",
                link: {location: "Ottawa"},
            },
            {
                title: "Edmonton",
                link: {location: "Edmonton"},
            },
            {
                title: "Winnipeg",
                link: {location: "Winnipeg"},
            },
            {
                title: "Mississauga",
                link: {location: "Mississauga"},
            },
            {
                title: "Vancouver",
                link: {location: "Vancouver"},
            },
            {
                title: "Brampton",
                link: {location: "Bloemfontein"},
            },
            {
                title: "Hamilton",
                link: {location: "Hamilton"},
            }
        ]
    }
};

export const feedback = [
    {
        description:
            "\"I landed my dream job with the help of JobsBear. They introduced me to a job I never considered nor was aware of and turns out, it was a perfect fit for me.\"",
        author: "Nicole B.",
        image: "/static/b2b/images/homepage/feedback/nicole.png",
    },
    {
        description:
            "\"Great platform for anyone looking to start their next career. Thank you JobsBear for helping me find a job a second time around!\"",
        author: "Michael C.",
        image: "/static/b2b/images/homepage/feedback/michael.png",
    },
    {
        description:
            "\"A former colleague suggested to use JobsBear to find my next gig so I gave it a go and cannot express enough how satisfied I am.\"",
        author: "Anthony W.",
        image: "/static/b2b/images/homepage/feedback/anthony.png",
    },
];

export const statistics = [
    {
        label: "VISITORS PER MONTH",
        value: 9000000,
    },
    {
        label: "JOB RECOMMENDATIONS A DAY",
        value: 5000000,
    },
    {
        label: "OPEN POSITIONS",
        value: 20000000,
    },
];

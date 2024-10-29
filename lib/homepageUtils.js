import styled from "styled-components";

import { NotificationIcon, SavingIcon, SettingsIcon } from "../components/ext/Icons";

const Highlight = styled.span`
  color: #d92cff;
`;

export const header = {
  title: (
    <>
      We learn. <br />
      We understand. <br />
      We <Highlight>deliver jobs.</Highlight>
    </>
  ),
  subtitle: "Personalizing each and every search for millions of job seekers",
  jobsTextfield: {
    placeholder: "Search job Titles, keywords, companies",
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
    image: "/images/blog/why-is-your-score.png",
    link: "/blog/why-your-credit",
  },
  {
    title: "20 Gig Jobs to Maximize Your Earnings",
    image: "/images/blog/20-gig-jobs.png",
    link: "/blog/20-gig-jobs",
  },
  {
    title: "12 Things You Need to Know About Employment Law",
    image: "/images/blog/12-things-you-need-know.png",
    link: "/blog/12-things-to-know",
  },
];

export const advantages = [
  {
    icon: <SettingsIcon />,
    title: "Personalised feed",
    description:
      "A list curated just for you. We generate a selection of job options based on your unique criteria, meeting yo ur every need.",
    link: "/personalised-feed",
  },
  {
    icon: <SavingIcon />,
    title: "Time saving",
    description:
      "Your time is valuable. Our system scans millions of job postings to identify those most relevant to you based on your skills.",
    link: "/time-saving",
  },
  {
    icon: <NotificationIcon />,
    title: "Real time notifications",
    description:
      "Stay updated with the newest job alerts. We send notifications straight to your phone or email, so you never miss a beat and can quickly respond to new opportunities.",
    link: "/notifications",
  },
];

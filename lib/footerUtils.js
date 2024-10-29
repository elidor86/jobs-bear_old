import { pages } from "./routeUtils";
import { FacebookIcon, TwitterIcon, LinkedinIcon } from "../components/ext/Icons";

export const footer = {
  socials: [
    {
      icon: <FacebookIcon />,
      link: "https://www.facebook.com/jobsBear/",
    },
    {
      icon: <LinkedinIcon />,
      link: "https://www.linkedin.com/company/26186856",
    },
    {
      icon: <TwitterIcon />,
      link: "https://twitter.com/bear_jobs",
    },
  ],
  links: [
    {
      label: "Blog",
      link: pages.blog(),
    },
    {
      label: "About Us",
      link: pages.aboutUs(),
    },
  ],
  privacy: [
    {
      label: "Contact us",
      link: pages.aboutUs(),
    },
    {
      label: "Privacy policy",
      link: pages.viewJobs(),
    },
    {
      label: "Terms and conditions",
      link: pages.blog(),
    },
  ],
  browseJobs: [
    {
      label: "Browse Jobs By Category",
      link: pages.aboutUs(),
    },
    {
      label: "Browse Jobs By Location",
      link: pages.viewJobs(),
    },
    {
      label: "Browse Jobs By Title",
      link: pages.blog(),
    },
  ],
  countries: [
    {
      label: "JobsBear UK",
      link: pages.aboutUs(),
    },
    {
      label: "JobsBear US",
      link: pages.viewJobs(),
    },
    {
      label: "JobsBear CA",
      link: pages.blog(),
    },
    {
      label: "JobsBear ZA",
      link: pages.blog(),
    },
  ],
};

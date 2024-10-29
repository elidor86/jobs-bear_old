import { pages } from "./routeUtils";

export const navigation = {
  links: [
    {
      label: "About Us",
      link: pages.aboutUs(),
    },
    {
      label: "View Jobs",
      link: pages.viewJobs(),
    },
    {
      label: "Blog",
      link: pages.blog(),
    },
  ],
};

import React from "react";

import AboutUsPage from "../../b2b/modules/AboutUsPage/AboutUsPage";
import { defaultCountry } from "../../b2b/lib/countryUtils";
import { ourExpertise, ourNumbers, whyUs } from "../../b2b/lib/aboutUsPageUtils";

const AboutUs = ({ country, ourExpertise, ourNumbers, whyUs }) => {
  return (
    <AboutUsPage
      country={country}
      ourExpertise={ourExpertise}
      ourNumbers={ourNumbers}
      whyUs={whyUs} />
  );
};

AboutUs.getInitialProps = async (ctx) => {
  const country = ctx?.req?.session?.geo || defaultCountry;

  return {
    country,
    ourExpertise,
    ourNumbers,
    whyUs
  };
};

export default AboutUs;

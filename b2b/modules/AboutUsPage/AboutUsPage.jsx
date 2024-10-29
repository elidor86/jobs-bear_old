import React from "react";

import { header } from "../../lib/aboutUsPageUtils";
import PageLayout from "../../layouts/PageLayouts";
import Header from "./components/Header";
import OurExpertise from "./components/OurExpertise";
import OurNumbers from "./components/OurNumbers";
import WhyUs from "./components/WhyUs";

const AboutUsPage = ({ country, ourExpertise, ourNumbers, whyUs }) => {
  return (
    <PageLayout country={country}>
      <Header {...header} />
      <OurExpertise {...ourExpertise} />
      <OurNumbers {...ourNumbers} />
      <WhyUs {...whyUs} />
    </PageLayout>
  );
};

export default AboutUsPage;

import React from "react";

import ContactUsPage from "../../b2b/modules/ContactUsPage/ContactUsPage";
import { defaultCountry } from "../../b2b/lib/countryUtils";

const ContactUs = ({ country }) => <ContactUsPage country={country} />;

ContactUs.getInitialProps = async (ctx) => {
  const country = ctx?.req?.session || defaultCountry;

  return {
    country,
  };
};

export default ContactUs;

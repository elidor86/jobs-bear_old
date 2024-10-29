import styled from "styled-components";

import { navigation } from "../lib/navigationUtils";
import { footer } from "../lib/footerUtils";
import Navigation from "../components/Navigation/Navigation";
import Footer from "../components/Footer/Footer";
import { countries } from "../lib/countryUtils";

const PageLayout = ({ children, country }) => (
  <Wrapper>
    <Navigation country={country} countries={countries} {...navigation} />
    {children}
    <Footer {...footer} />
  </Wrapper>
);

const Wrapper = styled.div`
  max-width: 100%;
  position: relative;
  overflow: hidden;
`;

export default PageLayout;

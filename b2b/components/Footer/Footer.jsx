import styled from "styled-components";
import Link from "next/link";

import FooterSocials from "../Footer/FooterSocials";
import Container from "../Container/Container";

const Footer = ({ socials, links, privacy, browseJobs, countries }) => (
  <Wrapper>
    <Container>
      <Row>
        <Col>
          <FooterSocials socials={socials} />
        </Col>
        <Col>
          {links.map((link) => (
            <MenuItem {...link} key={link.link + link.label} />
          ))}
        </Col>

        <Col>
          {browseJobs.map((browseJobsLink) => (
            <MenuItem {...browseJobsLink} key={browseJobsLink.link + browseJobsLink.label} />
          ))}
        </Col>
        <Col>
          {privacy.map((privacyLink) => (
              <MenuItem {...privacyLink} key={privacyLink.link + privacyLink.label} />
          ))}
        </Col>
        <Col>
          {countries.map((countriesLink) => (
            <MenuItem {...countriesLink} key={countriesLink.link + countriesLink.label} />
          ))}
        </Col>
      </Row>
    </Container>
  </Wrapper>
);

const MenuItem = ({ label, link }) => <Link href={link} legacyBehavior>{label}</Link>;

const Wrapper = styled.div`
  background: #808ee0;
  padding: 42px 0;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 120px;

  @media (max-width: 801px) {
    padding-right: 0;
    flex-direction: column;
    row-gap: 24px;
  }
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;

  a {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 25px;
    color: #ffffff;
  }
`;

export default Footer;

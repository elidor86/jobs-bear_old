import styled from "styled-components";

import Logo from "../Logo/Logo";

const FooterSocials = ({ socials }) => (
  <SocialsWrapper>
    <LogoWrapper>
      <Logo />
    </LogoWrapper>
    <SocialsIcons>
      {socials.map((social) => (
        <Social {...social} key={social.link} />
      ))}
    </SocialsIcons>
  </SocialsWrapper>
);

const Social = ({ icon, link }) => (
  <SocialLink href={link} target="_blank" rel="noreferrer">
    {icon}
  </SocialLink>
);

const LogoWrapper = styled.div`
  svg {
    width: 116px;
  }
`;

const SocialsWrapper = styled.div`
  column-gap: 24px;
`;

const SocialsIcons = styled.div`
  display: flex;
  column-gap: 24px;
  margin-top: 25px;
  align-items: flex-end;
`;

const SocialLink = styled.a``;

export default FooterSocials;

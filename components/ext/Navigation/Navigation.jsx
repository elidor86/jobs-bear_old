import React, { useState } from "react";
import Link from "next/link";
import styled from "styled-components";

import Container from "../Container/Container";
import LanguageMenu from "../Menu/LanguageMenu";
import Logo from "../Logo/Logo";
import { NavbarBurgerIcon } from "../Icons";
import { pages } from "../../../lib/routeUtils";

const languages = ["US", "UK", "CA", "ZA"];

const Navigation = ({ links }) => {
  const [language, setLanguage] = useState(languages[0]);

  const handleLanguageChange = (value) => setLanguage(value);

  return (
    <Wrapper>
      <Container>
        <Row>
          <Left>
            <Link href={pages.main()} passHref legacyBehavior>
              <LogoWrapper>
                <Logo />
              </LogoWrapper>
            </Link>

            <Menu>
              {links.map((item) => (
                <Link key={item.link} href={item.link} legacyBehavior>
                  <MenuItem>{item.label}</MenuItem>
                </Link>
              ))}
            </Menu>
          </Left>
          <LanguageMenuWraper>
            <LanguageMenu handleChange={handleLanguageChange} value={language} options={languages} />
          </LanguageMenuWraper>
          <MobileMenuWrapper>
            <NavbarBurgerIcon />
          </MobileMenuWrapper>
        </Row>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: #808ee0;
  height: 100px;

  & > div {
    height: 100%;
  }

  @media (max-width: 701px) {
    height: 56px;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  column-gap: 100px;
  flex: 1;
  height: 100%;

  @media (max-width: 1601px) {
    column-gap: 50px;
  }
`;

const LogoWrapper = styled.a`
  @media (max-width: 701px) {
    & svg {
      width: 100px;
    }
  }
`;

const LanguageMenuWraper = styled.div`
  @media (max-width: 701px) {
    display: none;
  }
`;

const MobileMenuWrapper = styled.div`
  display: none;
  cursor: pointer;

  @media (max-width: 701px) {
    display: block;
  }
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  column-gap: 38px;
  margin-top: 5px;

  @media (max-width: 701px) {
    display: none;
  }
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #ffffff;
`;

export default Navigation;

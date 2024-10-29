import React from "react";
import styled from "styled-components";

import Container from "../../../components/ext/Container/Container";
import SearchAction from "./SearchAction";

const Header = ({ title, subtitle, jobsTextfield, locationTextfield, searchAction }) => (
  <Wrapper>
    <Container>
      <Content>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
        <SearchAction jobsTextfield={jobsTextfield} locationTextfield={locationTextfield} searchAction={searchAction} />
      </Content>
    </Container>
    <Image src="/images/homepage/header/hero.png" alt="Man and Bear app" />
    <BackgroundRectangle />
  </Wrapper>
);

const Wrapper = styled.div`
  background: url(/images/homepage/header/background.png);
  background-size: cover;
  padding: 57px 0 77px;
  overflow: hidden;
  position: relative;

  @media (max-width: 701px) {
    padding: 98px 0 60px;
  }

  @media (max-width: 381px) {
    padding: 40px 0 60px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 2;

  @media (max-width: 461px) {
    row-gap: 10px;
  }
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 80px;
  line-height: 85px;
  color: #3e4598;

  @media (max-width: 1201px) {
    font-size: 60px;
    line-height: 62px;
  }

  @media (max-width: 701px) {
    font-size: 50px;
    line-height: 51px;
  }

  @media (max-width: 461px) {
    font-size: 45px;
    line-height: 45px;
  }

  @media (max-width: 381px) {
    font-size: 35px;
    line-height: 37px;
  }
`;

const Subtitle = styled.h2`
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0.02em;
  color: #3e4699;
  margin-top: 28px;
  margin-bottom: 45px;

  @media (max-width: 1201px) {
    max-width: 60%;
  }

  @media (max-width: 1001px) {
    max-width: 100%;
  }

  @media (max-width: 461px) {
    padding-bottom: 8px;
  }
`;

const Image = styled.img`
  position: absolute;
  right: 250px;
  top: 57px;
  z-index: 1;

  @media (max-width: 1601px) {
    right: 150px;
  }

  @media (max-width: 1441px) {
    right: 25px;
  }

  @media (max-width: 1201px) {
    right: 0px;
  }

  @media (max-width: 1001px) {
    display: none;
  }
`;

const BackgroundRectangle = styled.div`
  position: absolute;
  background: rgba(255, 255, 255, 0.55);
  transform: rotate(-44.55deg);
  width: 554.01px;
  height: 1121.05px;
  top: -160px;
  right: 0;
  border-radius: 100px;

  @media (max-width: 1601px) {
    right: -100px;
  }

  @media (max-width: 1441px) {
    right: -300px;
  }

  @media (max-width: 1201px) {
    right: -325px;
  }

  @media (max-width: 1001px) {
    display: none;
  }
`;

export default Header;

import React from "react";
import styled from "styled-components";

import Container from "../../../components/Container/Container";

import useWindowDimensions from "../../../lib/useWindowDimensions";

const Header = ({ title, description, imageSrc }) => {
  const { width } = useWindowDimensions();

  const displayedDescription =
    width < 700 ? description.replace(/\n+/g, (match) => (match.length === 2 ? "\n" : " ")) : description;

  return (
    <OuterWrapper>
      <Container>
        <Info>
          <Title>{title}</Title>
          <Description>{displayedDescription}</Description>
        </Info>
      </Container>
      <Bottom />
      <Image src={imageSrc} />
    </OuterWrapper>
  );
};

const OuterWrapper = styled.div`
  position: relative;
  background: #ffffff;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 17px;
  padding: 36px 0 35px;
  position: relative;
  z-index: 2;

  @media (max-width: 901px) {
    padding: 20px 0;
  }

  @media (max-width: 601px) {
    padding: 5px 0 10px;
  }
`;

const Title = styled.p`
  font-family: "Lato";
  font-weight: 700;
  font-size: 40px;
  line-height: 45px;
  color: #3e4598;

  @media (max-width: 1401px) {
    font-size: 38px;
  }

  @media (max-width: 1201px) {
    font-size: 34px;
  }

  @media (max-width: 601px) {
    font-size: 24px;
  }
`;

const Description = styled.pre`
  font-family: "Lato";
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  color: #1d1d1b;
  max-width: 640px;
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;

  @media (max-width: 1621px) {
    max-width: 500px;
  }

  @media (max-width: 1101px) {
    max-width: 400px;
  }

  @media (max-width: 1001px) {
    max-width: 100%;
  }

  @media (max-width: 601px) {
    font-size: 16px;
  }
`;

const Image = styled.img`
  position: absolute;
  right: 250px;
  top: 57px;
  z-index: 1;
  height: 454px;

  @media (max-width: 1601px) {
    right: 150px;
  }

  @media (max-width: 1441px) {
    right: 83px;
  }

  @media (max-width: 1201px) {
    right: 0px;
  }

  @media (max-width: 1001px) {
    display: none;
  }
`;

const Bottom = styled.div`
  background-image: url(/static/b2b/images/homepage/feedback/bg.png);
  background-size: cover;
  height: 158px;

  @media (max-width: 101px) {
    height: 115px;
  }

  @media (max-width: 901px) {
    height: 95px;
  }

  @media (max-width: 601px) {
    height: 65px;
  }
`;

export default Header;

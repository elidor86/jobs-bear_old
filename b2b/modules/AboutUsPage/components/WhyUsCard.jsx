import React from "react";
import styled from "styled-components";

const WhyUsCard = ({ imageSrc, title, description }) => (
  <Wrapper>
    <ImageWrapper>
      <img src={imageSrc} />
    </ImageWrapper>
    <InfoWrapper>
      <TitleWrapper>
        <Title>{title}</Title>
      </TitleWrapper>
      <Description>{description}</Description>
    </InfoWrapper>
  </Wrapper>
);

const Wrapper = styled.div`
  max-width: 243px;

  @media (max-width: 601px) {
    display: flex;
    column-gap: 45px;
    align-items: flex-start;
    max-width: 100%;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 85px;

  @media (max-width: 601px) {
    height: 50px;
  }
`;

const InfoWrapper = styled.div`
  width: 100%;
`;

const TitleWrapper = styled.div`
  padding: 46px 0 33px;

  @media (max-width: 601px) {
    padding: 0 0 7px;
  }
`;

const Title = styled.p`
  font-family: "Lato";
  font-weight: 700;
  font-size: 24px;
  line-height: 30px;
  text-align: center;
  text-transform: uppercase;
  color: #1d1d1b;

  @media (max-width: 601px) {
    text-align: left;
  }
`;

const Description = styled.p`
  font-family: "Lato";
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  text-align: center;
  color: #0c264c;
  height: 100px;

  @media (max-width: 601px) {
    text-align: left;
  }
`;

export default WhyUsCard;

import React from "react";
import styled from "styled-components";

const OurExpertiseCard = ({ imageSrc, title, description }) => (
  <Wrapper>
    <Top>
      <ImageWrapper>
        <img src={imageSrc} />
      </ImageWrapper>
      <Title>{title}</Title>
    </Top>
    <Description>{description}</Description>
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  max-width: 186px;

  @media (max-width: 801px) {
    max-width: 100%;
  }
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 26px;
  flex: 1;

  @media (max-width: 801px) {
    flex: 0;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Title = styled.p`
  font-family: "Lato";
  font-weight: 700;
  font-size: 24px;
  line-height: 30px;
  color: #1d1d1b;
`;

const Description = styled.p`
  font-family: "Lato";
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  color: #1d1d1b;
  height: 284px;

  @media (max-width: 801px) {
    height: fit-content;
  }
`;

export default OurExpertiseCard;

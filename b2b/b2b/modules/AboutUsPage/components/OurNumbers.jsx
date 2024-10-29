import React from "react";
import styled from "styled-components";

import Container from "../../../components/Container/Container";
import StatisticsItem from "./StatisticsItem";

const OurNumbers = ({ title, numbers, imageSrc }) => (
  <OuterWrapper>
    <Container>
      <Wrapper>
        <Left>
          <Title>{title}</Title>
          <StatisticsWrapper>
            {numbers.map((item) => (
              <StatisticsItem {...item} key={item.label}/>
            ))}
          </StatisticsWrapper>
        </Left>
        <ImageWrapper>
          <img src={imageSrc} alt='site screen' />
        </ImageWrapper>
      </Wrapper>
    </Container>
  </OuterWrapper>
);

const OuterWrapper = styled.div`
  background: #ffffff;

  @media (max-width: 801px) {
    padding-top: 33px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  @media (max-width: 901px) {
    flex-direction: column-reverse;
    align-items: flex-start;
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 72px;
  padding-bottom: 77px;

  @media (max-width: 901px) {
    row-gap: 7px;
    padding-bottom: 33px;
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

const StatisticsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 28px;

  @media (max-width: 701px) {
    row-gap: 12px;
  }
`;

const ImageWrapper = styled.div`
  height: 429px;
  overflow: hidden;

  & > img {
    width: 330px;
  }

  @media (max-width: 1101px) {
    & > img {
      width: 290px;
    }
  }

  @media (max-width: 901px) {
    height: 300px;
    width: 100%;
    margin-bottom: 32px;
    & > img {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  @media (max-width: 701px) {
    height: 230px;
    & > img {
      width: 224px;
    }
  }
`;

export default OurNumbers;

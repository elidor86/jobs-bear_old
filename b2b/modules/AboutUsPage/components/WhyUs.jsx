import React from "react";
import styled from "styled-components";

import Container from "../../../components/Container/Container";
import WhyUsCard from "./WhyUsCard";

const WhyUs = ({ title, cards }) => (
  <OuterWrapper>
    <Container>
      <InnerWrapper>
        <Title>{title}</Title>
        <CardsWrapper>
          {cards.map((card) => (
            <WhyUsCard {...card} key={card.title} />
          ))}
        </CardsWrapper>
      </InnerWrapper>
    </Container>
  </OuterWrapper>
);

const OuterWrapper = styled.div`
  padding: 42px 0 88px;
  background: #f0f1f9;

  @media (max-width: 601px) {
    padding: 39px 0 100px;
  }
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 88px;

  @media (max-width: 601px) {
    row-gap: 26px;
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

const CardsWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  & > div {
    width: calc(33% - 37px);
  }

  @media (max-width: 601px) {
    flex-direction: column;
    row-gap: 68px;

    & > div {
      width: 100%;
    }
  }
`;

export default WhyUs;

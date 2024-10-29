import React from "react";
import styled from "styled-components";

import Container from "../../../components/Container/Container";
import OurExpertiseCard from "./OurExpertiseCard";

const OurExpertise = ({ title, cards }) => (
  <OuterWrapper>
    <Container>
      <Wrapper>
        <Title>{title}</Title>
        <CardsWrapper>
          {cards.map((card) => (
            <OurExpertiseCard {...card} key={card.title}/>
          ))}
        </CardsWrapper>
      </Wrapper>
    </Container>
  </OuterWrapper>
);

const OuterWrapper = styled.div`
  background: #ffffff;

  @media (max-width: 801px) {
    background: #f0f1f9;
  }
`;

const Wrapper = styled.div`
  padding: 64px 0;
  display: flex;
  flex-direction: column;
  row-gap: 68px;

  @media (max-width: 1001px) {
    padding: 24px 0 52px;
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
  flex-wrap: wrap;

  & > div {
    width: calc(25% - 46px);
  }

  @media (max-width: 801px) {
    row-gap: 52px;

    & > div {
      width: calc(50% - 36px);
    }
  }
`;

export default OurExpertise;

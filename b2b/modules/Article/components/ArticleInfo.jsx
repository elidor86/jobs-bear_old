import React from "react";
import styled from "styled-components";

import Container from "../../../components/Container/Container";

const ArticleInfo = ({ mainTitle, date, content }) => (
  <Container>
    <Wrapper>
      <MainTitle>{mainTitle}</MainTitle>
      <Date>{date}</Date>
      <ContentWrapper>
        {content.map((item) => (
          <SectionWrapper key={item.title}>
            <Title>{item.title}</Title>
            <Description>{item.description}</Description>
          </SectionWrapper>
        ))}
      </ContentWrapper>
    </Wrapper>
  </Container>
);

const Wrapper = styled.div`
  padding-bottom: 117px;
  display: flex;
  flex-direction: column;
  row-gap: 19px;
`;

const MainTitle = styled.p`
  font-family: "Lato";
  font-weight: 700;
  font-size: 56px;
  line-height: 66px;
  text-transform: capitalize;
  color: #000000;
  width: 100%;
  max-width: 700px;

  @media (max-width: 1001px) {
    font-size: 46px;
    line-height: 56px;
  }

  @media (max-width: 801px) {
    font-size: 36px;
    line-height: 43px;
  }

  @media (max-width: 501px) {
    font-size: 24px;
    line-height: 30px;
    max-width: 232px;
  }
`;

const Date = styled.p`
  font-family: "Lato";
  font-weight: 700;
  font-size: 16px;
  line-height: 45px;
  text-transform: capitalize;
  color: #000000;

  @media (max-width: 1001px) {
    line-height: 25px;
  }

  @media (max-width: 501px) {
    display: none;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 40px;

  @media (max-width: 501px) {
    row-gap: 24px;
  }
`;

const SectionWrapper = styled.div`
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  row-gap: 30px;

  @media (max-width: 501px) {
    row-gap: 20px;
  }
`;

const Title = styled.p`
  font-family: "Lato";
  font-weight: 600;
  font-size: 28px;
  line-height: 30px;
  color: #0c264c;

  @media (max-width: 801px) {
    font-size: 20px;
    line-height: 24px;
  }

  @media (max-width: 501px) {
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
  }
`;

const Description = styled.pre`
  font-family: "Lato";
  font-weight: 400;
  font-size: 18px;
  line-height: 30px;
  color: #0c264c;
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;

  @media (max-width: 801px) {
    font-size: 16px;
    line-height: 24px;
  }

  @media (max-width: 501px) {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
  }
`;

export default ArticleInfo;

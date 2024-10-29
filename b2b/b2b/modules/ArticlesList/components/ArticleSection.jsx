import React from "react";
import Link from "next/link";
import styled from "styled-components";

const ArticleSection = ({ imageSrc, title, date, subtitle, href }) => (
  <Wrapper>
    <Image src={imageSrc} />
    <Info>
      <Row>
        <Title>{title}</Title>
        <Date>{date}</Date>
      </Row>
      <Subtitle>{subtitle}</Subtitle>
    </Info>
    <Link passHref href={href} legacyBehavior>
      <Action>READ MORE &nbsp;&gt;</Action>
    </Link>
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius: 10px;
  min-height: 280px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  padding: 22px 0 23px;

  @media (max-width: 501px) {
    padding: 16px 0 10px;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const Title = styled.p`
  font-family: "Lato";
  font-weight: 700;
  font-size: 35px;
  line-height: 45px;
  text-transform: capitalize;
  color: #000000;
  max-width: 500px;

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
  text-align: right;
  text-transform: capitalize;
  color: #000000;

  @media (max-width: 801px) {
    display: none;
  }
`;

const Subtitle = styled.p`
  font-family: "Lato";
  font-weight: 400;
  font-size: 16px;
  line-height: 30px;
  text-transform: capitalize;
  color: #000000;
  max-width: 600px;

  @media (max-width: 601px) {
    display: none;
  }
`;

const Action = styled.p`
  margin-top: auto;
  font-weight: 700;
  font-size: 18px;
  line-height: 40px;
  color: #d92cff;
  cursor: pointer;
`;

export default ArticleSection;

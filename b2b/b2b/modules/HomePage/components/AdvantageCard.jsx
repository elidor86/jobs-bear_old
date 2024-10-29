import React from "react";
import styled from "styled-components";

import Button from "../../../components/Button/Button";


const AdvantageCard = ({ icon, title, description, className }) => (
  <Wrapper className={className}>
    <IconWrapper>
      <img src={icon} alt="icons" />
    </IconWrapper>
    <Title>{title}</Title>
    <Paragraph dangerouslySetInnerHTML={{ __html: description }}></Paragraph>

  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    min-width: 146px;
  }

  a {
    margin-top: auto;
  }

  @media (max-width: 801px) {
    button {
      display: none;
    }
  }
`;

const IconWrapper = styled.div`
  width: 58px;
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    display: block;
   max-height: 58px;
  }
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 45px;
  text-align: center;
  color: #3e4598;
  margin-bottom: 15px;
  margin-top: 27px;
`;

const Paragraph = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: #3e4598;
  margin-bottom: 32px;
  max-width: 207px;

  @media (max-width: 801px) {
    margin-bottom: 0;
    max-width: 231px;
  }
`;

export default AdvantageCard;

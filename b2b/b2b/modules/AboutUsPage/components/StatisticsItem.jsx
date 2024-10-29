import React from "react";
import styled from "styled-components";

import { numberDecorator } from "../../../lib/numberDecorator";
import useWindowDimensions from "../../../lib/useWindowDimensions";

const StatisticsItem = ({ value, label, changeLabelColor }) => {
  const { width } = useWindowDimensions();
  return (
    <Wrapper>
      <Value>{width < 700 ? `${Math.floor((value / 1000000) * 10) / 10}M` : numberDecorator(value)}</Value>
      <Label changeLabelColor={changeLabelColor}>{label}</Label>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 34px;

  @media (max-width: 1101px) {
    column-gap: 14px;
  }

  @media (max-width: 501px) {
    align-items: flex-end;
    
  }
`;

const Value = styled.p`
  font-weight: 700;
  font-size: 60px;
  line-height: 1px;
  color: #5c6ac3;

  @media (max-width: 1101px) {
    font-size: 40px;
  }

  @media (max-width: 901px) {
    font-size: 60px;
  }

  @media (max-width: 701px) {
    font-weight: 700;
    font-size: 60px;
    line-height: 1px;
    color: #3e4598;
  }
  
`;

const Label = styled.p`
  font-family: "Lato";
  font-weight: 900;
  font-size: 18px;
  line-height: 75px;
  text-transform: uppercase;

  @media (max-width: 701px) {
    font-weight: 700;
    font-size: 16px;
    line-height: 40px;
    ${({ changeLabelColor }) => changeLabelColor && `color: #3E4598`};
  }

  @media (max-width: 500px) {
    margin-bottom: 58px;
    margin-bottom: 25px;
  }
  
  @media (max-width: 401px) {
    font-size: 13px;
  }
`;

export default StatisticsItem;

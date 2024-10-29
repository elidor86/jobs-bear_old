import styled from "styled-components";
import React from "react";


const Title = ({ children }) => <MainTitle>{children}</MainTitle>;

const MainTitle = styled.p`
  font-weight: 700;
  font-size: 56px;
  line-height: 66px;
  text-transform: capitalize;
  color: #000000;
  width: 100%;
  max-width: 800px;

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

export default Title;
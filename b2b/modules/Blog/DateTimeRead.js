import React from "react";
import styled from "styled-components";

const DateTimeRead = ({ children }) => <Content>{children}</Content>;

const Content = styled.p`
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

  export default DateTimeRead
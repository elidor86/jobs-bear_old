import React from "react";
import styled from "styled-components";

const Link = ({link, children }) => <Content href={link}>{children}</Content>;

const Content = styled.a`
  cursor: pointer;
  font-weight: 700;
  font-size: 18px;
  line-height: 30px;
  color: #808EE0;
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

export default Link
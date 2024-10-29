import React from "react";
import styled from "styled-components";

const Description = ({ children, title }) => (
  <Wrapper>
    {title && <Title>{title}</Title>}
    {children && <Desc>{children}</Desc>}
  </Wrapper>
);
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px
`;
const Title = styled.h3`
  font-size: 28px;
  font-weight: 600;
  line-height: 30px;
  color: #0c264c;
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
"p": {
  color: red;
  font-size: 18px;
  font-weight: 400;
},
@media(max-width: 801 px) {
  font-size: 16px;
  line-height: 24px;
}

  @media (max-width: 501px) {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
  }
`;
const Desc = styled.p`
  font-size: 18px;
  font-weight: 400;
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

export default Description;
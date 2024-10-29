import React from "react";
import styled from "styled-components";

const Content = ({children}) => <Wrapper>{children}</Wrapper>

const Wrapper = styled.div`
  padding-top: 10px;
  padding-bottom: 117px;
  display: flex;
  flex-direction: column;
  gap: 35px;
`;

export default Content
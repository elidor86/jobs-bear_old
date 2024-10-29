import React from "react";
import styled from "styled-components";

const Container = ({ children }) => <Wrapper>{children}</Wrapper>;

const Wrapper = styled.div`
  width: 1019px;
  max-width: 90%;
  margin: 0 auto;

  @media (max-width: 1601px) {
    width: 1019px;
  }
`;

export default Container;

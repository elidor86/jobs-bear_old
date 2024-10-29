import React from "react";
import styled from "styled-components";
import Container from "../../../components/Container/Container";

import BlogLogo from "../../../components/Logo/BlogLogo";

const Header = () => (
  <Wrapper>
    <Container>
      <BlogLogo />
    </Container>
  </Wrapper>
);

const Wrapper = styled.div`
  padding: 60px 0;

  @media (max-width: 601px) {
    display: none;
  }
`;

export default Header;

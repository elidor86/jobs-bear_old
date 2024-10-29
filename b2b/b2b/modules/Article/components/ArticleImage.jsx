import React from "react";
import styled from "styled-components";

import Container from "../../../components/Container/Container";

const ArticleImage = ({ imageSrc }) => (
  <Wrapper>
    <Container>
      <Image src={imageSrc} />
    </Container>
  </Wrapper>
);

const Wrapper = styled.div`
  padding-bottom: 42px;

  @media (max-width: 601px) {
    padding: 40px 0 22px;
  }
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius: 10px;
  min-height: 280px;
`;

export default ArticleImage;

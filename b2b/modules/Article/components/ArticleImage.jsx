import React from "react";
import styled from "styled-components";


const ArticleImage = ({ imageSrc }) => (
  <Wrapper>
    <Image src={imageSrc} />
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

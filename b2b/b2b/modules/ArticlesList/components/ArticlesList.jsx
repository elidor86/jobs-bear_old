import React from "react";
import styled from "styled-components";
import Container from "../../../components/Container/Container";

import ArticleSection from "./ArticleSection";

const ArticlesList = ({ articles }) => (
  <Container>
    <Wrapper>
      {articles.map((item) => (
        <ArticleSection {...item} key={item.title} />
      ))}
    </Wrapper>
  </Container>
);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 51px;
  padding-bottom: 62px;

  @media (max-width: 601px) {
    padding: 35px 0 156px;
  }
`;

export default ArticlesList;

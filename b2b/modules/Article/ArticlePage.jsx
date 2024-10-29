import React from "react";

import PageLayout from "../../layouts/PageLayouts";
import ArticleImage from "./components/ArticleImage";
import Header from "./components/Header";
import ArticleInfo from "./components/ArticleInfo";

const ArticlePage = ({ country, articleImage, content }) => {
  return (
    <PageLayout country={country}>
      <Header />
      <ArticleImage imageSrc={articleImage} />
      <ArticleInfo mainTitle={content.mainTitle} content={content.content} date={content.date} />
    </PageLayout>
  );
};

export default ArticlePage;

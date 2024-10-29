import React from "react";

import PageLayout from "../../layouts/PageLayouts";
import Header from "./components/Header";
import ArticlesList from "./components/ArticlesList";

const ArticlesListPage = ({ country, articles}) => {
  return (
    <PageLayout country={country}>
      <Header />
      <ArticlesList articles={articles} country={country}/>
    </PageLayout>
  );
};

export default ArticlesListPage;

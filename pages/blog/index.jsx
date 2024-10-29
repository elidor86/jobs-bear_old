import React from "react";

import ArticlesListPage from "../../b2b/modules/ArticlesList/ArticlesListPage";
import { defaultCountry } from "../../b2b/lib/countryUtils";
import { articles } from "../../b2b/lib/articlesListPageUtils";

const ArticleList = ({ country, articles }) => <ArticlesListPage country={country} articles={articles} />;

ArticleList.getInitialProps = async (ctx) => {
  const country = ctx?.req?.session?.geo || defaultCountry;

  return {
    country,
    articles
  };
};

export default ArticleList;

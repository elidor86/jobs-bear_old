import React from "react";

import ArticlePage from "../../b2b/modules/Article/ArticlePage";
import { defaultCountry } from "../../b2b/lib/countryUtils";
import { articleContent, imageSrc } from "../../b2b/lib/articlepageUtils";

const Article = ({ country, articleImage, articleContent }) => {
  return (
    <ArticlePage
      country={country}
      articleImage={articleImage}
      content={articleContent}
    />
  )
};

Article.getInitialProps = async (ctx) => {
  const country = ctx?.req?.session?.geo || defaultCountry;

  return {
    country,
    articleImage: imageSrc,
    articleContent
  };
};

export default Article;

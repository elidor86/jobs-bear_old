import React from "react";

import { header, blogPosts, advantages } from "../../lib/homepageUtils";
import Header from "./components/Header";
import BlogList from "./components/BlogList";
import WhyUs from "./components/WhyUs";
import PageLayout from "../../layouts/PageLayouts";

const HomePage = () => (
  <PageLayout>
    <Header {...header} />
    <WhyUs advantages={advantages} />
    <BlogList posts={blogPosts} />
  </PageLayout>
);

export default HomePage;

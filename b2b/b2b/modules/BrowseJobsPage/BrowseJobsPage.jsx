import React from "react";
import styled from "styled-components";

import PageLayout from "../../layouts/PageLayouts";
import Layout from "../../components/Layout/Layout";
import PageTitle from "../../components/PageTitle/PageTitle";
import Content from "./components/Content";

const BrowseJobsPage = ({ country, data }) => {
  return (
    <PageLayout country={country}>
      <Wrapper>
        <PageTitle title="Browse job openings in the " whiteBackground country={country}/>
        <Layout>
          <Content data={data} />
        </Layout>
      </Wrapper>
    </PageLayout>
  );
}

const Wrapper = styled("div")({
  backgroundColor: "#F0F1F9",
});

export default BrowseJobsPage;

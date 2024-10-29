import React from "react";
import styled from "styled-components";
import Layout from "../Layout/Layout";
import { useRouter } from "next/router";
import { pages } from "../../lib/routeUtils";

const PageTitle = ({ title, whiteBackground, country }) => {
  const { asPath } = useRouter();
  const collectionOfPages = [pages.jobsByCategory(), pages.jobsByLocation(), pages.jobsByTitle()];
  const isJobsPage = collectionOfPages.includes(asPath);
  return (
    <Wrapper whiteBackground={whiteBackground}>
      <Layout>
        <Title>{title} {isJobsPage && country}</Title>
      </Layout>
    </Wrapper>
  );
};

const Wrapper = styled("div")(({ whiteBackground }) => ({
  backgroundColor: whiteBackground ? "#FFFFFF" : "#F0F1F9",
  padding: "47px 37px",
  "@media(max-width: 900px)": {
    padding: "23px 0"
  }
}));

const Title = styled("h1")({
  fontFamily: "Lato",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: "40px",
  lineHeight: "45px",
  color: "#3E4598",
  "@media(max-width: 600px)": {
    fontSize: "32px"
  }
});

export default PageTitle;

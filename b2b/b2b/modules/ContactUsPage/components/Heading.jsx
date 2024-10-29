import React from "react";
import styled from "styled-components";
import Layout from "../../../components/Layout/Layout";

const Heading = ({ title }) => (
  <Wrapper>
    <Layout>
      <Title>{title}</Title>
    </Layout>
  </Wrapper>
);

const Wrapper = styled("div")({
  backgroundColor: "#F0F1F9",
  padding: '47px 37px',
  '@media(max-width: 900px)': {
    padding: '23px 0'
  }
});

const Title = styled("h1")({
  fontFamily: "Lato",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: "40px",
  lineHeight: "45px",
  color: "#3E4598",

  '@media(max-width: 600px)': {
    fontSize: "32px",
  }
});

export default Heading;
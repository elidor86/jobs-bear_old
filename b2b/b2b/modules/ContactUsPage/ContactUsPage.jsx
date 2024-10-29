import React from "react";

import PageLayout from "../../layouts/PageLayouts";
import Form from "./components/Form";
import Layout from "../../components/Layout/Layout";
import styled from "styled-components";
import PageTitle from "../../components/PageTitle/PageTitle";

const ContactUsPage = ({ country }) => (
  <PageLayout country={country}>
    <Wrapper>
      <PageTitle title="Let’s keep in touch!" />
      <Layout>
        <Form formData={formData} />
      </Layout>
    </Wrapper>
  </PageLayout>
);

const Wrapper = styled("div")({
  backgroundColor: "#FFFFFF",
});

const formData = [
  {
    title: "First name",
    name: "firstName",
    placeholder: "First name",
    type: "text",
  },
  {
    title: "Last name",
    name: "lastName",
    placeholder: "Last name",
    type: "text",
  },
  {
    title: "Email",
    name: "email",
    placeholder: "Email",
    type: "email",
  },
  {
    title: "Phone Number",
    name: "phoneNumber",
    placeholder: "Phone Number",
    type: "phone",
  },
  {
    placeholder: "Your Message",
    type: "text",
    variant: "textarea",
    name: "message",
  },
];

export default ContactUsPage;

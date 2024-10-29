import React, {useState} from "react";

import PageLayout from "../../layouts/PageLayouts";
import Form from "./components/Form";
import Layout from "../../components/Layout/Layout";
import styled from "styled-components";
import PageTitle from "../../components/PageTitle/PageTitle";
import FinalScreen from "./components/FinalScreen";

const ContactUsPage = ({country, app}) => {
    const [showForm, setShowForm] = useState(true);

    const handleFormClose = () => setShowForm(false);
    const handleFormSubmit = (data) => {
        try {
            window.MainApp.b2bEventHandle({eventName: "SubmitContactUsForm", ContactFormData: data});
        } catch (e) {

        }

    };

    return (
        <PageLayout country={country}>
            <Wrapper>
                {showForm ? (
                    <>
                        <PageTitle title="Let’s keep in touch!"/>
                        <Layout>
                            <Form formData={formData} handleFormClose={handleFormClose}
                                  handleFormSubmit={handleFormSubmit}/>
                        </Layout>
                    </>
                ) : (
                    <FinalScreen/>
                )}
            </Wrapper>
        </PageLayout>
    );
};

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
        placeholder: "Your Message",
        type: "text",
        variant: "textarea",
        name: "message",
    },
];

export default ContactUsPage;

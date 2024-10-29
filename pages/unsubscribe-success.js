import StandardPage from "../components/StandardPage/StandardPage";
import {NextSeo} from "next-seo";
import styled from "styled-components";
import React, {Component} from "react";

const Msg = styled.div`
     min-height: 100px;
    text-align: center;
    margin-top: 50px;
    font-size: 25px;

`;

class Cookies extends React.Component {
    render() {
        const {app, keyword} = this.props;

        let msg = "You have been successfully unsubscribed!";
        let email = "";

        try {
            if (ClientVars.email && ClientVars.email.length > 0) {
                email = ClientVars.email
            }
        } catch (e) {

        }

        return (
            <StandardPage
                title="Unsubscribe"
                publishedOn=""
                isStatic={false}
                hideBottomEmailBar={true}
                getKeyword={this.props.getKeyword}
                setKeyword={this.props.setKeyword}
                setProvidedEmail={this.props.setProvidedEmail}
                getProvidedEmail={this.props.getProvidedEmail}
                keyword={keyword}
                origin="job_page"
                app={app}
            >
                <NextSeo
                    title="Unsubscribe success | Jobs Bear | Your Job is Our Job"
                    description="Over 167,457 jobs are available in our site, go ahead and find yours."
                />

                <Msg>
                    {email}
                    <br/>
                    <br/>
                    {msg}
                </Msg>


            </StandardPage>
        );
    }
}

export default Cookies;

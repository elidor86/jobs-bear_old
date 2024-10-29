import StandardPage from "../../components/StandardPage/StandardPage";
import fetchJobById from "../../lib/fetchJobById";
import Router from "next/router";
import logEvent from "../../lib/logEvent";


import {NextSeo} from "next-seo";
import Head from "next/head";


import Premium from "../../components/Wizard/Premium/PremiumJob";
import Social from "../../components/Wizard/Social/Social";


import Gdpr from "../../components/gdpr/Gdpr";
import React from "react";
import handleJobClick from "../../lib/handleJobClick";


class JobPage extends React.Component {

    constructor(props) {

        //console.log(props)

        super(props);


        this.state = {};


    }

    continue() {


        this.props.app.goToPage({
            newWindow: false,
            page: "jobs"
        })

    }

    noThanks() {


        this.props.app.goToPage({
            newWindow: false,
            page: "jobs"
        })

    }

    emailSubmit(email, origin, newTab, name, doJobClick, url, title, jobSrc, ppc, jobBody) {


        logEvent("click-email_submit", {origin: "premium-wizard"});

        this.props.app.setProvidedEmail(email);

        this.props.app.goToPage({
            newWindow: false,
            page: "jobs"
        })

    }

    componentDidMount() {


    }

    componentWillUnmount() {

    }

    componentDidCatch(error, info) {
        console.log(`error in [id].js.\n error: ${error}\n info: ${info}`);
    }

    render() {


        let {
            app
        } = this.props;


        let versionHtml = "";

        versionHtml =
            <Premium
                continue={this.emailSubmit.bind(this)}
                noThanks={this.noThanks.bind(this)}
                goToJob={function () {

                }}
                app={app}
                city="test"
                company="test"
                views="36"
                title="test"
                body="test">
            </Premium>


        return (
            <StandardPage
                getKeyword={this.props.getKeyword}
                setKeyword={this.props.setKeyword}
                setProvidedEmail={this.props.setProvidedEmail}
                getProvidedEmail={this.props.getProvidedEmail}
                origin="wizard"
                hideBottomEmailBar={true}
                app={app}>

                <NextSeo
                    title="Find Your Next Job"
                    description="Your next great job is here."
                    additionalMetaTags={[
                        {
                            property: "keywords",
                            content: "jobs near me, apply"
                        }
                    ]}
                />


                {versionHtml}


                <Gdpr
                    pageVersion={this.props.pageVersion}
                    app={app}
                    jobPageVersion={this.props.pageVersion}>
                </Gdpr>

            </StandardPage>
        );
    }
}

export default JobPage;

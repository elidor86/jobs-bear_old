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


class JobPage extends React.Component {

    constructor(props) {

        //console.log(props)

        super(props);


        this.state = {
            formattedAddress: ""
        };


        try {

            let formattedAddress = this.props.app.getLocation();

            if (formattedAddress && formattedAddress.length > 0) {
                this.state.formattedAddress = formattedAddress;
            }

        } catch (e) {

        }

        try {

            let lat = this.props.app.props.lat || this.props.app.getClientVars("lat");
            let long = this.props.app.props.long || this.props.app.getClientVars("long");

            try {
                lat = parseFloat(lat);
                long = parseFloat(long);
            } catch (e) {

            }

            if (typeof lat == "number") {
                this.state.lat = lat;
            }


            if (typeof long == "number") {
                this.state.long = long;
            }


        } catch (e) {

        }


    }

    changeLocationValue = v => {

        let formattedAddress = null;
        let lat = null;
        let long = null;
        let geo = null;

        if (v && typeof v == "object") {

            if (v.formattedAddress && v.formattedAddress.length > 0) {
                formattedAddress = v.formattedAddress;
                this.setState({
                    formattedAddress: v.formattedAddress
                })
            }

            if ("lat" in v) {
                lat = v.lat;
                this.setState({
                    lat: v.lat
                })
            }

            if ("long" in v) {
                long = v.long;
                this.setState({
                    long: v.long
                })
            }

            if ("geo" in v) {
                geo = v.geo;
            }

            if (formattedAddress && lat && long) {

                this.props.app.setLocation({
                    lat,
                    long,
                    geo,
                    formattedAddress
                })

            }

        }

    };

    continue() {

        this.props.app.goToPage({
            queryParams: {
                lat: this.state.lat,
                long: this.state.long,
                formattedAddress: this.state.formattedAddress
            },
            newWindow: false,
            page: "job-finder/2"
        })

        logEvent("wizard-1-continue")

    }

    noThanks() {

        let tmp = {
            lat: this.state.lat,
            long: this.state.long,
            formattedAddress: this.state.formattedAddress
        }

        console.log("tmp", tmp)

        this.props.app.goToPage({
            queryParams: {
                lat: this.state.lat,
                long: this.state.long,
                formattedAddress: this.state.formattedAddress
            },
            newWindow: false,
            page: "job-finder/2"
        })


        logEvent("wizard-1-noThanks")

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

        let title = "Find Your Next Job";

        let desc = "Companies are looking for you. Find jobs near you";
        let q = app.getKeyword();
        let l = app.getLocation();

        if (q && q.length > 0) {

            title = "Find Your Next " + q + " job";

            if (l && l.length > 0) {
                desc = "Companies are looking for you. Find " + q + " jobs in " + l
            }

        }


        let formattedAddress = this.state.formattedAddress;


        let versionHtml = "";

        versionHtml =
            <Social
                continue={this.continue.bind(this)}
                noThanks={this.noThanks.bind(this)}
                changeLocationValue={this.changeLocationValue.bind(this)}
                goToJob={function () {

                }}
                app={app}
                city={formattedAddress}
                company="test"
                views="36"
                title="test"
                body="test">
            </Social>


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
                    title={title}
                    description={desc}
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

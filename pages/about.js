import AboutHeader from "../components/AboutHeader/AboutHeader";
import EmailBigCard from "../components/EmailBigCard/EmailBigCard";
import validateEmailForm from "../lib/validateEmailForm";
import SearchModal from "../components/JobSearch/SearchModal";
import {NextSeo} from "next-seo";
import React, {Component} from "react";
class About extends React.Component {
    constructor(props) {

        //console.log(props)

        super(props);
        this.state = {
            modalIsOpen: false
        };
    }

    getContent() {

        let content = "Getting the job you want keeps getting harder. It seems that there are many jobs on the market - but tough competition makes it impossible to cut through the noise, apply and get the jobs you really want. <br/> <br/> Our mission in <strong>JobsBear</strong> is simple - helping you find the job you want with ease.";


        try {
            if (this.props.app.props.hostname.search("discovermynextjob.com") > -1) {
                content = "Getting the job you want keeps getting harder. It seems that there are many jobs on the market - but tough competition makes it impossible to cut through the noise, apply and get the jobs you really want. <br/> <br/> This joint venture partnership was created between Discover My Next Job and Job Bear - so you can find the job you want with ease.";
            }
        } catch (e) {

        }


        return content

    }


    render() {
        const {app, keyword} = this.props;
        return (
            <React.Fragment>
                <NextSeo
                    title="About | Jobs Bear | Your Job is Our Job"
                    description="Over 167,457 jobs are available in our site, go ahead and find yours."
                />
                <AboutHeader
                    keyword={keyword}
                    buttonTitle="Search Jobs"
                    title="890,112"
                    text="job seekers found a new job with our help!"
                    buttonTitle="Search Jobs"
                    content={this.getContent()}
                    onSubmit={data => {
                        console.log(data);
                    }}
                    openModalSearch={() => {
                        this.setState({modalIsOpen: true});
                    }}
                    setKeyword={this.props.setKeyword}
                    app={app}
                />
                <EmailBigCard
                    title="Never Miss an Opportunity!"
                    text={`Get ${this.props.getKeyword() ||
                    ""} job alerts directly to your inbox.`}
                    placeholder="Enter Your Email"
                    CTA="Get Job Alerts"
                    disclaimerText={app.i18n.emailOptinText}
                    successText={
                        this.props.getKeyword()
                            ? `We’ll send you ${this.props.getKeyword()} job offers soon!`
                            : `We’ll send you job offers soon!`
                    }
                    imageLeft="/static/images/left-img-email-baner.svg"
                    imageRight="/static/images/ringht-img-email-baner.svg"
                    image="/static/images/bear-with-money.svg"
                    validate={validateEmailForm}
                    onSubmit={(data, onSuccess, onError) => {
                        this.props.setProvidedEmail(data.email);
                        onSuccess();
                    }}
                />
                <SearchModal
                    isOpen={this.state.modalIsOpen}
                    onSubmit={data => {
                        console.log(`x`);
                    }}
                    onRequestClose={() => {
                        this.setState({modalIsOpen: false});
                    }}
                    setKeyword={this.props.setKeyword}
                    buttonTitle="Find Jobs"
                    getKeyword={this.props.getKeyword}
                    keyword={keyword}
                    getLocation={this.props.getLocation}
                    app={app}
                />
            </React.Fragment>
        );
    }
}

export default About;

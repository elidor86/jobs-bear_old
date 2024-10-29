import validateEmailForm from "../lib/validateEmailForm";
import EmailBigCard from "../components/EmailBigCard/EmailBigCard";
import HomeHeader from "../components/HomeHeader/HomeHeader";
import SearchModal from "../components/JobSearch/SearchModal";
import logEvent from "../lib/logEvent";
import {NextSeo} from "next-seo";
import React, {Component} from "react";

class Index_oldjobsbear extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false
        };
    }

    render() {
        const {app, keyword} = this.props;
        return (
            <div>
                <NextSeo
                    title="Local Job Search Engine | Jobs Bear"
                    description="Search 500000+ job openings from the top employers. Find and apply to job openings found directly on company websites."
                />

                <HomeHeader
                    title="Your Job is Our Job"
                    text="Over 167,457 jobs are available in our site, go ahead and find yours."
                    buttonTitle="Search Jobs"
                    onSubmit={data => {
                        console.log(data);
                    }}
                    openModalSearch={() => {
                        logEvent("click-open_search", {origin: "home"});
                        this.setState({modalIsOpen: true});
                    }}
                    setKeyword={this.props.setKeyword}
                    keyword={keyword}
                    app={app}
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
                    getLocation={this.props.getLocation}
                    keyword={keyword}
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
                    getProvidedEmail={this.props.getProvidedEmail}
                    validate={validateEmailForm}
                    onSubmit={(data, onSuccess, onError) => {
                        this.props.setProvidedEmail(data.email);
                        onSuccess();
                    }}
                />

            </div>
        );
    }
}

export default Index_oldjobsbear;

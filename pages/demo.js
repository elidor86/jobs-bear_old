import EmailSignUpPopup from "../components/EmailSignUpPopup/EmailSignUpPopup";
import validateEmailForm from "../lib/validateEmailForm";
import MissingKeywordsOrLocationTooltip
    from "../components/MissingKeywordsOrLocationTooltip/MissingKeywordsOrLocationTooltip";
import EmailSmallCard from "../components/EmailSmallCard/EmailSmallCard";
import ExitIntent from "../components/ExitIntent/ExitIntent";
import Router from "next/router";
import React, {Component} from "react";
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModalSignUp: false,
            exitIntent: false,
            showTooltip: true
        };
    }


    render() {
        const {showModalSignUp, showTooltip, exitIntent} = this.state;
        const {isExitIntent, app, keyword} = this.props;
        return (
            <div>
                <EmailSmallCard
                    placeholder="Enter Your Email"
                    title="Get The Latest [keyword] Job Offers!"
                    disclaimerText="By enterting your email you agree to our privacy policy and terms of use and aware that your email would be shared with [PARTNER NAME], [PARTNER NAME], [PARTNER NAME]."
                    successText="We’ll send you job offers soon!"
                    validate={validateEmailForm}
                    buttonTitle="Get Offers"
                    onSubmit={(data, onSuccess, onError) => {
                        console.log("data", data);
                        setTimeout(() => {
                            onSuccess();
                        }, 2000);
                    }}
                />
                <ExitIntent
                    url="https://google.com"
                    coverImage="/static/images/content-dogs.svg"
                    contentTitle="Can You Believe These 11 Amazing Jobs Require No Experience?"
                    authorImage="/static/images/girl-avatar.svg"
                    authorName="by Emily Southorn"
                    contentText="Not every job requires a long list of previous experience. In fact, some of the most exciting, flexible and rewarding positions... "
                    show={isExitIntent}
                    topText="Tired of job searching? read this now to nail your next job."
                    buttonTitle="Read Article"
                    bottomButtonTitle="No thanks, continue to jobs"
                    onClose={() => {
                        Router.push(window.location.pathname);
                    }}
                    skipOfferAction={() => {
                        Router.push(window.location.pathname);
                    }}
                    buttonClick={() => {
                        Router.push(window.location.pathname);
                    }}
                />
                <button
                    onClick={() => {
                        this.setState({exitIntent: true});
                    }}
                >
                    Show Exit Intent
                </button>
                <button
                    onClick={() => {
                        this.setState({showModalSignUp: true});
                    }}
                >
                    Show Email SignUp Modal
                </button>
                Not every job requires a long list of previous experience. In fact, some
                of the most exciting, flexible and rewarding positions... Not every job
                requires a long list of previous experience. In fact, some of the most
                exciting, flexible and rewarding positions... Not every job requires a
                long list of previous experience. In fact, some of the most exciting,
                flexible and rewarding positions... Not every job requires a long list
                of previous experience. In fact, some of the most exciting, flexible and
                rewarding positions... Not every job requires a long list of previous
                experience. In fact, some of the most exciting, flexible and rewarding
                positions... Not every job requires a long list of previous experience.
                In fact, some of the most exciting, flexible and rewarding positions...
                Not every job requires a long list of previous experience. In fact, some
                of the most exciting, flexible and rewarding positions... Not every job
                requires a long list of previous experience. In fact, some of the most
                exciting, flexible and rewarding positions...
                <EmailSignUpPopup
                    show={showModalSignUp}
                    title="Quick and Easy Application"
                    text="We’ll send you similar [keyowrd] job offers with easy application process."
                    disclaimerText="By enterting your email you agree to our privacy policy and terms of use and aware that your email would be shared with [PARTNER NAME], [PARTNER NAME], [PARTNER NAME]."
                    CTA="Continue"
                    placeholder="Enter Your Email"
                    secondaryCTA="No thanks"
                    validate={validateEmailForm}
                    successText="We’ll send you job offers soon!"
                    onSubmit={(data, onSuccess, onError) => {
                        onSuccess();
                    }}
                    distinationRedirect={() => {
                        this.setState({showModalSignUp: false});
                    }}
                    closeModal={() => {
                        this.setState({showModalSignUp: false});
                    }}
                />
                <MissingKeywordsOrLocationTooltip
                    onClose={() => {
                        this.setState({showTooltip: false});
                    }}
                    show={showTooltip}
                    title="Hey 👋"
                    textMobile="We have 182,122 jobs available. Make your results more relevant by adding a keyword."
                    textDesktop1="We have 182,122 jobs available."
                    textDesktop2="Make your results more relevant by adding a keyword."
                    button={{
                        title: "Add Job Keyword",
                        icon: (
                            <img
                                style={{marginRight: 10}}
                                src="/static/images/button-icon.svg"
                            />
                        )
                    }}
                    formInputs={[
                        {
                            name: "keywords",
                            placeholder: "Keywords",
                            icon: <img src="/static/images/input-keywords-icon.svg"/>
                        },
                        {
                            name: "location",
                            placeholder: "For example: Toronto",
                            icon: <img src="/static/images/input-location-icon.svg"/>
                        }
                    ]}
                    formButton={{
                        title: "Find Jobs",
                        icon: (
                            <img
                                style={{marginRight: 10}}
                                src="/static/images/search-icon.svg"
                            />
                        )
                    }}
                    validate={(values, onError) => {
                        console.log("TCL: values", values);
                        onError({});
                    }}
                    onSubmit={(data, onSuccess, onError) => {
                        onSuccess();
                        this.setState({showTooltip: false});
                    }}
                />
            </div>
        );
    }
}

export default Demo;

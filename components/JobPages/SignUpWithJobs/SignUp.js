import React, {Component} from "react";

import Emily from "../../OptinModals/Emily/Emily";

import logEvent from "../../../lib/logEvent";

import styles from "./SignUp.module.css";
import JobList from "../../Jobs/JobList";


const OptInModals = {
    emily: Emily
};

class SignUp extends React.Component {
    constructor(props) {


        super(props);


        this.state = {
            jobs: this.props.jobs,
            display: false,
            error: false,
            keyword: props.keyword,
            containerClickCount: 0
        };

        this.currentJob = {};

    }


    static getDerivedStateFromProps(props, state) {


        if (props && props.jobs && props.jobs.length > 0) {
            return {
                jobs: props.jobs.splice(0, 7)
            }
        }

        return null;
    }

    showEmailSignUpPopup(jobRedirectPath, src, title, jobSrc) {


        var app = this.props.app;


        this.currentJob.url = jobRedirectPath;
        this.currentJob.title = title;
        this.currentJob.jobSrc = jobSrc;


        if (app.getProvidedEmail() == true) {

            this.props.goToJob(jobRedirectPath, title, jobSrc);

        } else {

            this.setState({
                display: true
            });

        }


    }


    emailSubmit(email) {

        this.props.emailSubmit(email, "", true, "", true, this.currentJob.url, this.currentJob.title, this.currentJob.jobSrc, 0);

    }

    noThanks() {

        this.props.noThanks(true, this.currentJob.url, this.currentJob.title, this.currentJob.jobSrc, 0);

    }

    submitClick() {
        var self = this;
    }

    onClose() {
        var self = this;
    }

    onContinue() {

        var self = this;
        var didExit = false;
        var app = this.props.app;
        this.currentJob = {};

        try {
            window.currentJobClicked = this.props;
        } catch (e) {

        }


        logEvent("openSignUpModal");


        if (app.getProvidedEmail() == true) {

            this.props.goToJob();
            return;

        } else {

            this.setState({
                display: true
            });

        }


    }

    componentDidMount() {
        this.submitClick = this.submitClick.bind(this);
    }

    jobContainerCloseBtn() {
        logEvent("jobContainerCloseBtn");
        this.props.goToList({optinModal: false});
    }

    render() {

        let OptinModal = OptInModals[this.props.OptInModalVersion];


        let postedBy =
            <div className={styles.postedBy}>
                <img src="/static/images/signup-case-icon.svg"/> Posted
                by {this.props.company ? this.props.company : 'undisclosed'}
            </div>;

        if (this.props.OptInModalVersion == "emily") {
            postedBy =
                <div className={styles.postedByEmiltContainer}>
                    <img className={styles.postedByEmily}
                         src="/static/images/emily.png"/>
                    <span className={styles.postedByEmilyText}>
                         Posted by Emily Southorn
                    </span>

                </div>
        }


        return (

            <div className={styles["main-wrapper-container"]}>


                <div className={styles["main-wrapper"]}>

                    <div className={styles.hiringNowText}>
                        HIRING NOW
                    </div>

                    <div className={styles["main-job-container"]}>

                        <div className={styles["main-job-content-container"]}>

                            <span className={styles.jobContainerCloseBtn}
                                  onClick={this.jobContainerCloseBtn.bind(this)}>

                                <img src="/static/images/sign-up-job-container-close-btn.svg"/>
                            </span>


                            <div onClick={this.onContinue.bind(this)}>
                                <div className={styles["main-job-tile"]}>{this.props.title}</div>

                                {
                                    postedBy
                                }


                                <div className={styles.nearBy}>
                                    <img src="/static/images/sign-up-location-icon.svg"/>
                                    {this.props.city}
                                </div>


                                <div className={styles["main-job-desc-container"]}>
                                    <div
                                        className={styles["main-job-desc"]}
                                        dangerouslySetInnerHTML={{__html: this.props.body}}
                                    ></div>


                                </div>

                                <div className={styles["continue-container"]}>
                                    <div
                                        className={styles["continue-btn"]}>
                                        Apply
                                        <img src="/static/images/arrow-right.svg"/>
                                    </div>
                                </div>


                            </div>

                        </div>
                    </div>

                    <div className={styles.bottomJobContainer}>

                        <img src="/static/images/double-v-signup.svg"/>
                        Equal Opportunity Employer
                    </div>


                </div>


                <div className={styles.similiarJobcContainer}>

                    {this.state.jobs.length > 0 ? (
                        <>

                            <div className={styles.similarJobsText}>
                                SIMILAR JOBS
                            </div>

                            <JobList
                                getListUrl={this.props.getListUrl}
                                jobs={this.state.jobs}
                                keyword={this.props.app.getKeyword}
                                location="test in uk"
                                showEmailSignUpPopup={this.showEmailSignUpPopup.bind(this)}
                                getProvidedEmail={this.props.app.getProvidedEmail}
                                setProvidedEmail={this.props.app.setProvidedEmail}
                                getForcefullyHideEmailPrompts={
                                    this.props.app.getForcefullyHideEmailPrompts
                                }
                                getKeyword={this.props.app.getKeyword}
                                setKeyword={this.props.app.setKeyword}

                                app={this.props.app}
                                jobListPage={1}
                            />
                        </>
                    ) : (
                        <div></div>
                    )}

                </div>


                {
                    this.props.displayOurPartner==false ? null :  <div className={styles.outPartnerContainer}>

                        <div className={styles.outPartnerContainerText}>
                            OUR PARTNERS
                        </div>

                        <div className={styles.ourPartnerLogosContainer}>

                            <div className={styles.partnerLogos}>

                                <img src="/static/images/sign-up-zip-logo.svg"/>

                            </div>


                            <div className={styles.partnerLogos}>
                                <img src="/static/images/sign-up-neuvoo-logo.svg"/>
                            </div>


                            <div className={styles.partnerLogos}>
                                <img src="/static/images/sign-up-adzuna-logo.svg"/>
                            </div>


                        </div>


                    </div>

                }



                {
                    this.state.display &&
                    <OptinModal
                        keyword={this.props.keyword}
                        city={this.props.city}
                        display={this.props.display}
                        emailSubmit={this.emailSubmit.bind(this)}
                        noThanks={this.noThanks.bind(this)}
                        onClose={this.onClose.bind(this)}
                        app={this.props.app}>
                    </OptinModal>
                }


            </div>
        );
    }
}

export default SignUp;

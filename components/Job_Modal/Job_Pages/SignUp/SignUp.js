import React, {Component} from "react";

import SignUpModal from "../../OptinModals/SignUp/signUpModal";
import Emily from "../../OptinModals/Emily/Emily";
import Bonus from "../../OptinModals/Bonus/Bonus";


import logEvent from "../../../lib/logEvent";

import styles from "./SignUp.module.css";
import Basic from "../Basic/Basic";
import DisplayAd from "../../DisplayAd/DisplayAd";

const OptInModals = {
    bonus: Bonus,
    signup: SignUpModal,
    emily: Emily
};

class SignUp extends React.Component {
    constructor(props) {


        super(props);

        //console.log("OptInModalVersion ", props.OptInModalVersion)

        this.state = {
            display: false,
            error: false,
            keyword: props.keyword,
            containerClickCount: 0
        };
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


        logEvent("openSignUpModal");


        if (app.getProvidedEmail() == true) {

            this.props.goToJob()

        } else {
            this.setState({
                display: true
            });
        }

        /*
                try {

                    var addEvent = function (elm, evt, cb) {
                        if (elm.attachEvent) {
                            elm.attachEvent("on" + evt, cb);
                        } else {
                            elm.addEventListener(evt, cb, false);
                        }
                    };

                    if ("replaceState" in window.history) {

                        window.ExitIntent = true;

                        window.history.replaceState({
                            isBouncing: true
                        }, window.title);


                        window.history.pushState(null, window.title);

                        addEvent(window, "popstate", function (e) {

                            if (window.history.state && window.history.state.isBouncing) {

                                if (didExit === false) {

                                    if (window.haveJobClick != true) {
                                        // logEvent("exitIntentJobPage");
                                        // self.props.noThanks(false);
                                        didExit = true;
                                    }

                                }

                            }
                        });

                    }

                } catch (e) {

                }*/

    }

    componentDidMount() {
        this.submitClick = this.submitClick.bind(this);
    }

    jobContainerCloseBtn() {
        logEvent("jobContainerCloseBtn");
        this.props.goToList({optinModal: false});
    }

    render() {

        var OptinModal = OptInModals[this.props.OptInModalVersion];


        var postedBy =
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


        var bonus = "";

        if (this.props.OptInModalVersion == "bonus") {
            bonus =
                <div className={styles.bonusContainer}>
                    <img src="/static/images/bonus-small-icon.svg"/>
                    This job participates in the signing bonus raffle
                </div>;
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


                                {
                                    bonus
                                }

                            </div>

                        </div>
                    </div>

                    <div className={styles.bottomJobContainer}>

                        <img src="/static/images/double-v-signup.svg"/>
                        Equal Opportunity Employer
                    </div>


                </div>

                <div className={styles.outPartnerContainer}>

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

                {
                    this.state.display &&
                    <OptinModal
                        keyword={this.props.keyword}
                        city={this.props.city}
                        display={this.props.display}
                        emailSubmit={this.props.emailSubmit}
                        noThanks={this.props.noThanks}
                        onClose={this.onClose.bind(this)}
                        app={this.props.app}>
                    </OptinModal>
                }


            </div>
        );
    }
}

export default SignUp;

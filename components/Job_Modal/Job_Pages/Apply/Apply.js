import React, {Component, useEffect} from "react";

import DropDown from "../../../DropDown/DropDown";
import ErrorMessage from "../../../ErrorMessage/ErrorMessage";
import handleJobClick from "../../../../lib/handleJobClick";
import isValidEmail from "../../../../lib/validate_email";
import styles from "./Apply.module.css";
import logEvent from "../../../../lib/logEvent";
import Event_Bus from "../../../../lib/Event_Bus";

class EmailModalV3 extends React.Component {
    constructor(props) {
        //console.log("props", props);

        super(props);
        const self = this;
        this.Drop_Down = React.createRef();

        this.state = {
            description_max_height: "auto",
            first_email_optin: true,
            email: null,
            options: ["Tap to pick", "Yes", "No", "Yes, but I do not have a resume/cv"],
            display_email_optin: false,
            error: false,
            keyword: props.keyword,
            containerClickCount: 0
        };


    }

    submitClick() {

        const self = this;
        const props = self.props || {}

        const is_email_valid = isValidEmail(this.state.email);

        if (is_email_valid == true) {

            handleJobClick(
                props.url,
                props.title,
                props.src,
                props.cpc,
                true,
                props.body,
                "job_modal",
                props.job
            );

            if (self.state.first_email_optin == true) {

                logEvent("job_modal-email_optin", {email: self.state.email});
                self.setState({first_email_optin: false});

                try {
                    props.app.setProvidedEmail(self.state.email, "job_modal");
                } catch (e) {

                }

            }

            self.hide_modal();

        } else {
            this.setState({error: true});
        }

    }

    continue_to_job() {

        const self = this;
        const props = self.props || {}

        handleJobClick(
            props.url,
            props.title,
            props.src,
            props.cpc,
            true,
            props.body,
            "job_modal",
            props.job
        );

        self.hide_modal();

    }

    componentDidMount() {
        const self = this;
        this.submitClick = this.submitClick.bind(this);

        Event_Bus.subscribe('Close_Modal', function () {
            //console.log('Close_Modal');
            self.hide_modal();
        });

    }

    componentWillUnmount() {
        // console.log("componentWillUnmount")

    }

    on_option_choose(option_index) {

        const self = this;
        const {props} = self;

        try {

            const options = this.state.options;
            const option_text = options[option_index];

            if (option_index == 1) {

                let ProvidedEmail = self.props.app.getProvidedEmail();

                if (ProvidedEmail == true) {
                    self.continue_to_job()
                } else {
                    this.setState({display_email_optin: true, description_max_height: "0px"});
                }

            } else if (option_index == 2) {
                this.setState({display_email_optin: false, description_max_height: "300px"});
            }

            if (typeof option_text == "string") {
                logEvent("job_modal-option_choose", {option_text});
            }

        } catch (e) {

        }


    }

    hide_modal() {
        const self = this;
        self.props.close_btn();

        //self.on_option_choose(2);

        try {

            this.setState({display_email_optin: false, description_max_height: "300px"});

            this.Drop_Down.current.setState({
                currentOption: self.state.options[0]
            })

        } catch (e) {

        }

    }

    render() {

        return (
            <div className={styles["main-wrapper-container"]}>
                <div className={styles["main-wrapper"]}>

                    <span className={styles["close-btn"]} onClick={this.hide_modal.bind(this)}>
                       <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path
                               d="M11.5609 1.175L10.3966 0L5.78046 4.65833L1.16435 0L0 1.175L4.61611 5.83333L0 10.4917L1.16435 11.6667L5.78046 7.00833L10.3966 11.6667L11.5609 10.4917L6.94481 5.83333L11.5609 1.175Z"
                               fill="#606FC7">

                           </path>
                       </svg>
                    </span>

                    <div className={styles["main-job-container"]}

                    >
                        <div className={styles["main-job-content-container"]}>

                            <div className={styles["main-job-tile"]}>{this.props.title}</div>

                            <div className={styles["main-job-company"]}>
                                {`Posted by: ${this.props.company ? this.props.company : 'undisclosed'}`}
                            </div>

                            <div className={styles["main-job-location"]}>
                                {`Location: ${this.props.location ? this.props.location : 'Near you'}`}
                            </div>

                            <div className={styles["main-job-desc-container"]}>

                                <div
                                    className={styles["main-job-desc"]}
                                    style={{maxHeight: (this.state.description_max_height)}}
                                    dangerouslySetInnerHTML={{__html: this.props.promoted_body || this.props.original_body || this.props.body}}
                                >

                                </div>

                            </div>
                        </div>
                    </div>

                    <div className={styles["q-container"]}>
                        <div className={styles["q-text1"]}>Would you like to apply for this job?</div>

                        <div className={styles["q-drop-down-container"]}>
                            <DropDown
                                ref={this.Drop_Down}
                                on_option_choose={this.on_option_choose.bind(this)}
                                options={this.state.options}
                            >
                            </DropDown>
                        </div>
                    </div>


                    <div
                        className={`${styles.questionContainer} ${this.state.display_email_optin ? '' : styles.hidden}`}
                    >

                        <div className={styles["email-optin-container"]}>
                            <div className={styles["email-optin-text1"]}></div>

                            <div className={styles["email-optin-text2"]}>
                                Enter your email. See more jobs like this, right nearby.
                            </div>

                            <div className={styles["email-input-container"]}>
                                {this.state.error && (
                                    <ErrorMessage
                                        position="top"
                                        message="Please use a valid email like example@exmple.com"
                                    />
                                )}

                                <input
                                    type="email"
                                    autoComplete="email"
                                    placeholder="Your Email Address"
                                    onChange={e => {
                                        this.setState({email: e.target.value, error: false});
                                    }}
                                    onFocus={e => {
                                        this.setState({error: false});
                                    }}
                                />
                            </div>

                            <div className={styles["continue-container"]}>
                                <div
                                    className={styles["continue-btn"]}
                                    onClick={this.submitClick.bind(this)}
                                >
                                    Continue
                                    <img src="/static/images/arrow-right.svg"/>
                                </div>
                            </div>
                        </div>

                        <div
                            onClick={this.continue_to_job.bind(this)}
                            className={styles["continue-to-job-btn"]}
                        >
                            or continue to job
                        </div>

                        <div
                            className={styles.toc}

                            dangerouslySetInnerHTML={{
                                __html: this.props.app.i18n.emailOptinText
                            }}
                        >

                        </div>

                    </div>


                </div>
            </div>
        );
    }
}

export default EmailModalV3;

import React, {Component} from 'react';

import logEvent from "../../../lib/logEvent";
import ErrorMessage from '../../ErrorMessage/ErrorMessage';


import validateEmailForm from "../../../lib/validateEmailForm";
import styles from './Emily.module.css';


class Emily extends React.Component {
    constructor(props) {


        super(props);


        this.state = {
            error: false,
            location: props.location,
            keyword: props.keyword,
            modalIsOpen: true
        }
    }


    closeBtn() {

        this.setState({modalIsOpen: false});
        this.props.closeModal();


    }

    changeKeywordValue = (v) => {

        if (v) {
            this.setState({
                keyword: v
            })
        }

    };

    changeLocationValue = (v) => {


        if (v) {
            this.setState({
                location: v
            })
        }

    };

    onChange = (e) => {


    };


    submitClick() {


        var self = this;

        const {onSubmit, distinationRedirect} = this.props;
        const {email} = this.state;


        validateEmailForm({email: this.state.email}, function (error) {

            if (!error.email) {


                onSubmit(
                    {email},
                    () => {
                        logEvent("track-email_success", {
                            origin: "email_popup",
                            content: email
                        });

                        distinationRedirect();

                    },
                    message => {

                    }
                );

            } else {

                self.setState({
                    error: true
                })

            }


        });


    }

    componentDidMount() {
        this.closeBtn = this.closeBtn.bind(this);
        this.submitClick = this.submitClick.bind(this);
        this.responseFacebook = this.submitClick.bind(this);
        this.componentClicked = this.submitClick.bind(this);
        this.responseGoogle = this.responseGoogle.bind(this);

    }


    componentClicked() {

    }

    responseFacebook(response) {
        //console.log(response);


        //{name: "Ruth Nek", email: "ruthnek1234@gmail.com", id: "2535545556468771", accessToken: "EAAF1p0KL3dcBAIOazUO58yQEKQmCCGBgtKEmV8OivxSFKcO3G…lpodZAHTdYrJTiB5KZAw57yxfBnQubykJC4QH5sgjEvKAZDZD", userID: "2535545556468771", …}
        if (response && response.email) {

            logEvent("emailSubmitFacebook", {origin: "signup", email: response.email});
            this.props.emailSubmit(response.email, "signup", false, response.name);

        }

    }

    responseGoogle(response) {
        //console.log(response);

        if (response && response.profileObj && response.profileObj.email) {
            logEvent("emailSubmitGoogle", {origin: "signup", email: response.profileObj.email});
            this.props.emailSubmit(response.profileObj.email, "signup", false, response.profileObj.givenName);
        }

    }

    render() {


        const {error, email, showConfirm, errorMessage} = this.state;

        const {
            show,
            disclaimerText,
            successText,
            title,
            closeModal,
            text,
            placeholder,
            secondaryCTA,
            CTA,
            origin
        } = this.props;

        return (


            <div className={styles.modalContainer} style={{display: (show ? 'block' : 'none')}}>


                <div className={styles.modalWrapper}>

                    <span className={styles["close-btn"]} onClick={this.closeBtn.bind(this)}>
                        <img src="/static/images/EmailModalV3CloseBtn.svg"></img>
                    </span>

                    <div className={styles.modalTop}>

                        <div className={styles.emilyTopContainer}>

                            <img src="/static/images/emily.png"/>

                        </div>

                        <div className={styles.emilyName}>
                            Emily Southorn
                        </div>

                        <div className={styles.emilyTitle}>
                            Regional Hiring Manager
                        </div>

                        <div className={styles.emilyDesc}>

                            I help employers find candidates for {this.props.keyword} jobs. Enter your email to see your
                            matches.
                        </div>


                        <div className={styles["email-input-container"]}>


                            {this.state.error &&
                            <ErrorMessage position="top" message="Please use a valid email like example@exmple.com"/>}

                            <input
                                autoComplete="email"
                                type="email"
                                placeholder="Your Email Address"
                                onChange={(e) => {
                                    this.setState({email: e.target.value, error: false});
                                }}
                                onFocus={(e) => {
                                    this.setState({error: false});
                                }}
                            />
                        </div>


                        <div className={styles["continue-container"]}>


                            <div className={styles["continue-btn"]} onClick={this.submitClick.bind(this)}>
                                Continue
                                <img src="/static/images/arrow-right.svg"/>
                            </div>


                        </div>


                    </div>

                    <div className={styles.footer}>

                        <div className={styles.secure}>
                            <img src="/static/images/secure-icon.svg"/>
                            Your details are encrypted & secured
                        </div>

                        <div className={styles.freeService}>
                            <img src="/static/images/emily-optin-free-service.svg"/>
                            Free service - no hidden fees
                        </div>

                        <div className={styles.unsubscribe}>
                            <img src="/static/images/emily-optin-v.svg"/>
                            Unsubscribe any time
                        </div>

                        <div dangerouslySetInnerHTML={{
                            __html: this.props.app.i18n.emailOptinText
                        }}>

                        </div>

                    </div>
                </div>


            </div>

        )
    }
}

export default Emily;
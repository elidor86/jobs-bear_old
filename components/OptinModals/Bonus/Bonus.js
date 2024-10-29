import React, {Component} from 'react';

import logEvent from "../../../lib/logEvent";
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
//import {GoogleLogin} from 'react-google-login';

import validateEmailForm from "../../../lib/validateEmailForm";
import styles from './Bonus.module.css';


class Bonus extends React.Component {
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
        this.props.onClose();
        this.props.noThanks();

    }

    changeKeywordValue = (v) => {

        if (v) {
            this.setState({
                keyword: v
            })
        }

        //console.log("this.setState ", this.state)

    };

    changeLocationValue = (v) => {

        //console.table(v);

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

        validateEmailForm({email: this.state.email}, function (error) {

            if (!error.email) {

                self.setState({modalIsOpen: false});
                self.props.emailSubmit(self.state.email);

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

        return (


            <div className={styles.modalContainer} style={{display: (this.state.modalIsOpen ? 'block' : 'none')}}>


                <div className={styles.modalWrapper}>

                    <span className={styles["close-btn"]} onClick={this.closeBtn.bind(this)}>
                        <img src="/static/images/EmailModalV3CloseBtn.svg"></img>
                    </span>

                    <div className={styles.modalTop}>

                        <div className={styles.emilyTopContainer}>
                            <img src="/static/images/bonus-modal-main-icon.svg"/>
                        </div>

                        <div className={styles.bonusText1}>
                            Get a {this.props.app.i18n.currency}250 Signing Bonus
                        </div>

                        <div className={styles.bonusText2}>
                            Enter your email for a chance to win a bonus when you find a job through jobs-bear.com
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

                        <div className={styles.orText}>
                            or
                        </div>


                        <GoogleLogin
                            clientId="660250772854-hbtf88r9rf41kt2n9v07gjllqslg5cf2.apps.googleusercontent.com"
                            render={renderProps => (

                                <div className={styles.googlLoginContainer} onClick={renderProps.onClick}>

                                    <span className={styles.googleLoginIcon}><img
                                        src="/static/images/google-login-icon.svg"/></span>
                                    <span className={styles.googleLoginText}>Continue with Google</span>

                                </div>
                            )}
                            buttonText="Login"
                            onSuccess={this.responseGoogle.bind(this)}
                            onFailure={this.responseGoogle.bind(this)}
                            cookiePolicy={'single_host_origin'}
                        />

                    </div>

                    <div className={styles.footer}>

                        <div className={styles.secure}>
                            <img src="/static/images/secure-icon.svg"/>
                            Your information is encrypted & secured
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

export default Bonus;
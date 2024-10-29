import React, {Component} from 'react';

import logEvent from "../../../../lib/logEvent";
import styled from 'styled-components';
import ErrorMessage from '../../../ErrorMessage/ErrorMessage';

import validateEmailForm from "../../../../lib/validateEmailForm";
import styles from './signUpModal.module.css';


const InputIcon = styled.img`
    position: absolute;
    z-index: 2;
    margin-left: 11px;
`;

class SignUpModal extends React.Component {
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

                        <div className={styles.text1}>
                            Please sign up to view this job
                        </div>

                        <div className={styles.text2}>

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








                        <div className={styles.noThanks} onClick={this.props.noThanks}>
                            No thanks, continue to job
                        </div>

                    </div>

                    <div className={styles.footer} dangerouslySetInnerHTML={{
                        __html: this.props.app.i18n.emailOptinText
                    }}>

                    </div>
                </div>


            </div>

        )
    }
}

export default SignUpModal;
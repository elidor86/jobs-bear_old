import React, {Component} from 'react';
import styles from './SMSModalV1.module.css';
import logEvent from '../../lib/logEvent'
import SubmitPhone from '../../lib/submitPhone'
import submitEmail from '../../lib/submitEmail'
import styled from 'styled-components';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import InputMask from "react-input-mask";
import fetch from "isomorphic-fetch";
import handleJobClick from "../../lib/handleJobClick";

const InputIcon = styled.img`
    position: absolute;
    z-index: 2;
    margin-left: 11px;
`;

class SMSModalV1 extends React.Component {

    constructor(props) {


        super(props);

        this.continueClickCounter = 0;

        this.state = {
            src: "",
            title: "Make it easy for employers to contact you",
            subtitle: "Provide a few more details so that employers can reach you",
            requireSms: false,
            error: false,
            location: props.location,
            keyword: props.keyword,
            modalIsOpen: props.modalIsOpen
        }
    }

    hideModal() {
        this.setState({
            modalIsOpen: false
        })
    }

    showModal(src, title, subtitle, job) {


        this.setState({
            src: src,
            job: job,
            modalIsOpen: true
        });

        if (typeof title === "string" && title.length > 0 && typeof subtitle === "string" && subtitle.length > 0) {
            this.setState({
                title: title,
                subtitle: subtitle
            });
        }

        logEvent("SMSModalShow", {src: src});

    }

    initialModalState() {


        return true;
    }

    closeBtn() {

        var self = this;
        var app = this.props.app;

        let src = this.state.src;
        let job = this.state.job;

        try {
            if (src == "job_list" && job && job.url) {
                handleJobClick(job.url, job.title, job.src, job.cpc || job.ppc, null, job.body, "sms_modal", job);
            } else {
                try {
                    window.scrollTo(0, 0);
                } catch (e) {

                }
            }
        } catch (e) {

        }


        //this.setState({modalIsOpen: false});


        this.props.app.hideSmsModal();


        try {
            this.props.onClose();
        } catch (e) {

        }

        logEvent("SMSModalClose");

        try {
            //MainApp.ZipRecruiterEmailModalElement.current.showModal({source_event: "smsModalClose"});
        } catch (e) {

        }

    }

    changeKeywordValue = (v) => {

        if (v) {
            this.setState({
                keyword: v
            })
        }

        this.props.app.setKeyword(v);

        try {

            window.keywordFromEmailOptin = v;

        } catch (e) {

        }

        //console.log("this.setState ", this.state)

    };

    changeLocationValue = (v) => {

        //console.table(v);

        if (v) {
            this.setState({
                locationObj: v
            });

            this.props.app.setLocation(v);

        }
    };

    onChange = (e) => {


    };

    getDisplayState = (e) => {

        return this.state.modalIsOpen

    };

    submitClick() {


        let self = this;


        let firstName = this.state.firstName;
        let lastName = this.state.lastName;
        let phoneNumber = this.state.phoneNumber;
        let email = this.state.email || ClientVars.email;

        try {
            if (!email && ClientVars.email && ClientVars.email.length > 0) {
                email = ClientVars.email;
            }
        } catch (e) {

        }

        function ValidateEmail(mail) {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
                return (true)
            }
            return (false)
        }


        if (self.props.app.getProvidedEmail() == false) {
            if (!email || email.length == 0 || ValidateEmail(email) == false) {

                this.setState({
                    error: true
                })
                return;
            }
        }


        if (!firstName || firstName.length == 0) {

            this.setState({
                firstNameError: true
            })
            return;
        }

        if (!lastName || lastName.length == 0) {

            this.setState({
                lastNameError: true
            })
            return;
        }


        try {

            if (ClientVars.AB.RequireSms == "on") {

                if (!phoneNumber || phoneNumber.search("_") > -1) {

                    this.setState({
                        phoneError: true
                    })
                    return;

                }

            }

        } catch (e) {

        }


        this.setState({
            modalIsOpen: false
        });


        logEvent("SMSoptIn", {
            src: this.state.src,
            firstName: firstName,
            email: email,
            lastName: lastName,
            phoneNumber: phoneNumber
        });

        SubmitPhone({
            firstName: firstName,
            email: email,
            lastName: lastName,
            phone: phoneNumber
        });

        fetch("/updateSession", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber
            })
        });

        try {
            window.ClientVars.phoneNumber = phoneNumber;
            window.ClientVars.lastName = lastName;
            window.ClientVars.firstName = firstName;
        } catch (e) {

        }

        try {

            function setCookie(name, value, days) {

                var expires = "";
                if (days) {
                    var date = new Date();
                    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                    expires = "; expires=" + date.toUTCString();
                }
                document.cookie = name + "=" + (value || "") + expires + "; path=/";

            }

            setCookie("phoneNumber", phoneNumber, 360 * 2);
            setCookie("lastName", lastName, 360 * 2);
            setCookie("firstName", firstName, 360 * 2);


        } catch (e) {

        }

        try {

            submitEmail(
                email,
                MainApp.getKeyword(),
                MainApp.getLocation(),
                ClientVars.lat,
                ClientVars.long,
                null,
                "sendToNexxt"
            );

        } catch (e) {

        }

        try {

            localStorage.setItem("sms_modal_info", JSON.stringify({
                phoneNumber: phoneNumber,
                firstName: firstName,
                lastName: lastName
            }));

        } catch (e) {

        }

        try {
            // MainApp.ZipRecruiterEmailModalElement.current.showModal({source_event: "smsModalSubmit"});
        } catch (e) {

        }

        let src = this.state.src;
        let job = this.state.job;

        try {
            if (src == "job_list" && job && job.url) {
                handleJobClick(job.url, job.title, job.src, job.cpc || job.ppc, null, job.body, "sms_modal", job);
            }
        } catch (e) {

        }

    }

    componentDidMount() {


        try {
            if (ClientVars.AB.RequireSms == "on" || ClientVars.geo == "us") {

                this.setState({
                    requireSms: true
                })

            }
        } catch (e) {

        }

    }

    onPhoneChange(phone) {


    }

    onKeyDownPhoneInput(e, d) {

    }

    onFocusPhoneInput(e) {

    }

    getMask() {

        let mask = "+1 (999) 999-9999";

        try {
            if (window.ClientVars.geo == "gb") {
                mask = "";
            }
        } catch (e) {

        }

        return mask

    }

    render() {


        let haveEmail = false;


        try {
            haveEmail = this.props.app.getProvidedEmail();
        } catch (e) {

        }


        return (

            <div className={styles.modalContainer} style={{display: (this.state.modalIsOpen ? 'block' : 'none')}}>


                <div className={styles.modalWrapper}>

                    <span className={styles["close-btn"]} onClick={this.closeBtn.bind(this)}>
                        <img src="/static/images/EmailModalV3CloseBtn.svg"></img>
                    </span>

                    <div className={styles.modalTop}>

                        <div className={styles.text1}>
                            {this.state.title}
                        </div>

                        <div className={styles.text2}>
                            {this.state.subtitle}
                        </div>

                        <div className={styles["first-name-input-container"]}>

                            <InputIcon src="/static/icons/first_name.svg"/>

                            {this.state.firstNameError &&
                                <ErrorMessage position="top" message="Please use a valid first name"/>}

                            <input

                                onFocus={(e) => {
                                    this.setState({firstNameError: false});
                                }}
                                type="text"
                                placeholder="Your First Name"
                                onChange={(e) => {
                                    this.setState({firstName: e.target.value, firstNameError: false});
                                }}

                            />
                        </div>

                        <div className={styles["first-name-input-container"]}>

                            <InputIcon src="/static/icons/first_name.svg"/>

                            {this.state.lastNameError &&
                                <ErrorMessage position="top" message="Please use a valid last name"/>}


                            <input
                                onFocus={(e) => {
                                    this.setState({lastNameError: false});
                                }}
                                type="text"
                                placeholder="Your Last Name"
                                onChange={(e) => {
                                    this.setState({lastName: e.target.value, lastNameError: false});
                                }}

                            />
                        </div>

                        {
                            this.state.requireSms == true ?
                                <div className={styles["phone-input-container"]} key="phone-input-container">


                                    <InputIcon src="/static/images/phone-icon.svg"/>

                                    {this.state.phoneError &&
                                        <ErrorMessage position="top" message="Please use a valid phone number"/>}

                                    <InputMask
                                        onChange={(e) => {
                                            this.setState({phoneNumber: e.target.value});
                                        }}
                                        placeholder="Your Phone Number"
                                        type="tel"
                                        mask={this.getMask()}
                                    />


                                </div>
                                :
                                null

                        }


                        {

                            haveEmail != true ?
                                <div className={styles["email-input-container"]}>

                                    <InputIcon src="/static/images/EmailModalV3EmailIcon.svg"/>

                                    {this.state.error &&
                                        <ErrorMessage position="top"
                                                      message="Please use a valid email like example@exmple.com"/>}

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
                                :
                                null
                        }


                        <div className={styles["continue-container"]}>


                            <div className={styles["continue-btn"]} onClick={this.submitClick.bind(this)}>
                                Sign Up
                                <img src="/static/images/arrow-right.svg"/>
                            </div>


                        </div>


                    </div>

                    <div className={styles.footer}>

                        <div className={styles.secure}>
                            <img src="/static/images/secure-icon.svg"/>
                            Your information is encrypted & secured
                        </div>

                        <div style={{fontSize: "13px"}} dangerouslySetInnerHTML={{
                            __html: this.props.app.i18n.SmSOptinText
                        }}>

                        </div>

                    </div>
                </div>


            </div>

        )
    }
}

export default SMSModalV1;
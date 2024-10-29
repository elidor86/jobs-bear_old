import React, {Component} from 'react';

import styled from 'styled-components';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import validateEmailForm from "../../../lib/validateEmailForm";
import styles from './Free.module.css';


const InputIcon = styled.img`
    position: absolute;
    z-index: 2;
    margin-left: 11px;
`;

class Free extends React.Component {
    constructor(props) {

        //console.log("props", props);
        super(props);

        this.state = {
            error: false,
            formattedAddress: "",
            keyword: props.keyword,
            modalIsOpen: true
        }
    }


    closeBtn() {
        this.setState({modalIsOpen: false});
    }

    changeKeywordValue = (v) => {

        if (v) {
            this.setState({
                keyword: v
            })
        }


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

    noThanks() {


        var self = this;

        this.setState({modalIsOpen: false});

        try {
            this.props.noThanks();
        } catch (e) {

        }


    }


    componentDidMount() {
        this.closeBtn = this.closeBtn.bind(this);
        this.submitClick = this.submitClick.bind(this);

    }

    render() {

        // console.log("this.props", this.props);

        var moneyImgPath = "/static/images/optin-modal-free-discount.svg";

        if (this.props.geo == "gb") {
            moneyImgPath = "/static/images/optin-modal-free-discount-gb.svg";
        }


        return (


            <div className={styles.modalContainer} style={{display: (this.state.modalIsOpen ? 'block' : 'none')}}>


                <div className={styles.modalWrapper}>

                    <div className={styles["main-wrapper"]}>
                    <span className={styles["close-btn"]} onClick={this.closeBtn}>
                        <img src="/static/images/optin-modal-free-close-icon.svg"></img>
                    </span>
                        <div className={styles["main-job-container"]}>

                            <div className={styles["main-job-header"]}>

                                <div className={styles["main-job-header-starts-container"]}>
                                    <img src="/static/images/optin-modal-free-starts-icon.svg"/>
                                </div>


                                GET DAILY PREMIUM {this.props.keyword} OFFERS IN {this.props.location}
                            </div>

                            <div className={styles["main-job-content-container"]}>


                                <div className={styles["main-job-stars"]}>
                                    <img src="/static/images/premium-job-star-icon.svg"/>
                                    Easy Application
                                    <img src="/static/images/premium-job-star-icon.svg"/>
                                </div>

                                <div className={styles["main-job-stars"]}>
                                    <img src="/static/images/premium-job-star-icon.svg"/>
                                    Above Average Salary
                                    <img src="/static/images/premium-job-star-icon.svg"/>
                                </div>

                                <div className={styles["main-job-stars"]}>
                                    <img src="/static/images/premium-job-star-icon.svg"/>
                                    All Experience Levels
                                    <img src="/static/images/premium-job-star-icon.svg"/>
                                </div>

                                <div className={styles["main-job-stars"]}>
                                    <img src="/static/images/premium-job-star-icon.svg"/>
                                    Immediate Start
                                    <img src="/static/images/premium-job-star-icon.svg"/>
                                </div>


                                <div className={styles["discount-container"]}>
                                    <img src={moneyImgPath}/>
                                </div>

                                <div className={styles["text-free"]}>
                                    FREE
                                </div>
                            </div>


                        </div>

                        <div className={styles["email-optin-container"]}>

                            <div className={styles["email-optin-text1"]}>
                                Enter your email to get FREE premium {this.props.keyword} offers
                                in {this.props.location}.
                            </div>

                            <div className={styles["email-input-container"]}>

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

                            <div className={styles["continue-container"]}>


                                <div className={styles["continue-btn"]} onClick={this.submitClick.bind(this)}>
                                    Continue
                                    <img src="/static/images/arrow-right.svg"/>
                                </div>


                            </div>


                        </div>

                        <div onClick={this.noThanks.bind(this)}
                             className={styles["continue-to-job-btn"]}>
                            or continue to jobs
                        </div>

                        <div className={styles.toc} dangerouslySetInnerHTML={{
                            __html: this.props.app.i18n.emailOptinText
                        }}>

                        </div>

                    </div>
                </div>


            </div>

        )
    }
}

export default Free;
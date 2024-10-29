import React, {Component} from 'react';


import styled from 'styled-components';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import validateEmailForm from "../../../lib/validateEmailForm";
import styles from './PremiumJob.module.css';
import logEvent from "../../../lib/logEvent";


const InputIcon = styled.img`
    position: absolute;
    z-index: 2;
    margin-left: 11px;
`;

class EmailModalV3 extends React.Component {
    constructor(props) {

        //console.log("props", props);

        super(props);


        this.state = {
            error: false,
            keyword: props.keyword,
            containerClickCount: 0,
        }
    }


    submitClick() {


        var self = this;

        validateEmailForm({email: this.state.email}, function (error) {

            if (!error.email) {


                self.props.emailSubmit(self.state.email);

            } else {

                self.setState({
                    error: true
                })

            }


        });


    }


    componentDidMount() {

        this.submitClick = this.submitClick.bind(this);

    }

    render() {



        return (


            <div className={styles["main-wrapper"]}>

                <div onClick={() => {
                    if((this.state.containerClickCount > 0)){
                        this.props.noThanks()
                    } else {
                        this.setState({containerClickCount: ++this.state.containerClickCount})
                        this.setState({error: true})
                    }
                }} className={styles["main-job-container"]}>

                    <div className={styles["main-job-header"]}>

                        <img src="/static/images/premium-job-header-icon.svg"/>

                        PREMIUM OFFER
                    </div>

                    <div className={styles["main-job-content-container"]}>

                        <div className={styles["main-job-tile"]}>
                            {this.props.title}
                        </div>

                        <div className={styles["main-job-company"]}>
                            {`Posted by ${this.props.company ? this.props.company : 'undisclosed'}`}
                        </div>

                        <div className={styles["main-job-desc-container"]}>

                            <div className={styles["main-job-desc"]}
                                 dangerouslySetInnerHTML={{__html: this.props.body}}>


                            </div>


                            <div className={styles["main-job-desc-hidder"]}></div>
                        </div>


                        <div className={styles["main-job-stars"]}>
                            <img src="/static/images/premium-job-star-icon.svg"/>
                            Easy Application
                        </div>

                        <div className={styles["main-job-stars"]}>
                            <img src="/static/images/premium-job-star-icon.svg"/>
                            Above Average Salary
                        </div>

                        <div className={styles["main-job-stars"]}>
                            <img src="/static/images/premium-job-star-icon.svg"/>
                            Full benefits
                        </div>


                    </div>


                </div>

                <div className={styles["email-optin-container"]}>

                    <div className={styles["email-optin-text1"]}>
                        Enter your email to get more similar premium jobs for FREE.
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

                <div onClick={this.props.noThanks.bind(this)} className={styles["continue-to-job-btn"]}>
                    or continue to job
                </div>

                <div className={styles.toc} dangerouslySetInnerHTML={{
                    __html: this.props.app.i18n.emailOptinText
                }}>

                </div>

            </div>

        )
    }
}

export default EmailModalV3;
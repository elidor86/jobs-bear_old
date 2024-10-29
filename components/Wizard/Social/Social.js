import React, {Component} from 'react';


import styled from 'styled-components';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import validateEmailForm from "../../../lib/validateEmailForm";
import styles from './Social.module.css';
import logEvent from "../../../lib/logEvent";
import LocationInput from "../../JobSearch/LocationInput";


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


        let self = this;

        self.props.continue();


    }


    componentDidMount() {

        this.submitClick = this.submitClick.bind(this);

    }


    render() {

        //console.log("this.props", this.props);

        let headline = "Your next great job is here.";
        let subline = "Your next great job is here.";

        let q = this.props.app.getKeyword();
        let l = this.props.app.getLocation();
        let utm_source = this.props.app.props.utm_source;

        try {

            if (this.props.app.props.utm_source == "google" && q && q.length > 0) {

                headline = "Find Your Next " + q + " job";
                subline = "Hundreds of " + q + " jobs for immediate start. Apply online now with 3 click."

            }

        } catch (e) {

        }

        return (


            <div className={styles["main-wrapper"]}>

                <div onClick={() => {


                }} className={styles["main-job-container"]}>


                    <div className={styles["main-job-content-container"]}>

                        <div className={styles["main-job-tile"]}>
                            {headline}
                        </div>


                        <div className={styles["main-job-desc-container"]}>


                        </div>


                        <div className={styles["main-job-social-container"]}>

                            <div className={styles["main-job-social-people"]}>
                                <img src="/static/images/social_group.png"/>
                            </div>

                            <div className={styles["mail-job-social-poeople-text1"]}>
                                already applied
                            </div>

                        </div>


                    </div>


                </div>

                <div className={styles["email-optin-container"]}>


                    <div className={styles["email-optin-text2"]}>
                        Enter your zip code OR city & state
                    </div>

                    <div className={styles["email-input-container"]}>

                        {this.state.error &&
                        <ErrorMessage position="top" message="Please use a valid email like example@exmple.com"/>}

                        <LocationInput
                            className="social-input-s"
                            hideIcon={true}
                            layout="bar"
                            style={{height: "100%"}}
                            id="autocomaple-location-social-wrapper"
                            value={this.props.city}
                            placeholder="Your Location"
                            changeLocationValue={this.props.changeLocationValue.bind(this)}
                            onChange={(e) => {
                                this.setState({email: e.target.value, error: false});
                            }}
                            onFocus={(e) => {
                                this.setState({error: false});
                            }}

                        >

                        </LocationInput>


                    </div>

                    <div className={styles["continue-container"]}>


                        <div className={styles["continue-btn"]} onClick={this.submitClick.bind(this)}>
                            Continue
                            <img src="/static/images/arrow-right.svg"/>
                        </div>


                    </div>


                </div>

                <div onClick={this.props.noThanks.bind(this)} className={styles["continue-to-job-btn"]}>
                    no thanks
                </div>

                {
                    utm_source == "google" ? <div className={styles.subline}>{subline}</div> : null
                }


            </div>

        )
    }
}

export default EmailModalV3;
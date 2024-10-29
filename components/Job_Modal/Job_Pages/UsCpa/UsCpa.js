import React, {Component} from "react";


import logEvent from "../../../lib/logEvent";

import styles from "./UsCpa.module.css";


class UsCpa extends React.Component {
    constructor(props) {


        super(props);

        this.state = {
            percent: 0,
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


        this.props.noThanks();

        /*var self = this;
        var didExit = false;

        logEvent("openSignUpModal");

        this.setState({
            display: true
        });

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
                }, window.title, "#view-job");


                window.history.pushState(null, window.title, "#view-job");

                addEvent(window, "popstate", function (e) {

                    if (window.history.state && window.history.state.isBouncing) {

                        if (didExit === false) {

                            if (window.haveJobClick != true) {
                                logEvent("exitIntentJobPage");
                                self.props.noThanks(false);
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
        this.updatePercent();
    }

    updatePercent() {

        var self = this;
        var miliSec = 5 * 1000;
        var interval = 20;
        var currentTime = 0;

        var intervalId = null;

        intervalId = setInterval(function () {

            currentTime = currentTime + interval;
            var percent = currentTime / miliSec * 100;

            if (percent <= 100) {

                self.setState({
                    percent: percent
                });

            } else {
                self.setState({
                    percent: 100
                });

                clearInterval(intervalId);
                self.props.noThanks(false);

            }

        }, interval);

    }

    render() {


        return (

            <div className={styles["main-wrapper-container"]}>

                <div className={styles["main-wrapper"]}>

                    <div className={styles.prograsBarContainer}>
                        <div style={{width: this.state.percent + '%'}} className={styles.prograsBarIndicator}></div>
                    </div>

                    <div
                        onClick={() => {
                            if (this.state.containerClickCount > 0) {
                                this.props.noThanks();
                            } else {
                                this.setState({
                                    containerClickCount: ++this.state.containerClickCount
                                });
                                this.setState({error: true});
                            }
                        }}
                        className={styles["main-job-container"]}>


                        <div className={styles["main-job-content-container"]}>
                            <div className={styles["main-job-tile"]}>{this.props.title}</div>

                            <div className={styles.postedBy}>
                                <img src="/static/images/signup-case-icon.svg"/>
                                {`Posted by ${this.props.company ? this.props.company : 'undisclosed'}`}
                            </div>

                            <div className={styles.nearBy}>
                                <img src="/static/images/sign-up-location-icon.svg"/>
                                Nearby
                            </div>

                            <div className={styles.salary}>
                                <img src={this.props.app.i18n.currencyImagePathProminent}/>
                                Higher than average
                            </div>

                            <div className={styles["main-job-desc-container"]}>
                                <div
                                    className={styles["main-job-desc"]}
                                    dangerouslySetInnerHTML={{__html: this.props.body}}
                                ></div>

                                <div className={styles["main-job-desc-hidder"]}></div>
                            </div>


                        </div>
                    </div>


                    <div className={styles.arrowsDownContainer}>

                        <img src="/static/images/3-arrow-down.svg"/>

                    </div>

                </div>


                <div className={styles["continue-container"]}>
                    <div
                        className={styles["continue-btn"]}
                        onClick={this.onContinue.bind(this)}>
                        View salary and full details
                        <img src="/static/images/arrow-right.svg"/>
                    </div>
                </div>

            </div>


        );
    }
}

export default UsCpa;

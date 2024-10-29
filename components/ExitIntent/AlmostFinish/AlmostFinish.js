import React, {Component} from "react";
import styles from './AlmostFinish.module.css';
import logEvent from "../../../lib/logEvent";


class AlmostFinish extends Component {
    componentDidUpdate() {
        if (this.props.show) {

        }
    }

    render() {
        const {show, onClose, serpClick, skipOfferAction, keyword, location} = this.props;

        let Display = false;

        try {
            if (window.location.href.search("/jobs") > -1 && show == true) {
                Display = true
            } else {
                Display = false
            }
        } catch (e) {

        }

        //Display = true


        return (

            <div className={styles.modalContainer} style={{display: (Display ? 'block' : 'none')}}>

                <div className={styles.modalWrapper}>

                    <span className={styles.closeBtn} onClick={() => {
                        onClose();
                    }}>
                        <img src="/static/images/ei/almost-finish-clost-icon.svg"></img>
                    </span>


                    <div className={styles.text1}>
                        you're almost finished
                    </div>

                    <div className={styles.progressBar}>
                        <img src="/static/images/ei/almost-finish-progress-circle-bar.svg"></img>
                        <span className={styles.progressBarNum}>3/4</span>
                    </div>

                    <div className={styles.mainCta} onClick={() => {
                        serpClick(true);
                    }}>
                        Click Here to Finish
                    </div>


                    <div className={styles.text2}>
                        Increase Your Chances of Getting a Job
                    </div>


                </div>

            </div>

        );
    }
}

export default AlmostFinish;

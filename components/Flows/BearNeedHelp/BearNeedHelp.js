import React, {Component} from "react";
import styles from './BearNeedHelp.module.css';
import logEvent from "../../../lib/logEvent";


class BearNeedHelp extends Component {

    constructor(props) {

        //console.log("EmailModalV3 props", props);

        super(props);


        this.state = {
            isPopUpActive: false,
            isMsgActive: true
        }
    }

    componentDidUpdate() {
        if (this.props.show) {

        }
    }

    msgBtnClick() {

        logEvent("FlowMsgBtnClick");

        this.setState({
            isMsgActive: false,
            isPopUpActive: true,
        })
    }

    msgCloseBtnClick() {
        logEvent("FlowCloseClick");

        this.setState({
            isMsgActive: false,
            isPopUpActive: true,
        })
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


                <div className={styles.bearContainer}>

                    <div className={styles.modalWrapper}>

                      <span className={styles.closeBtn} onClick={() => {
                        onClose();
                         }}>


                        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.05 12.05L6.95001 6.95M12.05 6.95L6.95001 12.05" stroke="#C9C9C9" stroke-width="1.5"
      stroke-linecap="round"/>
<path
    d="M9.5 18C14.1944 18 18 14.1944 18 9.5C18 4.80558 14.1944 1 9.5 1C4.80558 1 1 4.80558 1 9.5C1 14.1944 4.80558 18 9.5 18Z"
    stroke="#C9C9C9" stroke-width="1.5"/>
</svg>

                    </span>


                        <div className={styles.text1}>
                            Hey
                        </div>

                        <div className={styles.text2}>
                            Need some help?
                        </div>

                        <div className={styles.text3}>
                            Click here to see another job site
                        </div>


                        <div className={styles.mainCta} onClick={() => {
                            serpClick(true);

                        }}>
                            Ok
                        </div>


                    </div>


                    <span className={styles.bear}>


                        <svg width="189" height="141" viewBox="0 0 189 141" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
<path
    d="M52.9186 67.8081C14.6459 94.6842 1.87875 127.374 0.723175 140.359H188.121C189.161 139.525 190.132 133.64 185.695 116.771C181.257 99.9022 155.418 77.1003 143.054 67.8081C143.169 57.801 143.331 37.215 143.054 34.9277C142.776 32.6404 140.396 28.2563 139.24 26.3502C142.245 24.325 148.369 18.1301 142.36 8.83782C136.814 0.260333 125.027 6.69345 122.6 8.83782C102.632 -6.31574 81.6925 0.975124 73.3724 8.83782C70.7145 4.90647 59.8521 2.36773 55.3453 6.69345C47.3025 14.4132 51.9942 23.9676 55.3453 27.7798L52.9186 33.1407V67.8081Z"
    fill="url(#paint0_linear)"/>
<ellipse cx="98.6795" cy="59.685" rx="11.0936" ry="10.3645" fill="#212B36"/>
<ellipse cx="74.4124" cy="28.5917" rx="3.46673" ry="3.57395" fill="black"/>
<ellipse cx="122.253" cy="28.5917" rx="3.46673" ry="3.57395" fill="black"/>
<path
    d="M85.1593 115.081C73.5111 122.229 69.9057 134.738 69.559 140.099H102.146V103.645C97.6395 103.645 93.4795 105.074 85.1593 115.081Z"
    fill="#C4C4C4"/>
<path
    d="M119.148 115.081C131.044 122.229 134.726 134.738 135.08 140.099H101.8V103.645C106.402 103.645 110.651 105.074 119.148 115.081Z"
    fill="#C4C4C4"/>
<defs>
<linearGradient id="paint0_linear" x1="95.3055" y1="0" x2="95.3055" y2="140.359" gradientUnits="userSpaceOnUse">
<stop stop-color="#FEFEFE"/>
<stop offset="1" stop-color="#EAEEF0"/>
</linearGradient>
</defs>
</svg>



                    </span>

                </div>

            </div>

        );
    }
}

export default BearNeedHelp;

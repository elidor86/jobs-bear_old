import React, {Component} from "react";
import styles from './NewMsg.module.css';
import logEvent from "../../../lib/logEvent";


class NewMsg extends Component {

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

                <div className={styles.modalWrapper} style={{display: (this.state.isPopUpActive ? 'block' : 'none')}}>

                    <span className={styles.closeBtn} onClick={() => {
                        onClose();
                    }}>
                        <img src="/static/images/flows/msg-close-icon.svg"></img>
                    </span>


                    <div className={styles.text1}>
                        We found the perfect job for you
                    </div>


                    <div className={styles.mainCta} onClick={() => {
                        serpClick(true);
                    }}>
                        Click Here to view
                    </div>


                </div>

                <div className={styles.msgContainer} style={{display: (this.state.isMsgActive ? 'block' : 'none')}}>

                    <span onClick={this.msgBtnClick.bind(this)}>
                        You have a new message


                        <span className={styles.notif}>
                        1
                        </span>

                    </span>

                    <span className={styles.msgCloseBtn} onClick={this.msgCloseBtnClick.bind(this)}>
                        <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path
    d="M0.271639 0.307155C0.445622 0.118538 0.681561 0.0125781 0.927573 0.0125781C1.17358 0.0125781 1.40952 0.118538 1.58351 0.307155L6.4942 5.63253L11.4049 0.307155C11.4905 0.211061 11.5929 0.134413 11.706 0.0816833C11.8192 0.0289538 11.941 0.00119886 12.0642 3.79877e-05C12.1874 -0.00112289 12.3095 0.0243336 12.4235 0.074922C12.5376 0.12551 12.6412 0.200218 12.7283 0.294685C12.8154 0.389152 12.8843 0.501486 12.9309 0.625134C12.9776 0.748783 13.001 0.881268 13 1.01486C12.9989 1.14845 12.9733 1.28047 12.9247 1.40322C12.8761 1.52597 12.8054 1.63699 12.7168 1.7298L7.80607 7.05518L12.7168 12.3806C12.8858 12.5703 12.9793 12.8245 12.9772 13.0883C12.975 13.3521 12.8775 13.6044 12.7055 13.7909C12.5334 13.9775 12.3007 14.0833 12.0575 14.0856C11.8142 14.0879 11.5799 13.9865 11.4049 13.8032L6.4942 8.47783L1.58351 13.8032C1.40853 13.9865 1.17417 14.0879 0.930912 14.0856C0.687653 14.0833 0.454957 13.9775 0.28294 13.7909C0.110924 13.6044 0.0133515 13.3521 0.0112376 13.0883C0.00912378 12.8245 0.102638 12.5703 0.271639 12.3806L5.18233 7.05518L0.271639 1.7298C0.0977086 1.54113 0 1.28527 0 1.01848C0 0.751694 0.0977086 0.49583 0.271639 0.307155Z"
    fill="white"/>
</svg>

                    </span>


                </div>

            </div>

        );
    }
}

export default NewMsg;

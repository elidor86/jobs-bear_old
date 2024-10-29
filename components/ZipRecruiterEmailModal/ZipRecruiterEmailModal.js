import React, {Component} from 'react';
import styles from './ZipRecruiterEmailModal.module.css';
import logEvent from '../../lib/logEvent'
import submitEmailZip from '../../lib/submitEmailZip'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

class ZipRecruiterEmailModal extends React.Component {
    constructor(props) {

        //console.log("EmailModalV3 props", props);


        super(props);

        this.continueClickCounter = 0;
        this.didCatchBack = false;
        this.AskFirstName = false;

        this.state = {
            AskFirstName: false,
            toggleYesNo: "yes",
            error: false,
            location: props.app.getLocation(),
            keyword: props.app.getKeyword(),
            email: props.app.getEmail(),
            modalIsOpen: false
        }

    }

    getDisplayState = (e) => {
        return this.state.modalIsOpen
    };

    hideModal() {
        this.setState({modalIsOpen: false});
    }


    forceShowModal() {
        this.setState({modalIsOpen: true});
    }

    showModal(params) {

        try {

            if (window.ClientVars.AB.Email_Zip == "on") {

            } else {
                return;
            }


            if (window.ClientVars.geo == "us") {

            } else {
                return;
            }

            if (!window.ZipPingResponse || window.ZipPingResponse.subscriber != true || !window.ZipPingResponse.co_reg_token) {
                logEvent("showZipRecruiterEmailModal", {
                    event_label: "Email_Zip",
                    event_value: "dont_show_no_subscriber",
                    zip_params: params
                });
                return;
            }

            this.setState({
                modalIsOpen: true
            });


            logEvent("showZipRecruiterEmailModal", {
                event_label: "Email_Zip",
                event_value: "ok",
                zip_params: params
            });

        } catch (e) {

        }


    }

    handleToggleChange = (event) => {
        this.setState({toggleYesNo: event.target.checked});
    };

    initialModalState() {
        let modalIsOpen = false;
        let app = this.props.app;
        return false;
    }

    closeBtn(params) {

        const self = this;
        const app = this.props.app;


        try {
            window.scrollTo(0, 0);
        } catch (e) {

        }

        this.setState({modalIsOpen: false});


        try {

            this.props.onClose();

        } catch (e) {

        }


        logEvent("closeZipRecruiterEmailModal", {
            event_label: "Email_Zip",
            event_value: "closeZipRecruiterEmailModal",
            zip_params: params
        });

    }


    onChange = (e) => {


    };


    catchFirstBack() {

        var self = this;


    }

    submitClick() {

        //sendLeadToZip_US
        const app = this.props.app;
        this.closeBtn({event_source: "submitClick"});
        submitEmailZip(app.getEmail(), app.getKeyword(), app.getLocation(), window.ClientVars.lat, window.ClientVars.long, null, "sendLeadToZip_US");
    }

    componentDidMount() {

        const self = this;

        this.closeBtn = this.closeBtn.bind(this);
        this.submitClick = this.submitClick.bind(this);

        let modalIsOpen = this.initialModalState();

        try {
            if (modalIsOpen == true) {
                localStorage.setItem("lastZipModalOpen", new Date());
            }
        } catch (e) {

        }

        this.setState({modalIsOpen: modalIsOpen});

    }

    onToggleChange = (e) => {

        if (e.target.value == "yes") {
            this.submitClick();
        } else if (e.target.value == "no") {
            this.closeBtn({event_source: "onToggleChange_no"})
        }

        this.setState({toggleYesNo: e.target.value});
    }

    render() {


        return (

            <div className={styles.modalContainer} style={{display: (this.state.modalIsOpen ? 'block' : 'none')}}>


                <div className={styles.modalWrapper}>

                    <span className={styles["close-btn"]} onClick={this.closeBtn}>

                        <span className={styles.closeBtnContainerMainModal}>
                          <svg width="25" height="25" viewBox="0 0 21 20" fill="none"
                               xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0)">
        <path
            d="M11.7694 1.175L10.605 0L5.98893 4.65833L1.37282 0L0.208466 1.175L4.82458 5.83333L0.208466 10.4917L1.37282 11.6667L5.98893 7.00833L10.605 11.6667L11.7694 10.4917L7.15328 5.83333L11.7694 1.175Z"
            fill="black" fillOpacity="0.7"/>
    </g>
    <defs>
        <clipPath id="clip0">
            <rect width="19.8187" height="20" fill="white" transform="translate(0.208466)"/>
        </clipPath>
    </defs>
</svg>

                        </span>


                    </span>

                    <div className={styles.modalTop}>
                        <div className={styles.text1}>
                            <img className={styles.zipLogo} src="/static/icons/ziprecruiter-logo-vector.svg"/>
                        </div>

                        <div className={styles.text2}>
                            Sign up to get daily job alerts directly to your inbox - we do the searching for you!
                        </div>

                        <div className={styles.toggleSwitchContainer}>

                            <ToggleButtonGroup
                                onChange={this.onToggleChange}
                                value={this.state.toggleYesNo}
                                exclusive
                                aria-label="text alignment">

                                <ToggleButton value="yes" aria-label="yes">
                                    Yes
                                </ToggleButton>

                                <ToggleButton value="no" aria-label="no">
                                    No
                                </ToggleButton>


                            </ToggleButtonGroup>

                        </div>

                        <div className={styles["continue-container"]}>


                            <div className={styles["continue-btn"]} onClick={this.submitClick.bind(this)}>
                                Sign Up
                            </div>


                        </div>

                        <div className={styles.footer}>

                            By choosing to join ZipRecruiter, I understand that Jobs-Bear will share my
                            name, email, and search details with ZipRecruiter, and ZipRecruiter will use this
                            information to send me job alert emails and create a job seeker account.
                            <br/>
                            <br/>
                            By clicking "Sign Up", I further agree to the ZipRecruiter <a
                            href="https://www.ziprecruiter.com/terms">Terms of Use</a> and
                            acknowledge I have read the <a href="https://www.ziprecruiter.com/privacy">Privacy
                            Policy</a>.
                            I understand that I may change my
                            privacy settings at any time by visiting my ZipRecruiter profile on
                            ZipRecruiter.com.


                        </div>


                    </div>


                </div>


            </div>

        )
    }
}

export default ZipRecruiterEmailModal;
import React, {Component} from 'react';
import styles from './EmailModalV3.module.css';
import logEvent from '../../lib/logEvent'
import KeywordInput from '../JobSearch/KeywordInput';
import Checkbox from '../Checkbox/Checkbox';
import LoactionInput from '../JobSearch/LocationInput';
import styled from 'styled-components';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import validateEmailForm from "../../lib/validateEmailForm";


const InputIcon = styled.img`
    position: absolute;
    z-index: 2;
    margin-left: 11px;
`;

class EmailModalV3 extends React.Component {
    constructor(props) {

        //console.log("EmailModalV3 props", props);

        super(props);

        this.continueClickCounter = 0;
        this.didCatchBack = false;
        this.AskFirstName = false;

        this.state = {
            AskFirstName: false,
            error: false,
            location: props.location,
            keyword: props.keyword,
            modalIsOpen: false
        }
    }


    initialModalState() {

        let modalIsOpen = true;
        let app = this.props.app;
        //return true;
        if (app && app.getProvidedEmail() == true) {
            return false;
        }

        return true;
        try {

            let lastFirstEmailOptinTS = localStorage.getItem("lastFirstEmailOptinTS");

            if (lastFirstEmailOptinTS) {

                let now = new Date().getTime();
                let lastFirstEmailOptinTSParsed = new Date(lastFirstEmailOptinTS).getTime();

                let diff = now - lastFirstEmailOptinTSParsed;

                if (diff >= 1000 * 60 * 60) {
                    return true;
                }

                return false;
            }

        } catch (e) {

        }

        try {
            if (location.href.search("optinModal=false") > -1) {
                modalIsOpen = false;
            }
        } catch (e) {

        }

        return modalIsOpen;


    }

    closeBtn() {

        const self = this;
        const app = this.props.app;


        try {
            window.scrollTo(0, 0);
        } catch (e) {

        }

        this.setState({modalIsOpen: false});


        window.firstEmailOptinOpen = false;

        try {

            this.props.onClose();

        } catch (e) {

        }

        logEvent("EmailModalClose");

        try {

            let didPu = localStorage.getItem("didPu") || null;

            if (window.ClientVars && window.ClientVars.AB && window.ClientVars.AB.popUnderOnEmailCloseVersion == "nextcareernow" && !didPu) {

                localStorage.setItem("didPu", true);

                let urlNewTab = window.location.href;

                window.open(urlNewTab);

                let lbUrl = "https://nextcareernow.com/?botName=" + ClientVars.botName + "&doWebPushOptIn=false&utm_source=pu&geo=" + ClientVars.geo + "&q=" + app.getKeyword() + "&l=" + app.getLocation() + "&doEmailOptin=false";

                console.log("lbUrl ", lbUrl);

                window.location.href = lbUrl;


            }


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

        return;
        // console.log(e.target.value);
        var value = e.target.value;

        if (value && value.length >= 3) {
            this.setState({
                keyword: value
            })
        }

    };


    catchBack() {

        var self = this;


    }

    catchFirstBack() {

        var self = this;


    }

    submitClick() {


        var self = this;

        //this.catchBack();

        try {
            window.firstName = self.state.firstName;
        } catch (e) {

        }

        this.continueClickCounter++;

        if (this.continueClickCounter >= 3) {

            try {
                window.scrollTo(0, 0);
            } catch (e) {

            }

            self.setState({modalIsOpen: false});
            window.firstEmailOptinOpen = false;
        }

        //console.log(this.state);

        validateEmailForm({email: this.state.email}, function (error) {

            if (!error.email) {

                try {
                    window.scrollTo(0, 0);
                } catch (e) {

                }
                self.setState({modalIsOpen: false});
                window.firstEmailOptinOpen = false;

                self.props.emailSubmit(self.state.email, "", false, "", false);

            } else {

                self.setState({
                    error: true
                })

            }


        });

    }

    componentDidMount() {

        const self = this;

        this.closeBtn = this.closeBtn.bind(this);
        this.submitClick = this.submitClick.bind(this);

        let modalIsOpen = this.initialModalState();

        try {
            if (modalIsOpen == true) {
                localStorage.setItem("lastFirstEmailOptinTS", new Date());
            }
        } catch (e) {

        }

        this.setState({modalIsOpen: modalIsOpen});
        window.firstEmailOptinOpen = modalIsOpen;

        this.props.app.closeFirstEmailOptin = function () {
            try {
                window.scrollTo(0, 0);
            } catch (e) {

            }
            self.setState({modalIsOpen: false});
        };


        try {
            if (this.props.location && this.props.location.length > 0) {
                this.props.app.setLocation(this.props.location);
            }
        } catch (e) {

        }


    }

    render() {

        let AskFirstName = false;
        let EmailCheckBox = false;
        let AB = null;

        try {

            AB = this.props.app.getAB();
            if (AB && AB.EmailCheckBox == "on") {
                EmailCheckBox = true;
            }

        } catch (e) {

        }


        let title = "job offers";
        let keyword = this.props.app.getKeyword();

        if (keyword && keyword.length > 0) {
            title = keyword + " job offers";
        }

        if (this.props.title && this.props.title.length > 0) {
            title = this.props.title;
        }


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
            fill="white" fillOpacity="0.7"/>
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
                            {title}
                        </div>

                        <div className={styles.text2}>
                            Leave us your email address and we’ll send you TOP {this.state.keyword} jobs near you.
                        </div>

                        <div className={styles["keyword-input-container"]}>

                            <KeywordInput

                                onChange={this.onChange.bind(this)}
                                changeKeywordValue={this.changeKeywordValue.bind(this)}
                                keyword={this.state.keyword}/>


                        </div>

                        <div className={styles["location-input-container"]}>

                            <LoactionInput
                                onChange={this.onChange.bind(this)}
                                changeLocationValue={this.changeLocationValue.bind(this)}
                                value={this.state.location}/>


                        </div>

                        {
                            AskFirstName == true ?
                                <div className={styles["first-name-input-container"]}>

                                    <InputIcon src="/static/icons/first_name.svg"/>


                                    <input

                                        type="text"
                                        placeholder="Your First Name"
                                        onChange={(e) => {
                                            this.setState({firstName: e.target.value});
                                        }}

                                    />
                                </div>
                                :
                                null
                        }


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


                        <div className={styles["continue-container"]}>


                            <div className={styles["continue-btn"]} onClick={this.submitClick.bind(this)}>
                                Continue
                                <img src="/static/images/arrow-right.svg"/>
                            </div>


                        </div>

                        {
                            EmailCheckBox == true ?
                                <div className={styles.zipContainer}>
                                    <Checkbox checked={true} app={this.props.app} label={this.props.app.i18n.zipStr}
                                              labelContainer={styles.zipLabelContainer}>
                                    </Checkbox>
                                </div>
                                :
                                null

                        }


                    </div>

                    <div className={styles.footer}>

                        <div className={styles.secure}>
                            <img src="/static/images/secure-icon.svg"/>
                            Your information is encrypted & secured
                        </div>

                        <div dangerouslySetInnerHTML={{
                            __html: this.props.app.i18n.emailOptinText
                        }}>

                        </div>

                    </div>
                </div>


            </div>

        )
    }
}

export default EmailModalV3;
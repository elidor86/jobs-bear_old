import React, {Component} from 'react';
import styles from './CvModalV1.module.css';
import logEvent from '../../lib/logEvent'
import SubmitPhone from '../../lib/submitPhone'
import styled from 'styled-components';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import InputMask from "react-input-mask";

const InputIcon = styled.img`
    position: absolute;
    z-index: 2;
    margin-left: 11px;
`;

class CvModalV1 extends React.Component {
    constructor(props) {


        super(props);

        this.continueClickCounter = 0;


        this.state = {

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

    showModal() {

        this.setState({
            modalIsOpen: true
        });

        logEvent("CvModalShow");

    }

    initialModalState() {


        return true;


    }

    closeBtn() {


        this.props.app.hideCvModal();

        logEvent("CvModalClose");


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


    applyBtn() {

        //emailError

        var self = this;
        var fileName = "";

        var files = document.querySelector('[type=file]').files;
        var formData = new FormData();

        if (files && files[0]) {
            fileName = files[0].name;
            formData.append('file', files[0]);
        } else {
            alert("Please upload a valid resume");
            return;
        }

        let params = {
            firstName: ClientVars.firstName,
            lastName: ClientVars.lastName,
            email: ClientVars.email,
            keyword: this.props.app.getKeyword(),
            location: this.props.app.getLocation()
        }

        for (let key in params) {
            formData.append(key, params[key]);
        }


        fetch("/job-apply", {
            method: 'POST',
            body: formData,
        }).then(response => {
            console.log(response)
        });


        var coverLetterEl = document.querySelector("." + styles.coverLetterContainerText + " textarea");
        var coverLetterVal = coverLetterEl.value;


        var payload = {
            fileName: fileName,
            coverLetter: coverLetterVal
        };

        logEvent("cvSubmit", payload);

        this.props.app.hideCvModal();


    }


    componentDidMount() {


    }


    onPhoneChange(phone) {


    }

    onKeyDownPhoneInput(e, d) {

    }

    onFocusPhoneInput(e) {

    }


    uploadFileBtn() {

        let uploadEl = document.querySelector("." + styles.fileUploadInput);

        if (uploadEl) {
            uploadEl.click();
        }

    }

    onFileChange() {

        let files = document.querySelector('[type=file]').files;

        if (files && files[0]) {
            this.setState({
                haveFile: true
            });
        }

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
                            Get Found!
                        </div>

                        <div className={styles.text2}>
                            Upload and send your resume to popular job boards for FREE with 1 click
                        </div>


                        <div className={styles.cvContainer}>

                            <div className={styles.cvContainerLabel}>
                                Your CV
                            </div>

                            <div className={styles.cvContainerInput} onClick={this.uploadFileBtn.bind(this)}>

                                <div className={styles.cvInnerContainer}>

                                    {
                                        this.state.haveFile ?
                                            <img className={styles.haveFile} src="/static/images/f-v.svg"/> :
                                            <img src="/static/images/upload-file-icon.svg"/>
                                    }

                                    {
                                        this.state.haveFile ? "Uploaded" : "Upload File"
                                    }


                                </div>
                            </div>

                            <input
                                onChange={this.onFileChange.bind(this)}
                                className={styles.fileUploadInput}
                                type="file" name="file"
                                accept="application/pdf,.txt,.doc,.docx,.rtf"
                            />
                        </div>


                        <div className={styles.coverLetterContainer}>

                            <div className={styles.coverLetterContainerLabel}>
                                Your Cover Letter <span>(Optional)</span>
                            </div>

                            <div className={styles.coverLetterContainerText}>
                                <textarea></textarea>
                            </div>


                        </div>

                        <div className={styles["continue-container"]}>


                            <div className={styles["continue-btn"]} onClick={this.applyBtn.bind(this)}>
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
                            __html: "" //this.props.app.i18n.SmSOptinText
                        }}>

                        </div>

                    </div>
                </div>


            </div>

        )
    }
}

export default CvModalV1;
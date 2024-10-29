import React, {Component} from "react";

import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import logEvent from "../../../lib/logEvent";

import styles from "./Fake.module.css";
import validateEmailForm from "../../../lib/validateEmailForm";


class Fake extends React.Component {
    constructor(props) {


        super(props);

        this.didScroll = false;

        this.state = {
            haveFile: false,
            emailError: false,
            nameError: false,
            fullName: null,
            email: null
        };
    }


    componentDidMount() {

    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    uploadFileBtn() {

        var uploadEl = document.querySelector("." + styles.fileUploadInput);

        if (uploadEl) {
            uploadEl.click();
        }

    }

    onFileChange() {

        var files = document.querySelector('[type=file]').files;

        if (files && files[0]) {
            this.setState({
                haveFile: true
            });
        }

    }

    applyBtn() {

        //emailError

        var self = this;
        var fileName = "";

        var files = document.querySelector('[type=file]').files;
        var formData = new FormData();

        if (files && files[0]) {
            fileName = files[0].name;
            formData.append('file', files[0]);
        }


        fetch("/job-apply", {
            method: 'POST',
            body: formData,
        }).then(response => {
            console.log(response)
        });

        if (this.didScroll != true) {
            try {
                document.querySelector("." + styles.applyContainer).scrollIntoView();
                this.didScroll = true;
            } catch (e) {

            }
        }


        if (!this.state.fullName || this.state.fullName.length <= 2) {

            self.setState({
                nameError: true
            });
            return
        }


        var coverLetterEl = document.querySelector("." + styles.coverLetterContainerText + " textarea");
        var coverLetterVal = coverLetterEl.value;


        var payload = {
            fileName: fileName,
            coverLetter: coverLetterVal,
            fullName: this.state.fullName
        };

        logEvent("apply", payload);

        setTimeout(function () {

            self.props.noThanks(false);

        }, 500);

    }

    render() {

        let title = this.props.JobTitle || "Apply Now";

        return (

            <div className={styles["main-wrapper-container"]}>

                <div className={styles["main-wrapper"]}>


                    <div className={styles.applyContainer}>

                        <div className={styles.applyContainerText1}>
                            {title}
                        </div>

                        <div className={styles.nameInputContainer}>

                            <div className={styles.nameInputContainerLabel}>
                                Your Full Name
                            </div>

                            <div className={styles.nameInputContainerInput}>
                                {this.state.nameError &&
                                <ErrorMessage position="top"
                                              message="Please enter your full name"/>}

                                <input type="text" placeholder="Enter your full name"
                                       onChange={(e) => {
                                           this.setState({fullName: e.target.value.trim(), nameError: false});
                                       }}
                                       onFocus={(e) => {
                                           this.setState({nameError: false});
                                       }}
                                />
                            </div>


                        </div>

                        <div className={styles.nameInputContainer}>

                            <div className={styles.nameInputContainerLabel}>
                                Your Email Address
                            </div>

                            <div className={styles.nameInputContainerInput}>
                                {this.state.emailError &&
                                <ErrorMessage position="top"
                                              message="Please use a valid email like example@exmple.com"/>}

                                <input
                                    autoComplete="email"
                                    type="email"
                                    placeholder="Enter Your Email Address"
                                    onChange={(e) => {
                                        this.setState({email: e.target.value.trim(), emailError: false});
                                    }}
                                    onFocus={(e) => {
                                        this.setState({emailError: false});
                                    }}
                                />
                            </div>


                        </div>


                        <div className={styles.cvContainer}>

                            <div className={styles.cvContainerLabel}>
                                Your CV <span>(Optional)</span>

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

                            <input onChange={this.onFileChange.bind(this)} className={styles.fileUploadInput}
                                   type="file" name="file"/>
                        </div>


                        <div className={styles.coverLetterContainer}>

                            <div className={styles.coverLetterContainerLabel}>
                                Your Cover Letter <span>(Optional)</span>
                            </div>

                            <div className={styles.coverLetterContainerText}>
                                <textarea></textarea>
                            </div>


                        </div>

                    </div>

                </div>


                <div className={styles["continue-container"]} onClick={this.applyBtn.bind(this)}>
                    <div className={styles["continue-btn"]}>
                        Apply Now
                    </div>
                </div>

            </div>
        );
    }
}

export default Fake;

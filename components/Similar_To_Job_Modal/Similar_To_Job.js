import React, {Component} from 'react';
import styles from './Similar_To_Job.module.css';
import logEvent from '../../lib/logEvent'


import Router from "next/router";
import Job from "../Jobs/Job";
import jobSearch from "../../lib/jobSearch";


class Similar_To_Job extends React.Component {
    constructor(props) {


        super(props);

        this.showModalLimit = 1;
        this.showModalCountKey = 'Show_Similar_To_Job_ModalCount';
        this.localShowModalCount = 0;


        this.state = {
            jobs: [],
            title: "",
            modalIsOpen: props.modalIsOpen
        }
    }

    getDisplayState() {
        return this.state.modalIsOpen;
    }

    showModal() {

        const self = this;

        logEvent("similar_job_modal_open", {});

        this.setState({modalIsOpen: true});
        Router.push(location.pathname + location.search + "#showSimilar");
    }

    initialModalState() {
        return false;
    }

    closeBtn() {

        this.setState({modalIsOpen: false, jobs: []});
        logEvent("similar_job_modal_close", {});

    }


    componentDidMount() {

        const self = this;
        this.closeBtn = this.closeBtn.bind(this);

    }


    get_similar_jobs({identifier, title, src}) {
        const self = this;
        const app = this.props.app;

        try {

            try {

                const exclude_src = ["zipApiGb", "apex_DTL_gb", "serp"];

                if (exclude_src.includes(src)) {
                    return;
                }

            } catch (e) {

            }

            const jobSearchParams = {
                identifier,
                search_type: "similar_to_job",
                botName: app.getBotName() || "jobs-bear",
                searchR: 25,
                gclid: ClientVars.gclid || "",
                utm_campaign: ClientVars.utm_campaign || "",
                keywords: app.getKeyword() || "",
                uid: ClientVars.uid || "",
                hostname: window.location.hostname,
                geo: ClientVars.geo,
                lat: ClientVars.lat || "",
                long: ClientVars.long || "",
                session_id: ClientVars.session_id || ""
            };

            jobSearch(jobSearchParams)
                .then(data => {
                    if (data && data.length > 0) {
                        self.setState({
                            jobs: data,
                            title
                        });


                        if (this.canShowModal()) {
                            this.incrementShowModalCount();
                            self.showModal();
                        }
                    }

                    this.logSearchResults(title, data, jobSearchParams);
                })
                .catch(error => {
                    console.error("Error in jobSearch:", error);
                });

        } catch (error) {
            console.error("Error in get_similar_jobs:", error);
        }
    }

    canShowModal() {
        return true

        try {
            if (typeof localStorage !== 'undefined') {
                const count = parseInt(localStorage.getItem(this.showModalCountKey) || '0', 10);
                return count < this.showModalLimit;
            } else {
                return this.localShowModalCount < this.showModalLimit;
            }
        } catch (error) {

            return this.localShowModalCount < this.showModalLimit;
        }
    }

    incrementShowModalCount() {
        try {
            if (typeof localStorage !== 'undefined') {
                const count = parseInt(localStorage.getItem(this.showModalCountKey) || '0', 10);
                localStorage.setItem(this.showModalCountKey, (count + 1).toString());
            } else {
                this.localShowModalCount++;
            }
        } catch (error) {

            this.localShowModalCount++;
        }
    }

    logSearchResults(title, data, searchParams) {
        try {
            const dataLength = data && Array.isArray(data) ? data.length : 0;
            logEvent("similar_job_search_results", {
                title,
                length: dataLength,
                similar_job_search_params: searchParams
            });
        } catch (error) {
            console.error("Error logging search results:", error);
        }
    }

    get_job_list() {
        let job_list = null;

        let app = this.props.app;
        let jobs = this.state.jobs;


        try {
            if (Array.isArray(jobs) && jobs.length > 0) {
                job_list = jobs.map((job, index) => {
                    const key = `_${Math.random().toString(36).substr(2, 9)}`;
                    return (
                        <Job
                            source="similar_to_job"
                            key={key}
                            job={job}
                            app={app}
                            showEmailSignUpPopup={app.showEmailSignUpPopup}
                            getProvidedEmail={app.getProvidedEmail}
                            getForcefullyHideEmailPrompts={app.getForcefullyHideEmailPrompts}
                            keyword={app.getKeyword()}
                            {...job}
                        />
                    )
                })
            }
        } catch (e) {

        }

        return job_list;
    }


    render() {

        return (
            <div
                className={styles.modalOverlay}
                style={{display: (this.state.modalIsOpen ? 'flex' : 'none')}}
            >
                <div className={styles.modalWrapper}>
                    <button className={styles.closeBtn} onClick={this.closeBtn}>
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
                    </button>

                    <div className={styles.modalContent}>
                        <h2 className={styles.modalTitle}>
                            You Might Also Be Interested In
                        </h2>

                        <div className={styles.jobListContainer}>
                            <div className={styles.jobList}>
                                {this.get_job_list()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

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
                            You Might Also Be Interested In
                        </div>

                        <div className={styles.text2}>
                            {this.state.title}
                        </div>

                        <div className={styles.jobList}>
                            {this.get_job_list()}
                        </div>


                    </div>

                </div>


            </div>

        )
    }
}

export default Similar_To_Job;
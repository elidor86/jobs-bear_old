import React, {Component} from 'react';
import styles from './Job_Modal.module.css';
import logEvent from '../../lib/logEvent'
import Event_Bus from '../../lib/Event_Bus'

//import SignUpWithJobs from "./Job_Pages/SignUpWithJobs/SignUp";
//import ApplyV2 from "./Job_Pages/ApplyV2/Apply";
//import Basic from "./Job_Pages/Basic/Basic";
import Apply from "./Job_Pages/Apply/Apply";
import Router from "next/router";


const page_version_mapper = {
    "Apply": Apply,
    //"Basic": Basic,
    //"SignUpWithJobs": SignUpWithJobs,
    //"ApplyV2": ApplyV2
}

class Job_Modal extends React.Component {
    constructor(props) {

        //console.log("EmailModalV3 props", props);

        super(props);

        this.continueClickCounter = 0;
        this.didCatchBack = false;
        this.AskFirstName = false;

        this.state = {
            job: null,
            AskFirstName: false,
            error: false,
            location: props.location,
            keyword: props.keyword,
            modalIsOpen: props.modalIsOpen
        }
    }

    getDisplayState() {
        return this.state.modalIsOpen;
    }

    showModal(job) {

        const self = this;

        job = job || {};

        let Job = {}
        Job.title = job.title;
        Job.src = job.src;
        Job.company = job.company;
        Job.cpa = job.cpa;
        Job.cpc = job.cpc;
        Job.referencenumber = job.referencenumber;
        Job.searchMethod = job.searchMethod;
        Job.url = job.url;


        logEvent("Job_Modal_open", {job: Job});

        this.setState({modalIsOpen: true});
        Router.push(location.pathname + location.search + "#showJobDetails");
    }

    initialModalState() {
        return false;
    }

    closeBtn() {

        const self = this;
        const app = this.props.app;

        this.setState({modalIsOpen: false});

        try {
            this.props.onClose();
        } catch (e) {

        }

        logEvent("Job_Modal_close_btn_click");

        try {

        } catch (e) {

        }
    }


    catchBack() {

        var self = this;


    }

    catchFirstBack() {


    }

    submitClick() {


    }

    componentDidMount() {

        const self = this;

        this.closeBtn = this.closeBtn.bind(this);

    }

    get_job_page_version() {
        const self = this;
        const {job} = this.state;
        const props = this.props;


        const whichComponent = "SignUpWithJobs";
        const ComponentToRender = page_version_mapper.Apply;

        return <ComponentToRender
            app={props.app}
            job={job}
            close_btn={self.closeBtn}
            noThanks={self.closeBtn}
            {...job}
        />
    }

    render() {

        const page_version = this.get_job_page_version();

        return (

            <div className={`${styles.modalContainer} ${this.state.modalIsOpen ? styles.active : ''}`}>

                {page_version}

            </div>

        )
    }
}

export default Job_Modal;
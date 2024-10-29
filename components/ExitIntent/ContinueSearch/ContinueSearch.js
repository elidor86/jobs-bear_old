import React, {Component} from "react";
import styles from './ContinueSearch.module.css';
import logEvent from "../../../lib/logEvent";


class ContinueSearch extends Component {
    componentDidUpdate() {
        if (this.props.show) {

        }
    }


    getList() {

        const self = this;

        let keyword = "";
        let location = "";

        try {
            keyword = self.props.app.getKeyword();
        } catch (e) {

        }

        try {
            location = self.props.app.getLocation();
        } catch (e) {

        }

        let SerpJobsArr = [
            {
                title: "##q## - Candidates like You are needed",
                body: "All latest vacancies | Apply For Top ##q## jobs Now | Full Time And Part Time jobs",
                src: "serp",
                referencenumber: "serp",
                location: "",
                url: "https://myfirsttab.com/api/redirect-search?sid=10594&cid=Your_click_id&t=jobs"
            },
            {
                title: "$11-$26/hr ##q## jobs (Hiring)",
                body: "Submit an Application. $11/hr-$26/hr Positions Available. Get Hired! Hiring Full And Part Time Positions. Apply Online Today!",
                src: "serp",
                referencenumber: "serp",
                location: "",
                url: "https://myfirsttab.com/api/redirect-search?sid=10594&cid=Your_click_id&t=jobs"
            },
            {
                title: "$8-32/Hr ##q## Jobs - No Experience Needed (FT/PT)",
                body: "Hiring Immediately. Need Entry Level & Experienced. View Local ##q## Openings. All Experience Levels. Training Available. Get Hired Fast.",
                src: "serp",
                referencenumber: "serp",
                location: "",
                url: "https://myfirsttab.com/api/redirect-search?sid=10594&cid=Your_click_id&t=jobs"
            },
            {
                title: "##q## Jobs in your city - Best <b>Jobs</b> around the corner",
                body: "Browse Through the Listings and Find Your Next <b>Job</b> Today! Looking for a <b>Job</b>? Find All <b>Job</b> Offers on One Page.",
                src: "serp",
                referencenumber: "serp",
                location: "",
                url: "https://myfirsttab.com/api/redirect-search?sid=10594&cid=Your_click_id&t=jobs"
            },
            {
                title: "<b>Jobs</b> Near Me ($7-$29/hr) - Full &amp; Part Time <b>Jobs</b> (Hiring)",
                body: "Many <b>jobs</b> ready for immediate hire. No experience required. Apply here. <b>Jobs</b> near me. The newest <b>jobs</b> are here",
                src: "serp",
                referencenumber: "serp",
                location: "",
                url: "https://myfirsttab.com/api/redirect-search?sid=10594&cid=Your_click_id&t=jobs"
            }
        ]

        let listArr = [];

        SerpJobsArr.forEach(function (serpJob) {


            //console.log("serpJob.referencenumber ", serpJob.referencenumber);

            serpJob.title = serpJob.title.replace(/##q##/igm, "<b>" + keyword + "</b>");
            serpJob.title = serpJob.title.replace(/##l##/igm, "<b>" + location + "</b>");

            serpJob.body = serpJob.body.replace(/##q##/igm, "<b>" + keyword + "</b>");
            serpJob.body = serpJob.body.replace(/##l##/igm, "<b>" + location + "</b>");

            serpJob.location = location;

            //console.log("self.props.geo",self.props.geo)

            try {
                if (self.props.geo == "gb") {
                    serpJob.body = serpJob.body.replace("$", "£").replace("$", "£").replace("$", "£");
                    serpJob.title = serpJob.title.replace("$", "£").replace("$", "£").replace("$", "£");
                }
            } catch (e) {

            }


            let itemEl =
                <div className={styles.itemWrapper} onClick={() => {
                    self.props.serpClick();
                }}>

                    <div className={styles.itemTitle} dangerouslySetInnerHTML={{__html: serpJob.title}}>

                    </div>

                    <div className={styles.itemDesc} dangerouslySetInnerHTML={{__html: serpJob.body}}>

                    </div>

                </div>

            listArr.push(itemEl)

        })


        return listArr

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

                 <span className={styles.closeBtn} onClick={() => {
                     onClose();
                 }}>
                        <img src="/static/images/ei/almost-finish-clost-icon.svg"></img>
                    </span>


                <div className={styles.hero}>

                    <div className={styles.heroText}>
                        Continue Your Search Here
                    </div>

                </div>

                <div className={styles.contentWrapper}>

                    <div className={styles.keywordInputContainer}>
                        <input value={this.props.app.getKeyword()} className={styles.keywordInput}/>
                    </div>


                    <div className={styles.listContainer}>

                        <div className={styles.tagContainer}>
                            <span className={styles.tag}>All</span>
                            <span className={styles.tag}>Part Time</span>
                            <span className={styles.tag}>Near Me</span>
                        </div>

                        {this.getList()}
                    </div>

                </div>

            </div>
        );
    }
}

export default ContinueSearch;

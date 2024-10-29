import React, {Component} from "react";
import styles from './WhereToLook.module.css';
import logEvent from "../../../lib/logEvent";


class WhereToLook extends Component {
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

                <div className={styles.modalWrapper}>

                    <span className={styles.closeBtn} onClick={() => {
                        onClose();
                    }}>
                        <img src="/static/images/ei/almost-finish-clost-icon.svg"></img>
                    </span>


                    <div className={styles.hero}>
                        <img src="/static/images/ei/where-to-look-bear-with-dollars.svg"></img>
                    </div>


                    <div className={styles.contentContainer}>

                        <div className={styles.text1}>
                            To find a job you need to know where to look

                        </div>

                        <div className={styles.text2}>
                            Here are some secret sites with exclusive jobs:
                        </div>


                        <div className={styles.cta} onClick={() => {
                            serpClick();
                        }}>
                            Best for {this.props.app.getKeyword()} jobs

                            <span>
                                <svg width="9" height="14" viewBox="0 0 9 14" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
<path
    d="M1.27717 13.9982C0.979279 13.9987 0.69059 13.9175 0.461216 13.7687C0.332119 13.6849 0.225406 13.5821 0.147187 13.466C0.0689677 13.3499 0.0207803 13.2229 0.00538454 13.0922C-0.0100113 12.9615 0.00768725 12.8297 0.057466 12.7044C0.107245 12.5791 0.188125 12.4626 0.295476 12.3618L6.00713 7.01368L0.499465 1.65557C0.393562 1.5535 0.314476 1.43607 0.266753 1.31001C0.219031 1.18395 0.203612 1.05175 0.221384 0.921013C0.239155 0.790274 0.289765 0.663573 0.370307 0.548193C0.450849 0.432812 0.559734 0.331026 0.690703 0.248686C0.822614 0.157851 0.977091 0.0893352 1.14444 0.0474391C1.31179 0.00554297 1.4884 -0.00882886 1.66318 0.00522486C1.83796 0.0192786 2.00715 0.0614548 2.16012 0.129107C2.31309 0.196758 2.44654 0.288425 2.55209 0.398354L8.70997 6.38508C8.89749 6.56362 9 6.78756 9 7.01867C9 7.24979 8.89749 7.47373 8.70997 7.65227L2.33535 13.639C2.20746 13.7597 2.04499 13.8552 1.86113 13.9176C1.67728 13.98 1.47721 14.0076 1.27717 13.9982Z"
    fill="white"/>
</svg>

                            </span>
                        </div>

                        <div className={styles.cta} onClick={() => {
                            serpClick();
                        }}>
                            Best for High Salary jobs

                            <span>
                                <svg width="9" height="14" viewBox="0 0 9 14" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
<path
    d="M1.27717 13.9982C0.979279 13.9987 0.69059 13.9175 0.461216 13.7687C0.332119 13.6849 0.225406 13.5821 0.147187 13.466C0.0689677 13.3499 0.0207803 13.2229 0.00538454 13.0922C-0.0100113 12.9615 0.00768725 12.8297 0.057466 12.7044C0.107245 12.5791 0.188125 12.4626 0.295476 12.3618L6.00713 7.01368L0.499465 1.65557C0.393562 1.5535 0.314476 1.43607 0.266753 1.31001C0.219031 1.18395 0.203612 1.05175 0.221384 0.921013C0.239155 0.790274 0.289765 0.663573 0.370307 0.548193C0.450849 0.432812 0.559734 0.331026 0.690703 0.248686C0.822614 0.157851 0.977091 0.0893352 1.14444 0.0474391C1.31179 0.00554297 1.4884 -0.00882886 1.66318 0.00522486C1.83796 0.0192786 2.00715 0.0614548 2.16012 0.129107C2.31309 0.196758 2.44654 0.288425 2.55209 0.398354L8.70997 6.38508C8.89749 6.56362 9 6.78756 9 7.01867C9 7.24979 8.89749 7.47373 8.70997 7.65227L2.33535 13.639C2.20746 13.7597 2.04499 13.8552 1.86113 13.9176C1.67728 13.98 1.47721 14.0076 1.27717 13.9982Z"
    fill="white"/>
</svg>

                            </span>
                        </div>


                        <div className={styles.cta} onClick={() => {
                            serpClick();
                        }}>
                            Best for Part Time jobs


                            <span>
                                <svg width="9" height="14" viewBox="0 0 9 14" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
<path
    d="M1.27717 13.9982C0.979279 13.9987 0.69059 13.9175 0.461216 13.7687C0.332119 13.6849 0.225406 13.5821 0.147187 13.466C0.0689677 13.3499 0.0207803 13.2229 0.00538454 13.0922C-0.0100113 12.9615 0.00768725 12.8297 0.057466 12.7044C0.107245 12.5791 0.188125 12.4626 0.295476 12.3618L6.00713 7.01368L0.499465 1.65557C0.393562 1.5535 0.314476 1.43607 0.266753 1.31001C0.219031 1.18395 0.203612 1.05175 0.221384 0.921013C0.239155 0.790274 0.289765 0.663573 0.370307 0.548193C0.450849 0.432812 0.559734 0.331026 0.690703 0.248686C0.822614 0.157851 0.977091 0.0893352 1.14444 0.0474391C1.31179 0.00554297 1.4884 -0.00882886 1.66318 0.00522486C1.83796 0.0192786 2.00715 0.0614548 2.16012 0.129107C2.31309 0.196758 2.44654 0.288425 2.55209 0.398354L8.70997 6.38508C8.89749 6.56362 9 6.78756 9 7.01867C9 7.24979 8.89749 7.47373 8.70997 7.65227L2.33535 13.639C2.20746 13.7597 2.04499 13.8552 1.86113 13.9176C1.67728 13.98 1.47721 14.0076 1.27717 13.9982Z"
    fill="white"/>
</svg>

                            </span>
                        </div>


                        <div className={styles.cta} onClick={() => {
                            serpClick();
                        }}>
                            Best for Up to Date jobs


                            <span>
                                <svg width="9" height="14" viewBox="0 0 9 14" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
<path
    d="M1.27717 13.9982C0.979279 13.9987 0.69059 13.9175 0.461216 13.7687C0.332119 13.6849 0.225406 13.5821 0.147187 13.466C0.0689677 13.3499 0.0207803 13.2229 0.00538454 13.0922C-0.0100113 12.9615 0.00768725 12.8297 0.057466 12.7044C0.107245 12.5791 0.188125 12.4626 0.295476 12.3618L6.00713 7.01368L0.499465 1.65557C0.393562 1.5535 0.314476 1.43607 0.266753 1.31001C0.219031 1.18395 0.203612 1.05175 0.221384 0.921013C0.239155 0.790274 0.289765 0.663573 0.370307 0.548193C0.450849 0.432812 0.559734 0.331026 0.690703 0.248686C0.822614 0.157851 0.977091 0.0893352 1.14444 0.0474391C1.31179 0.00554297 1.4884 -0.00882886 1.66318 0.00522486C1.83796 0.0192786 2.00715 0.0614548 2.16012 0.129107C2.31309 0.196758 2.44654 0.288425 2.55209 0.398354L8.70997 6.38508C8.89749 6.56362 9 6.78756 9 7.01867C9 7.24979 8.89749 7.47373 8.70997 7.65227L2.33535 13.639C2.20746 13.7597 2.04499 13.8552 1.86113 13.9176C1.67728 13.98 1.47721 14.0076 1.27717 13.9982Z"
    fill="white"/>
</svg>

                            </span>
                        </div>


                    </div>


                </div>

            </div>

        );
    }
}

export default WhereToLook;

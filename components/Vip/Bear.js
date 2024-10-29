import React, {Component} from 'react';

import logEvent from "../../lib/logEvent";


import styles from './Vip.module.css';
import Feature from './Feature';
import Testimonials from './Testimonials';
import ThankYouModal from './ThankYouModal/ThankYou';


class Bear extends React.Component {

    constructor(props) {


        super(props);

        //console.log("props.MoneyVersion ", props.MoneyVersion);

        this.state = {
            FeaturesHtml: props.FeaturesHtml,
            displayThankYouModal: false
        };

        this.MoneyVersion = props.MoneyVersion;
        this.Price = props.Price;
        this.PriceStr = "";

        this.FeaturesArr = props.FeaturesArr;


        this.setPriceStr();
    }


    setPriceStr() {

        let geo = "gb";
        let MoneySign = "£";
        let MoneyStr = "";

        if (this.props.geo && this.props.geo.length == 2) {
            geo = this.props.geo;
        }

        if (geo != "gb") {
            MoneySign = "$";
        }

        MoneyStr = MoneySign + this.Price + "/m";

        this.MoneyStr = MoneyStr;
        return MoneyStr;

    }

    componentDidMount() {

    }

    componentClicked() {

    }


    getTestimonialsHtml() {
        let TestimonialsHtml = [];

        let TestimonialsArr = [
            {
                body: "The interview preparation helped me tremendously. I nailed it on the first one and got hired within a month!",
                name: "Jared Hastings",
                title: "Forklift Driver, Birmingham",
                img: "/static/images/jared.png"
            },
            {
                body: "The VIP package is worth the cost. The online courses helped me become more professional and get a new job",
                name: "Clair Burke",
                title: "Nurse, Reading",
                img: "/static/images/clair.png"
            },
            {
                body: "I’ve been out of a job since the COVID outbreak. JobsBear helped me find a new one quickly",
                name: "Clive Boswell",
                title: "Truck Driver, Sheffield",
                img: "/static/images/clive.png"
            }
        ];

        for (let index in TestimonialsArr) {
            const Item = TestimonialsArr[index];
            TestimonialsHtml.push(
                <Testimonials
                    key={index}
                    name={Item.name}
                    title={Item.title}
                    body={Item.body}
                    img={Item.img}
                >
                </Testimonials>
            )
        }

        return TestimonialsHtml;

    }

    onThankYouClose() {

    }

    goToJobs() {

        this.props.app.goToPage({
            newWindow: false,
            queryParams: {
                utm_medium: "listBanner",
                page: 1
            },
            page: "jobs"
        });

        logEvent("VipGoToJobs");

    }

    scrollToCta() {

        logEvent("VipScrollToCta");

        try {
            let elmnt = document.getElementById("cta-scroll-into");
            elmnt.scrollIntoView({
                behavior: 'smooth'
            });
        } catch (e) {

        }

    }

    ctaButtonClick() {


        let email = document.getElementById("input-email").value;
        let phone = document.getElementById("input-phone").value;
        let name = document.getElementById("input-name").value;

        logEvent("vipLead", {
            fname: name || "",
            email: email || "",
            phone: phone || "",
        });

        if (!email || email.length <= 2) {
            alert("pleae enter a valid mail");
            return;
        }

        if (!phone || phone.length <= 2) {
            alert("pleae enter a valid phone");
            return;
        }

        if (!name || name.length <= 2) {
            alert("pleae enter a valid name");
            return;
        }


        this.setState({
            displayThankYouModal: true
        })

    }

    getFeaturesHtml() {
        let FeaturesHtml = [];
        for (let index in this.FeaturesArr) {
            const FeatureItem = this.props.FeaturesArr[index];
            FeaturesHtml.push(
                <Feature
                    key={index}
                    side={FeatureItem.side}
                    title={FeatureItem.title}
                    body={FeatureItem.body}
                    img={FeatureItem.img}
                >
                </Feature>
            )
        }

        return FeaturesHtml;
    }

    render() {


        let FeaturesHtml = this.getFeaturesHtml();
        let TestimonialsHtml = this.getTestimonialsHtml();


        return (


            <div className={styles.vipContainer}>


                <div className={styles.topContainer}>

                    <div className={styles.topContainerTopText}>
                        <div>Coronavirus got</div>
                        <div>your job?</div>
                    </div>

                    <div className={styles.topContainerImgContainer}>
                        <img src="/static/images/bear-covid.png"/>
                    </div>


                    <div className={styles.topContainerButtomText}>


                        {
                            this.MoneyVersion == "beer" ?
                                "Don’t worry. Our jam-packed VIP services package will get you back in the market in no-time! And only for the price of one pint of beer!"
                                :
                                "Don’t worry. Our jam-packed VIP services package will get you back in the market in no-time!"
                        }

                    </div>

                    {
                        this.MoneyVersion == "beer" ?
                            <div className={styles.topContainerBearPrice}>
                                {this.MoneyStr}

                            </div> : null
                    }


                </div>

                {
                    this.MoneyVersion != "beer" ?
                        <div className={styles.topContainerPrice}>
                            <div>
                                For {this.MoneyStr} you’ll get a new job soon!
                            </div>

                            <div>
                                Read on to learn how
                            </div>

                        </div> : null
                }

                <div className={styles.whyContainer}>

                    <div className={styles.whyContainerFirstText}>
                        Why join our VIP service?
                    </div>

                    <div className={styles.whyContainerSecondext}>
                        It’s the complete job relief package
                    </div>

                    <div className={styles.whyContainerFeatureContainer}>
                        {FeaturesHtml}
                    </div>

                    <div className={styles.whyContainerWhatAreYouWaitingFor}>
                        What are you waiting for?
                    </div>

                    <div className={styles.ctaButton} onClick={this.scrollToCta.bind(this)}>
                        Register now!
                    </div>


                </div>

                <div className={styles.loveUsContainer}>

                    <div className={styles.loveUsContainerFirstText}>
                        <div>
                            Check out how our
                        </div>

                        <div>
                            members love us
                        </div>

                    </div>

                    <div className={styles.loveUsContainerTestimonialsContainer}>
                        {TestimonialsHtml}
                    </div>

                    <div className={styles.loveUsContainerLetsGo}>
                        Let’s go job hunting right away!
                    </div>

                    <div className={styles.ctaButton} onClick={this.scrollToCta.bind(this)} id="cta-scroll-into">
                        Register now!
                    </div>
                </div>

                <div id="form-container" className={styles.formContainer}>


                    <div className={styles.formContainerFirstText}>
                        Ready for your next job?

                        <div className={styles.formContainerSecText}>

                            {
                                this.MoneyVersion == "beer" ?
                                    "A pint of beer or a job that pays well? The choice is clear! "
                                    :
                                    "Job seekers similar to you are already back at work with our help. Don’t miss the train!"
                            }


                        </div>
                    </div>


                    {
                        this.MoneyVersion == "beer" ?
                            <div className={styles.formContainerBearPrice}>
                                {this.MoneyStr}
                            </div> : null
                    }


                    <div className={styles.formContainerInputContainer}>
                        <input id="input-name" type="text" placeholder="Your name"
                               className={styles.formContainerInput}/>
                    </div>


                    <div className={styles.formContainerInputContainer}>
                        <input id="input-email" type="text" placeholder="Email" className={styles.formContainerInput}/>
                    </div>


                    <div className={styles.formContainerInputContainer}>
                        <input id="input-phone" type="text" placeholder="Phone" className={styles.formContainerInput}/>
                    </div>

                    <div className={styles.ctaButton} onClick={this.ctaButtonClick.bind(this)}>
                        Proceed to payment
                    </div>

                    {
                        this.MoneyVersion != "beer" ?
                            <div className={styles.formContainerPriceTag}>
                                VIP subscription only {this.MoneyStr}
                            </div> : null
                    }

                </div>

                <div className={styles.supportContainer}>


                    <div className={styles.supportContainerFirstText}>
                        Got some questions? We’re here for you!
                    </div>

                    <div className={styles.supportContainerSecText}>
                        You can always get in touch with our support team
                    </div>

                    <div className={styles.supportContainerEmailText}>
                        <a href="mailto:support@jobs-bear.com">support@jobs-bear.com</a>
                    </div>

                </div>

                {
                    this.state.displayThankYouModal ? <ThankYouModal
                        onClose={this.onThankYouClose}
                        goToJobs={this.goToJobs.bind(this)}
                    ></ThankYouModal> : null
                }

            </div>


        )
    }
}

export default Bear;
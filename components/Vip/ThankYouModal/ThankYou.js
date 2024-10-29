import React, {Component} from 'react';

import styles from './ThankYou.module.css';


class ThankYou extends React.Component {
    constructor(props) {


        super(props);


        this.state = {
            error: false,
            modalIsOpen: true
        }
    }


    closeBtn() {

        this.setState({modalIsOpen: false});
        this.props.onClose();


    }

    goToJobs() {

        this.setState({modalIsOpen: false});
        this.props.goToJobs();

    }


    componentDidMount() {
        this.closeBtn = this.closeBtn.bind(this);


    }


    render() {

        return (


            <div className={styles.modalContainer} style={{display: (this.state.modalIsOpen ? 'block' : 'none')}}>


                <div className={styles.modalWrapper}>

                     <span className={styles["close-btn"]} onClick={this.closeBtn.bind(this)}>
                        <img src="/static/images/close-btn-vip-thank-you.png"></img>
                    </span>

                    <div className={styles.topImageContainer}>
                        <img src="/static/images/bear-thanks.png"/>
                    </div>

                    <div className={styles.text1}>
                        Hey, thanks!
                    </div>

                    <div className={styles.text2}>
                        We’re so glad that you’re interested!
                    </div>

                    <div className={styles.text2}>
                        It won’t take long until someone from our team will contact you.
                    </div>

                    <div className={styles.text2}>

                        Meanwhile, why not look for openings?

                    </div>

                    <div className={styles.ctaButton} onClick={this.goToJobs.bind(this)}>

                        Discover open positions

                    </div>

                </div>


            </div>

        )
    }
}

export default ThankYou;
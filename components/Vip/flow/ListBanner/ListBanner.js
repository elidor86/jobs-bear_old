import React, {Component} from 'react';

import logEvent from "../../../../lib/logEvent";
import styles from './ListBanner.module.css';

class ListBanner extends React.Component {
    constructor(props) {

        super(props);


        this.state = {}
    }


    componentDidMount() {

    }


    componentClicked() {

    }

    ctaClick() {

        logEvent(this.props.eventName);

        if (this.props.onCtaClick) {
            this.props.onCtaClick()
        } else {
            this.props.app.goToPage({
                newWindow: this.props.newWindow,
                queryParams: this.props.queryParams,
                page: this.props.page
            })

        }


    }

    render() {

        return (


            <div className={styles.listBannerContainer} onClick={this.ctaClick.bind(this)}>

                <div className={styles.listBannerContainerFirstText}>
                    {this.props.title}
                </div>

                <div className={styles.listBannerContainerSecText}>
                    {this.props.body}
                </div>


                <div className={styles.ctaButton}>
                    <div className={styles.listBannerContainerBearImgContainer}>
                        <img src="/static/images/vip-list-banner-bear.svg"/>
                    </div>
                    {this.props.ctaText}
                </div>

            </div>

        )
    }
}

export default ListBanner;
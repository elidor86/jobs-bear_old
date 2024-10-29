import React, {Component} from 'react';

import styles from './Feature.module.css';

class Bear extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            title: props.title,
            body: props.body,
            side: props.side,
            img: props.img
        }
    }


    componentDidMount() {

    }


    componentClicked() {

    }


    render() {

        return (


            <div className={styles.FeatureContainer} style={{paddingLeft: this.state.side == "right" ? "30px" : "0px"}}>

                <div className={styles.imgContainer}
                     style={{float: this.state.side,margin: this.state.side == "right" ? "0px 0px 0px 0px" : "0px 10px 0px 0px"}}>

                    <img src={this.state.img}/>

                </div>

                <div className={styles.txtContainer}>

                    <div className={styles.title}>
                        {this.state.title}
                    </div>

                    <div className={styles.body}>
                        {this.state.body}
                    </div>

                </div>

            </div>

        )
    }
}

export default Bear;
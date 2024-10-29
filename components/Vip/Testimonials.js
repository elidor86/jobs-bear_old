import React, {Component} from 'react';

import styles from './Testimonials.module.css';

class Bear extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            title: props.title,
            body: props.body,
            name: props.name,
            img: props.img
        }
    }


    componentDidMount() {

    }


    componentClicked() {

    }


    render() {

        return (


            <div className={styles.TestimonialsContainer}>

                <div className={styles.TestimonialsContainerImgContainer}>

                    <img className={styles.TestimonialsContainerImgContainerImg} src={this.props.img}/>

                </div>

                <div className={styles.quotes}>
                    "{this.props.body}"
                </div>


                <div className={styles.name}>
                    — {this.props.name}
                </div>


                <div className={styles.title}>
                    {this.props.title}
                </div>


            </div>

        )
    }
}

export default Bear;
import React, {Component} from 'react';


import styles from './DropDown.module.css';


class DropDown extends React.Component {
    constructor(props) {

        //console.log("props", props);

        super(props);


        this.state = {
            currentOption: props.options[0],
            options: props.options,
            showDropDownOptions: false
        }
    }


    componentDidMount() {

        this.onOptionClick = this.onOptionClick.bind(this);
    }


    onOptionClick(e) {

        this.setState({
            showDropDownOptions: false
        });


        try {

            const index = e.target.getAttribute("data-key");

            if (index && this.state.options[index]) {

                this.setState({
                    currentOption: this.state.options[index]
                });

                try {
                    this.props.on_option_choose(index);
                } catch (e) {

                }

            }

            // console.log("index", index);
        } catch (e) {

        }


    }

    onDropDownClick() {


        if (this.state.showDropDownOptions == true) {
            this.setState({
                showDropDownOptions: false
            })
        } else {
            this.setState({
                showDropDownOptions: true
            })
        }


    }

    render() {


        let self = this;

        let optionsHtml = this.state.options.map(function (name, index) {

            if (name == "Tap to pick") {
                return null;
            }

            return <div
                onClick={self.onOptionClick}
                className={styles["options-item"]}
                key={index}
                data-key={index}>

                {name}

            </div>;
        });


        return (


            <div className={styles["main-container"]}>

                <div className={styles["drop-down-container"]} onClick={this.onDropDownClick.bind(this)}>

                    <img src="/static/images/apply-arrow-down.svg" className={styles["drop-down-arrow-down"]}/>

                    {this.state.currentOption}

                </div>

                <div className={styles["options-container"]}
                     style={{display: (this.state.showDropDownOptions ? 'block' : 'none')}}>

                    {optionsHtml}
                </div>


            </div>
        )
    }
}

export default DropDown; 
import React from 'react';
import IconCheck from './IconCheck'
import IconUnchecked from './IconUnchecked'
import styles from "../EmailModalV3/EmailModalV3.module.css";

const Styles = {
    button: {
        background: 'transparent',
        border: '0',
        marginBottom: '0.5rem',
        fontSize: '1rem',
        display: 'flex',
        outline: '0',
        color: '#9B9B9B',
        marginRight: '0.5rem',
        cursor: 'pointer',
        textAlign: 'left'
    },

    check: {
        marginRight: '10px'
    },

    content: {
        paddingTop: '0.2rem',
        fontSize: '0.9rem',
        fontWeight: '100',
        lineHeight: '1.25rem'
    }
}

class Checkbox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: props.checked == true ? true : false
        }

        this.icon = this.icon.bind(this)
        this.toggle = this.toggle.bind(this)
    }

    icon() {
        return this.state.checked ? <IconCheck/> : <IconUnchecked/>
    }

    toggle(event) {
        event.preventDefault()
        this.setState(function (state, props) {
            return {
                checked: !state.checked
            }
        })
    }

    render() {
        return (
            <div
                style={Styles.button}
                onClick={this.toggle}>

                <div style={Styles.check}>
                    {this.icon()}
                </div>

                <div className={this.props.labelContainer} dangerouslySetInnerHTML={{
                    __html: this.props.label
                }}>

                </div>

                <div style={Styles.content}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Checkbox;
import React from 'react';
import {FallingLines} from 'react-loader-spinner';

class MyLoadingOverlay extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isAnimating: false,
        };
        this.timeoutId = null;
    }

    componentDidUpdate(prevProps) {
        if (this.props.isActive !== prevProps.isActive) {
            this.setState({isAnimating: true});
            clearTimeout(this.timeoutId);
            this.timeoutId = setTimeout(() => this.setState({isAnimating: false}), 500); // same duration as animation
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutId);
    }

    render() {
        const {isActive, description} = this.props;
        const {isAnimating} = this.state;

        if (!isActive && !isAnimating) {
            return null;
        }

        return (
            <>
                <style>
                    {`
                        @keyframes fadeIn {
                            from { opacity: 0; }
                            to { opacity: 1; }
                        }

                        @keyframes fadeOut {
                            from { opacity: 1; }
                            to { opacity: 0; }
                        }
                    `}
                </style>

                <div style={overlayStyle(isActive)}>
                    <FallingLines color="white" height={80} width={80}/>
                    <p style={contentStyle}>{description}</p>
                </div>
            </>
        );
    }
}

const overlayStyle = isActive => ({
    position: 'fixed',
    maxWidth: "100vw",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#606FC7",
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    animation: `${isActive ? 'fadeIn' : 'fadeOut'} 0.1s`,
    opacity: isActive ? 1 : 0,
    transition: 'opacity 0.5s',
});

const contentStyle = {
    color: 'white',
    marginTop: '20px',
};

export default MyLoadingOverlay;

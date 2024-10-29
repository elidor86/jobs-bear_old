import React from "react";

class Icon extends React.Component {

    constructor(props) {


        super(props);


    }

    render() {



        return (

            <svg

                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
            >
                <path
                    fill="#606FC7"
                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"
                    opacity="0.8"
                ></path>
            </svg>


        )
    }
}

export default Icon;
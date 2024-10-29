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
                    fill="#808CD2"
                    fillRule="evenodd"
                    d="M5 11h11.586l-3.293-3.293a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a.996.996 0 01-1.631-.325.999.999 0 01.217-1.09L16.586 13H5a1 1 0 110-2z"
                    clipRule="evenodd"
                ></path>
            </svg>


        )
    }
}

export default Icon;
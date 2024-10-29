import React from 'react'

export default class IconUnchecked extends React.Component {

    render() {
        return (
            <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                 aria-labelledby="checkboxIconTitle" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"
                 stroke-linejoin="round" fill="none" color="#000000">
                <rect x="21" y="3" width="18" height="18" rx="1" transform="rotate(90 21 3)"/>

            </svg>
        )
    }
}

const Styles = {
    svg: {
        width: '24px',
        height: '24px'
    }
}

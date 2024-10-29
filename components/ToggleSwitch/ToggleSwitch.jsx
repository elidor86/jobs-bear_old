import React from 'react';
import { Switch, withStyles } from '@mui/material';

const CustomSwitch = withStyles((theme) => ({
    switchBase: {
        '&$checked': {
            color: theme.palette.common.white,
        },
        '&$checked + $track': {
            backgroundColor: '#60d192', // Color when switched to 'Yes'
        },
    },
    checked: {},
    track: {
        backgroundColor: '#f44336', // Color when switched to 'No'
    },
}))(Switch);

function MySwitchComponent() {
    const [checked, setChecked] = React.useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <div style={{ width: '100%', padding: '10px 0' }}>
            <CustomSwitch
                checked={checked}
                onChange={handleChange}
                name="checked"
                // Add any additional styling if needed
            />
            {/* You may add labels or additional elements here */}
        </div>
    );
}

export default MySwitchComponent;

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
const useStyles = makeStyles((theme) => ({
    
    button: {
        margin: theme.spacing(1),
    },
    customWidth: {
        maxWidth: 500,
    },
    noMaxWidth: {
        maxWidth: 'none',
    },
}));


export default function InfoComp(props) {
    const classes = useStyles();
    if (props.norm === 'minmax') {
        var longText = `Normalization by the number of users in the technology inside the country. the country that has the most users in the specific technology get full color and the lowest usage get none.
    `;
    }
    else longText = `Normalization by the numbers of users in the technology devided by total number of users of all technologies inside the country`
    return (
        <div style={{ position: 'relative', right: 25, bottom: -0 }}>

            <Tooltip classes={{tooltip:{backgroundColor:'red'} }} title={longText}>

                <img className={classes.button} style={{ height: '30px' }} src='https://i.pinimg.com/originals/0c/b2/36/0cb236777f219f7ddb6d21a8ac7ff2fa.png'></img>

            </Tooltip>
        </div>
    )
}
//
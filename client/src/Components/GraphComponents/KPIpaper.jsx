import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        padding: '0 30px',
    },
    h1: {
        fontFamily: 'Montserrat',
        //textDecoration: 'underline',
    },
    p: {
        fontFamily: 'Comfortaa',
        fontSize: 18,
        fontWeight: 'bold',
        lineHeight: 1.5

    },
    h6: {

        color: 'red'
    },
    number: {
        display: 'block',
        textAlign: 'left',
        marginLeft: 10,
        fontFamily: 'Comfortaa',
        fontSize: 17,
        bottom: 30
    },
    equals: {
        display: 'block',
        height: 0,
        borderBottom: 'solid 1px black',
        overflow: 'hidden',

    }
});

export default function KPI() {
    const classes = useStyles();
    return <div className={classes.root}>
        <h1 className={classes.h1}>KPI</h1>
        <p className={classes.p}>There are two KPI's that defined the usage and development of technology.</p>
        <div>
            <Box display="flex" flexDirection="row">
                <Box>
                    <h3 className={classes.h1}><b>Popularity of technology = </b></h3>
                </Box>
                <Box display='flex' flexDirection="column" ml={3} mt={1}>
                    <span className={classes.number}>Num of users intaractive with chosen Tech</span>
                    <span className={classes.equals} style={{ width: 390 }}>=</span>
                    <span className={classes.number} >Total users of all Techs in Country</span>
                </Box>
            </Box>
        </div>
        <div>
            <Box display="flex" flexDirection="row">
                <Box>
                    <h3 className={classes.h1}><b>Experts = </b></h3>
                </Box>
                <Box display='flex' flexDirection="column" ml={3} mt={2}>
                    <span className={classes.number}>Sum of Answers</span>
                    <span className={classes.equals} style={{ width: 160 }}>=</span>
                    <span className={classes.number}>Sum of Questions</span>
                </Box>
            </Box>
        </div>

    </div >
}
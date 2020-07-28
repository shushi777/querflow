import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';



const AntSwitch = withStyles((theme) => ({
    root: {
        width: 130,
        height: 55,
        margin: 3,
        display: 'flex',
        padding: 6

    },
    switchBase: {
        margin: 9,
        height: 20,
        borderRadius: 10,
        color: '#FFEECC',
        '&$checked': {
            transform: 'translateX(60px)',
            color: '#53090C',
            '& + $track': {
                opacity: 1,
                backgroundColor: '#931015',

            },
        },
    },
    thumb: {
        width: 35,
        height: 24,
        boxShadow: 'none',
        borderRadius: 10,

    },
    track: {
        border: '2px solid #4D0D00',
        borderRadius: 10,
        opacity: 1,
        background: 'linear-gradient(45deg, #F9BE8F 10%, #F96113 90%)',


    },
    checked: {},
}))(Switch);

export default function CustomizedSwitches(props) {
    const [state, setState] = React.useState({
        checkedC: true,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
        props.onChange(event.target.checked)
    };

    return (
        <FormGroup>
            <Box display="flex" flexDirection="column" justifyContent="center" ml={15}>
                <Box ml={7} mt={3} style={{ fontSize: 25, fontWeight: 'bolder', color: '#FF4E1C', fontFamily: 'Comfortaa' }}>Switch KPI</Box>
                <Typography component="div">
                    <Grid component="label" container alignItems="center" spacing={1}>
                        <Grid item style={{ width: '50px', textAlign: 'center', fontFamily: 'Comfortaa', fontWeight: 'bold', marginRight: 10 }}>Experts</Grid>
                        <Grid item>
                            <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                        </Grid>
                        <Grid item style={{ width: '50px', textAlign: 'center', fontFamily: 'Comfortaa', fontWeight: 'bold' }}>Popularity of technology</Grid>
                    </Grid>
                </Typography>
            </Box>
        </FormGroup >
    );
}

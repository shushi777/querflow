import React from 'react'
//import Technologies from '../../Files/Technologies'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {

        width: '45vw',
        position: 'relative',
        margin: 3,
        left: '50%',
        transform: 'translate(-50%)',
        border: '2px solid #7B4008',
        borderRadius: 10,
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));


export default function ComprationBarTech(props) {
    const Check = (e) => {
        console.log(e)
    }
    const classes = useStyles();
    return (
        <div className={classes.root} style={{}}>
            <Autocomplete
                multiple
                id="multiple-limit-tags1"
                options={props.Tags}
                getOptionLabel={(Tags) => Tags.TagName}
                onChange={(event, value) => props.getTech(value)}
                renderInput={(params) => {
                    return <TextField {...params} variant="outlined" label="Technology" placeholder="Technology" />
                }}

            />
        </div>
    )
}
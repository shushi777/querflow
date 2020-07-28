import React from 'react'
//import Technologies from '../../Files/Technologies'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {

        width: '50vw',
        position: 'relative',

        left: '50%',
        transform: 'translate(-50%)',




        '& > * + *': {
            marginTop: theme.spacing(3),
        },
    },
}));

const handleInputChange = (params) => {
    var propsArray = params.InputProps.startAdornment || []
    if (propsArray.length > 2) {
        params.InputProps.startAdornment = propsArray.pop()
        return <TextField {...params} variant="outlined" label="Technology" placeholder="Technology" />
    }
    else return <TextField {...params} variant="outlined" label="Technology" placeholder="Technology" />
    // if (params.InputProps.startAdornment == undefined)

    // else return <TextField {...params} variant="outlined" label="Technology" placeholder="Technology" />
}
export default function ComprationBar(props) {
    const Check = (e) => {
        console.log(e)
    }
    const classes = useStyles();
    return (
        <div className={classes.root} style={{}}>
            <Autocomplete
                multiple
                id="multiple-limit-tags"
                options={props.Tags}
                getOptionLabel={(Tags) => Tags.TagName}
                onChange={(event, value) => props.getTechResearch(value)}
                renderInput={(params) => {
                    return <TextField {...params} variant="outlined" label="Technology" placeholder="Technology" />
                }}

            />
        </div>
    )
}
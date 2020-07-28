import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
    root: {
        width: 300,
    },
});

export default function YearSlider(props) {
    const classes = useStyles();
    function valuetext(value) {
         console.log(value)
        return `${value}°C`;

    }
   const func=(e)=>{
        console.log(parseInt(e.target.innerText) )
    }

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingBottom: '10px' }}>
            <div className={classes.root}>
                <Typography id="discrete-slider-small-steps" gutterBottom>
                    Year
      </Typography>
                <Slider
                    defaultValue={2015}
                   // getAriaValueText={props.getYear }
                    aria-labelledby="discrete-slider-small-steps"
                    step={1}
                    marks
                    min={2008}
                    max={2020}
                    valueLabelDisplay="on"
                    onChangeCommitted={props.getYear}
                    
                  

                />
            </div>
        </div>
    )
}

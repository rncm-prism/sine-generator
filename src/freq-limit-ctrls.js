import React from "react";
import "./style.css";

import { Typography, Grid, Slider, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { TOTAL_FREQ_RANGE } from "./constants";


const useStyles = makeStyles((theme) => ({
  grid: {
    marginTop: "16px",
    fontStyle: "italic"
  },
  slider: {
    paddingTop: 16,
    paddingBottom: 0
  },
  rangeDisplay: {
    minWidth: 30
  }
}));

const ValueLabelComponent = (props) => {
  const { children, open, value } = props;
  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

const sliderValToFreq = (val, range) => {
  const [ bottomFreq, topFreq ] = range;
  const freqRange = topFreq-bottomFreq;
  return val * (freqRange/100) + bottomFreq;
}
  
const freqToSliderVal = (freq, range) => {
  const [ bottomFreq, topFreq ] = range;
  const freqRange = topFreq-bottomFreq;
  return (freq-bottomFreq)/freqRange * 100;
}

const FrequencyLimitControlsOLD = (props) => {
  const classes = useStyles();
  const { freqRange, setFreqRange } = props;
  const range = freqRange.map(freq => freqToSliderVal(freq, TOTAL_FREQ_RANGE));
  const handleChange = (e, vals) => {
    let newFreqRange = vals.map(val => sliderValToFreq(val, TOTAL_FREQ_RANGE));
    setFreqRange(newFreqRange);
  }

  return (
    <Grid container className={classes.grid} direction="column" justify="center" alignItems="center">
      <Typography color="textSecondary">Drag sliders to adjust range (Hz)...</Typography>
      <Slider
        className={classes.slider}
        id="freq-range-selector"
        ValueLabelComponent={ValueLabelComponent}
        value={ [ ...range ] }
        onChange={handleChange}
        step={0.5}
        valueLabelDisplay="auto"
        valueLabelFormat={(x)=>`${sliderValToFreq(x, TOTAL_FREQ_RANGE)}Hz`}
      />
    </Grid>
  )
}

const FrequencyLimitControls = (props) => {
  const classes = useStyles();

  const { freqRange, setFreqRange } = props;
  const range = freqRange.map(freq => freqToSliderVal(freq, TOTAL_FREQ_RANGE));
  const bottomFreq = sliderValToFreq(range[0], TOTAL_FREQ_RANGE);
  const topFreq = sliderValToFreq(range[1], TOTAL_FREQ_RANGE);

  const handleChange = (e, vals) => {
    let newFreqRange = vals.map(val => sliderValToFreq(val, TOTAL_FREQ_RANGE));
    setFreqRange(newFreqRange);
  }


  return (
    <Grid container className={classes.grid} direction="column" justify="center" alignItems="center">
      <Typography color="textSecondary">Drag sliders to adjust range (Hz)...</Typography>
      <Grid container direction="row" spacing={2} alignItems="center" justify="space-between">
        <Grid item className={classes.rangeDisplay} xs><Typography color="textSecondary" align="right">{bottomFreq}</Typography></Grid>
        <Grid item xs={9}>
          <Slider
            className={classes.slider}
            id="freq-range-selector"
            value={ [ ...range ] }
            onChange={handleChange}
          />
        </Grid>
        <Grid item className={classes.rangeDisplay} xs><Typography color="textSecondary">{topFreq}</Typography></Grid>
      </Grid>
    </Grid>
  )
}

export default FrequencyLimitControls;
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { settingsActions } from '../_actions'
import { Typography } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {timezones} from './timeZones';
import InputAdornment from '@material-ui/core/InputAdornment';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    height: 'calc(100% - 64px)',
    width: '100%',
    overflow: 'auto',
  },
  header: {
    textAlign: 'center'
  },
  paper: {
      //width: '100%',
      /* verticalAlign: 'middle',
      position: 'relative',
      textAlign: 'center', */
      [theme.breakpoints.up('lg')]: {
        height: '100%',
      },
      /* display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between', */
  },
  menu: {
   width: '75%',
  },
  scrollDiv: {
      height: '70%',
      overflowY: 'scroll'
  },
  grid: {
    //minHeight: '412px',
    //flexGrow: 1,
    [theme.breakpoints.down('md')]: {
      padding: '5px'
    },
    paddingTop: '5px',
    paddingLeft: '5px',
  },
  button:{
    backgroundColor: '#54AAB3',
    color: 'white',
    marginBottom: '20px',
    marginTop: '10px',
    [theme.breakpoints.down('xs')]: {
      width: '80%',
    },
      width: '45%',
  },
  field: {
    width: '80%'
  },
  fieldset: {
    width: '45%',
    minWidth: '150px',
    maxWidth: '300px',
    marginLeft: '2%',
    marginRight: '2%',
    [theme.breakpoints.down('xs')]: {
      width: '80%',
    },
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  }
});

class Settings extends Component {

    state = {
        ssid: '',
        password: '',
        submitted: false,
        panID: {
          "panID": null
        },
        enabled: '',
        maxWindSpeed: null,
        maxRainFall: null,
        meanWindSpeed: null,
        windSpeedTimer: null,
        maxFloodLevel: null,
        maxSnowFall: null,
        timeZone1: "Asia/Kolkata",
        timeZone: null,
        hbinterval: null,
        maxMsgs: null,
        default1: 20,
	      thresholdOK: false,
	      heartBeatOK: false,
        maxWindSpeed1:0, 
        maxRainFall1:0, 
        meanWindSpeed1:0,
        windSpeedTimer1:0, 
        hbinterval1:0, 
        maxMsgs1:0, 
        panid1:0, 
        maxFloodLevel1: 20,
        maxSnowFall1: 10,
        powerRequestTimePeriod: null,
        statusRequestTimePeriod: null,
        powerRequestTimePeriod1: 0,
        statusRequestTimePeriod1: 0,
        labelWidth: 0,
    };

    componentDidMount(){
        this.props.getSettings();   
    }

    handleChange = (e) => {
      const { name, value } = e.target;
      this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
      e.preventDefault();
      this.setState({ submitted: true });
      const { ssid, password } = this.state;
      if (ssid && password) {
          this.props.setWifiInfo(ssid, password);
      }
    }

    handleClick = () => {
      this.props.setPanID(this.state.panID);
    }

    handleThreshold = () => {
        this.props.threshold(this.state.maxWindSpeed, this.state.maxRainFall, this.state.meanWindSpeed, this.state.windSpeedTimer, this.state.maxFloodLevel,this.state.maxSnowFall);
    }

    handleHeartBeat = () => {
      
      if(this.state.enabled === 'disabled')
      {
          this.setState({hbinterval: 10, maxMsgs: 0});
          this.props.heartBeat(this.state.enabled, this.state.hbinterval? this.state.hbinterval: this.props.hbinterval1, this.state.maxMsgs? this.state.maxMsgs: this.props.maxMsgs1);
      }

      if(this.state.enabled === 'enabled')
      {
        if(this.state.hbinterval === 0)
        {
            toast('Heart Beat Interval cannot be 0', {
                position: "bottom-right"
              });
        }
        else
        {
            this.props.heartBeat(this.state.enabled, this.state.hbinterval? this.state.hbinterval: this.props.hbinterval1, this.state.maxMsgs? this.state.maxMsgs: this.props.maxMsgs1);
        }
      }
        
    }

    handleTimeZone = () => {
        this.props.setTimeZone(this.state.timeZone1);
    }

    handleFrequency = () => {
        this.props.setFrequency(this.state.powerRequestTimePeriod, this.state.statusRequestTimePeriod);
    }

    componentWillReceiveProps(nextProps){
      if(this.props !== nextProps)
      {
        this.setState({
          maxWindSpeed: nextProps.maxWindSpeed1,
          meanWindSpeed: nextProps.meanWindSpeed1,
          windSpeedTimer: nextProps.windSpeedTimer1,
          maxRainFall: nextProps.maxRainFall1,
          maxFloodLevel: nextProps.maxFloodLevel1,
          maxSnowFall: nextProps.maxSnowFall1,
          hbinterval: nextProps.hbinterval1,
          maxMsgs: nextProps.maxMsgs1,
          timeZone: nextProps.timezone,
          powerRequestTimePeriod: nextProps.powerRequestTimePeriod1,
          statusRequestTimePeriod: nextProps.statusRequestTimePeriod1,
          panID: nextProps.panid1,
        })
      }
    }

    render(){
        const { classes } = this.props;
        
        return (
            <div className={classes.root}>
              <Grid direcion="column" container justify="flex-start" style={{height: '100%'}} >
                <Grid item md={6} xs={12}  className={classes.grid}>
                  <Paper className={classes.paper}>
                    <Typography variant="h6" className={classes.header}>
                        Threshold
                    </Typography>
                    <form className={classes.form} noValidate autoComplete="off" onSubmit={this.handleThreshold}>
                          <TextField
                              name="maxWindSpeed"
                              label="Maximum Wind Speed"
                              placeholder="Maximum Wind Speed"
                              onChange={this.handleChange}
                              margin="normal"
                              value={this.state.maxWindSpeed}
                              variant="outlined"
                              className={classes.fieldset}
                              InputProps={{
                                endAdornment: <InputAdornment position="end">mph</InputAdornment>,
                              }}
                              InputLabelProps={{ shrink: true }}
                          />

                          <TextField
                              name="meanWindSpeed"
                              label="Mean Wind Speed"
                              placeholder="Mean Wind Speed"
                              onChange={this.handleChange}
                              margin="normal"
                              variant="outlined"
                              className={classes.fieldset}
                              value={this.state.meanWindSpeed}
                              InputProps={{
                                endAdornment: <InputAdornment position="end">mph</InputAdornment>,
                              }}
                              InputLabelProps={{ shrink: true }}
                          />
                          <TextField
                              name="windSpeedTimer"
                              label="Wind Speed Timer"
                              placeholder="Wind Speed Timer"
                              onChange={this.handleChange}
                              margin="normal"
                              variant="outlined"
                              className={classes.fieldset}
                              value={this.state.windSpeedTimer}
                              InputProps={{
                                endAdornment: <InputAdornment position="end">s</InputAdornment>,
                              }}
                              InputLabelProps={{ shrink: true }}
                          />

                        <TextField
                            name="maxRainFall"
                            label="Maximum Rain Fall"
                            placeholder="Maximum Rain Fall"
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
                            className={classes.fieldset}
                            value={this.state.maxRainFall}
                            InputProps={{
                              endAdornment: <InputAdornment position="end">mm</InputAdornment>,
                            }}
                            InputLabelProps={{ shrink: true }}
                        />
                                                        
                        <TextField
                            name="maxFloodLevel"
                            label="Maximum Flood Level"
                            placeholder="Maximum Flood Level"
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
                            className={classes.fieldset}
                            value={this.state.maxFloodLevel}
                            InputProps={{
                              endAdornment: <InputAdornment position="end">m</InputAdornment>,
                            }}
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            name="maxSnowFall"
                            label="Maximum Snow Fall"
                            placeholder="Maximum Snow Fall"
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
                            className={classes.fieldset}
                            value={this.state.maxSnowFall}
                            InputProps={{
                              endAdornment: <InputAdornment position="end">m</InputAdornment>,
                            }}
                            InputLabelProps={{ shrink: true }}
                        />

                      <Button type="submit" className={classes.button} variant="contained" color="primary" >
                          Submit
                      </Button>
                    </form>
                  </Paper>
              </Grid>

              <Grid item md={3}  xs={12} sm={6}  className={classes.grid} >
                <Paper className={classes.paper}>
                
                  <Typography variant="h6" className={classes.header}>
                      Heart Beat Settings
                  </Typography>
                                 
                  <form className={classes.form} noValidate autoComplete="off" onSubmit={this.handleSubmit} >

                    <TextField
                        id="enabled-simple"
                        select
                        label="Enable"
                        name="enabled"
                        value={this.state.enabled}
                        onChange={this.handleChange}
                        className={classes.field}
                        SelectProps={{
                          MenuProps: {
                            //className: classes.field,
                          },
                        }}
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                    >
            
                      <MenuItem value="enabled">Enabled</MenuItem>
                      <MenuItem value="disabled">Disabled</MenuItem>
            
                    </TextField>


                    <TextField
                        name="hbinterval"
                        label="Heart Beat Interval"
                        placeholder="Heart Beat Interval"
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                        className={classes.field}
                        disabled={this.state.enabled === "disabled"}
                        value={this.state.hbinterval}
                        InputProps={{
                          endAdornment: <InputAdornment position="end">s</InputAdornment>,
                        }}
                        InputLabelProps={{ shrink: true }}
                    />


                    <TextField
                        name="maxMsgs"
                        label="Max msgs before stow"
                        placeholder="Max msgs before stow"
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                        className={classes.field}
                        disabled={this.state.enabled === "disabled"}
                        value={this.state.maxMsgs}
                        InputProps={{
                          endAdornment: <InputAdornment position="end">msgs</InputAdornment>,
                        }}
                        InputLabelProps={{ shrink: true }}
                    />

                  <Button type="submit" className={classes.button} variant="contained" color="primary" >
                              Submit
                  </Button>
                </form>
                </Paper>
              </Grid>

              

              <Grid item md={3}  xs={12} sm={6}  className={classes.grid} >
                <Paper className={classes.paper}>
                  <Typography variant="h6" className={classes.header}>
                    Request Frequency
                  </Typography>

                  <form className={classes.form} noValidate autoComplete="off" onSubmit={this.handleSubmit} >
                        <TextField
                            name="powerRequestTimePeriod"
                            label="Power"
                            placeholder="Power"
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
                            className={classes.field}
                            value={this.state.powerRequestTimePeriod}
                            InputProps={{
                              endAdornment: <InputAdornment position="end">s</InputAdornment>,
                            }}
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            name="statusRequestTimePeriod"
                            label="Status"
                            placeholder="Status"
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
                            className={classes.field}
                            value={this.state.statusRequestTimePeriod}
                            InputProps={{
                              endAdornment: <InputAdornment position="end">s</InputAdornment>,
                            }}
                            InputLabelProps={{ shrink: true }}
                        />
                  <Button type="submit" className={classes.button} onClick={this.handleFrequency} variant="contained" color="primary" >
                      Submit
                  </Button>
                  </form>
                </Paper>
              </Grid>

              <Grid item md={3}  xs={12} sm={6}  className={classes.grid} >
                <Paper className={classes.paper}>
                  <Typography variant="h6" className={classes.header}>
                      Select Time Zone
                  </Typography>
                    
                  <form className={classes.form} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                    <TextField
                      id="timeZone-simple"
                      select
                      label="Select Time Zone"
                      value={this.state.timeZone}
                      name="timeZone"
                      className={classes.field}
                      onChange={this.handleChange}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu,
                        },
                      }}
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                    >
                      {timezones.map(t => 
                                  <MenuItem key={t.value} value={t}>{t.text.split(' ')[0]} {t.value} - {t.abbr}</MenuItem>
                      )}
                      {/* <MenuItem value="Asia/Kolkata">+ &nbsp; Asia/Kolkata</MenuItem>
                        <MenuItem value="America/Denver">- &nbsp; America/Denver</MenuItem>
                        <MenuItem value="Australia/Darwin">- &nbsp; Australia/Darwin</MenuItem> */}
                    </TextField>
            
                  
                  <Button className={classes.button} type='submit' variant="contained" color="primary" >
                              Submit
                  </Button>
                  </form>
                </Paper>
              </Grid>

              <Grid item md={3}  xs={12} sm={6}  className={classes.grid} >
                  <Paper className={classes.paper}>
                      <Typography variant="h6" className={classes.header}>
                          Set XBEE config
                      </Typography>
                      
                      <form className={classes.form} noValidate autoComplete="off" onSubmit={this.handleSubmit } >
                              <TextField
                                  name="panID"
                                  label="PAN ID"
                                  placeholder="Enter the PAN ID"
                                  margin="normal"
                                  onChange={this.handleChange}
                                  variant="outlined"
                                  className={classes.field}
                                  value={this.state.panID.panID}
                                  InputLabelProps={{ shrink: true }}
                              />
                             
                  
                      <Button type="submit" className={classes.button} variant="contained" color="primary" >
                          Submit
                      </Button>
                      </form>
                  </Paper>
                </Grid>
            </Grid>
      </div>
        );
    }
}

Settings.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    const { maxWindSpeed1, maxRainFall1, meanWindSpeed1 ,windSpeedTimer1, hbinterval1, maxMsgs1, thresholdOK, heartBeatOK, panid1, panidOK, timezone, powerRequestTimePeriod1, statusRequestTimePeriod1 , maxFloodLevel1,
        maxSnowFall1} = state.settings;
    return {
        maxWindSpeed1, 
        maxRainFall1, 
        meanWindSpeed1,
        windSpeedTimer1, 
        hbinterval1, 
        maxMsgs1, 
        thresholdOK, 
        heartBeatOK, 
        panid1, 
        panidOK, 
        timezone, 
        powerRequestTimePeriod1, 
        statusRequestTimePeriod1, 
        maxFloodLevel1,
        maxSnowFall1
    };
  }

const mapDispatchToProps = (dispatch) => ({
    setPanID: (panID) => {
        dispatch(settingsActions.setPanID(panID))
    },
    threshold: (maxWindSpeed, maxRainFall, meanWindSpeed, windSpeedTimer, maxFloodLevel, maxSnowFall) => {
        dispatch(settingsActions.threshold(maxWindSpeed, maxRainFall, meanWindSpeed, windSpeedTimer, maxFloodLevel, maxSnowFall))
    },
    heartBeat: (enabled, hbinterval, maxMsgs) => {
        dispatch(settingsActions.heartBeat(enabled, hbinterval, maxMsgs))
    },
    setTimeZone: (time) => {
        dispatch(settingsActions.setTimeZone(time))
    },
    getSettings: () => {
        dispatch(settingsActions.getSettings());
    },
    setFrequency: (power, status) => {
        dispatch(settingsActions.setFrequency(power, status));
    },
  })

const connectedSettings = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Settings));
export { connectedSettings as Settings };
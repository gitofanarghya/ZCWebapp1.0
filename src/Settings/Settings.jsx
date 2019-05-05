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
    padding: '10px',
  },
  paper: {
      width: '100%',
      verticalAlign: 'middle',
        position: 'relative',
        textAlign: 'center',
        height: '400px',
  },
  menu: {
   width: '75%',
  },
  scrollDiv: {
      height: '70%',
      overflowY: 'scroll'
  },
  grid: {
    height: '412px',
    padding: '6px',
  },
  button:{
    backgroundColor: '#54AAB3',
    color: 'white',
  }
});

class Settings extends Component {

    state = {
        ssid: '',
        password: '',
        submitted: false,
        panID: '',
        enabled: '',
        maxWindSpeed: 5,
        maxRainFall: 5,
        meanWindSpeed: 2,
        windSpeedTimer: 30,
        maxFloodLevel: 20,
        maxSnowFall: 10,
        timeZone1: "Asia/Kolkata",
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
        powerRequestTimePeriod: 0,
        statusRequestTimePeriod: 0,
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
          ...nextProps, timeZone1: nextProps.timezone
        })
      }
    }

    render(){
        const { classes } = this.props;
        
        return (
            <div className={classes.root}>
            {this.props.heartBeatOK && this.props.thresholdOK &&
              <Grid   container justify="flex-start" direction="row" style={{height: '100%'}} >
                <Grid item md={3}  xs={6}  className={classes.grid} >
                  <Paper className={classes.paper}>
                    <Typography variant="h5" component="h3" className={classes.header}>
                        Set XBEE config
                    </Typography>
                    <br />
                    
                    <form onSubmit={this.handleSubmit } >
                            <TextField
                                name="panID"
                                label="PAN ID"
                                placeholder="Enter the PAN ID"
                                margin="none"
                                onChange={this.handleChange}
                                variant="outlined"
                                className={classes.field}
                                defaultValue={this.props.panid1.panID}
                            />
                            <br />
                            <br />
                            <Button type="submit" className={classes.button} onClick={this.handleClick} variant="outlined">
                                Submit
                            </Button>
                    </form>
                  </Paper>
                </Grid>

                <Grid item md={6}  xs={12}  className={classes.grid}>
                  <Paper className={classes.paper}>
                    <Typography variant="h5" component="h3" className={classes.header}>
                        Threshold
                    </Typography>
                    <br />
                    <Grid container>
                      <Grid item xs={6}> 
                        <div>
                          <TextField
                              name="maxWindSpeed"
                              label="Maximum Wind Speed"
                              placeholder="Maximum Wind Speed"
                              onChange={this.handleChange}
                              margin="normal"
                              defaultValue={this.props.maxWindSpeed1}
                              variant="outlined"
                              className={classes.field}
                              InputProps={{
                                endAdornment: <InputAdornment position="end">mph</InputAdornment>,
                              }}
                          />

                          <br />
                          <TextField
                              name="meanWindSpeed"
                              label="Mean Wind Speed"
                              placeholder="Mean Wind Speed"
                              onChange={this.handleChange}
                              margin="normal"
                              variant="outlined"
                              className={classes.field}
                              defaultValue={this.props.meanWindSpeed1}
                              InputProps={{
                                endAdornment: <InputAdornment position="end">mph</InputAdornment>,
                              }}
                          />
                          <br />
                          <TextField
                              name="windSpeedTimer"
                              label="Wind Speed Timer"
                              placeholder="Wind Speed Timer"
                              onChange={this.handleChange}
                              margin="normal"
                              variant="outlined"
                              className={classes.field}
                              defaultValue={this.props.windSpeedTimer1}
                              InputProps={{
                                endAdornment: <InputAdornment position="end">s</InputAdornment>,
                              }}
                          />
                          <br />
                        </div>
                      </Grid>

                      <Grid item xs={6}>
                        <TextField
                            name="maxRainFall"
                            label="Maximum Rain Fall"
                            placeholder="Maximum Rain Fall"
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
                            className={classes.field}
                            defaultValue={this.props.maxRainFall1}
                            InputProps={{
                              endAdornment: <InputAdornment position="end">mm</InputAdornment>,
                            }}
                        />
                                                        
                        <TextField
                            name="maxFloodLevel"
                            label="Maximum Flood Level"
                            placeholder="Maximum Flood Level"
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
                            className={classes.field}
                            defaultValue={this.props.maxFloodLevel1}
                            InputProps={{
                              endAdornment: <InputAdornment position="end">m</InputAdornment>,
                            }}
                        />
                        <br />
                        <TextField
                            name="maxSnowFall"
                            label="Maximum Snow Fall"
                            placeholder="Maximum Snow Fall"
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
                            className={classes.field}
                            defaultValue={this.props.maxSnowFall1}
                            InputProps={{
                              endAdornment: <InputAdornment position="end">m</InputAdornment>,
                            }}
                        />

                      </Grid>
                      
                    </Grid>

                    <br /><br />

                    <Button type="submit" className={classes.button} onClick={this.handleThreshold} variant="outlined">
                        Submit
                    </Button>
                  </Paper>
              </Grid>

              <Grid item md={3}  xs={6}  className={classes.grid} >
                <Paper className={classes.paper}>
                  <Typography variant="h5" component="h3" className={classes.header}>
                      Heart Beat Settings
                  </Typography>
                  <br />
                    
                  <form onSubmit={this.handleSubmit} >

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
                            className: classes.field,
                          },
                        }}
                        margin="normal"
                        variant="outlined"
                    >
            
                      <MenuItem value="enabled">Enabled</MenuItem>
                      <MenuItem value="disabled">Disabled</MenuItem>
            
                    </TextField>

                    <br />

                    <TextField
                        name="hbinterval"
                        label="Heart Beat Interval"
                        placeholder="Heart Beat Interval"
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                        className={classes.field}
                        disabled={this.state.enabled === "disabled"}
                        defaultValue={this.props.hbinterval1}
                        InputProps={{
                          endAdornment: <InputAdornment position="end">s</InputAdornment>,
                        }}
                    />

                    <br />

                    <TextField
                        name="maxMsgs"
                        label="Max msgs before stow"
                        placeholder="Max msgs before stow"
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                        className={classes.field}
                        disabled={this.state.enabled === "disabled"}
                        defaultValue={this.props.maxMsgs1}
                        InputProps={{
                          endAdornment: <InputAdornment position="end">msgs</InputAdornment>,
                        }}
                    />

                    <br /><br />

                    <center>
                        <Button type="submit" className={classes.button} onClick={this.handleHeartBeat} variant="outlined">
                            Submit
                        </Button>
                    </center>
                  </form>
                </Paper>
              </Grid>

              <Grid item md={3}  xs={6}  className={classes.grid} >
                <Paper className={classes.paper}>
                  <Typography variant="h5" component="h3" className={classes.header}>
                      Select Time Zone
                  </Typography>
                    
                  <br />

                  <form onSubmit={this.handleSubmit}>
                    <TextField
                      id="timeZone-simple"
                      select
                      label="Select Time Zone"
                      value={this.state.timeZone1}
                      name="timeZone1"
                      className={classes.menu}
                      onChange={this.handleChange}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu,
                        },
                      }}
                      margin="normal"
                      variant="outlined"
                    >
                      {timezones.map(t => 
                                  <MenuItem key={t.value} value={t}>{t.text.split(' ')[0]} {t.value} - {t.abbr}</MenuItem>
                      )}
                      {/* <MenuItem value="Asia/Kolkata">+ &nbsp; Asia/Kolkata</MenuItem>
                        <MenuItem value="America/Denver">- &nbsp; America/Denver</MenuItem>
                        <MenuItem value="Australia/Darwin">- &nbsp; Australia/Darwin</MenuItem> */}
                    </TextField>
            
                    <br /><br />
                    <center>
                        <Button className={classes.button} onClick={this.handleTimeZone} variant="outlined">
                            Submit
                        </Button>
                    </center>
                  </form>
                </Paper>
              </Grid>

              <Grid item md={3}  xs={6}  className={classes.grid} >
                <Paper className={classes.paper}>
                  <Typography variant="h5" component="h3" className={classes.header}>
                    Select Frequency
                  </Typography>

                  <br />
                    
                  <form onSubmit={this.handleSubmit} >
                        <TextField
                            name="powerRequestTimePeriod"
                            label="Power Request Time Interval"
                            placeholder="Power Request Time Interval"
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
                            className={classes.field}
                            defaultValue={this.props.powerRequestTimePeriod1}
                            InputProps={{
                              endAdornment: <InputAdornment position="end">s</InputAdornment>,
                            }}
                        />
                        <br />
                        <TextField
                            name="statusRequestTimePeriod"
                            label="Status Request Time Interval"
                            placeholder="Status Request Time Interval"
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
                            className={classes.field}
                            defaultValue={this.props.statusRequestTimePeriod1}
                            InputProps={{
                              endAdornment: <InputAdornment position="end">s</InputAdornment>,
                            }}
                        />
                        <br /><br />
                        <center>
                            <Button type="submit" className={classes.button} onClick={this.handleFrequency} variant="outlined">
                                Submit
                            </Button>
                        </center>
                  </form>
                </Paper>
              </Grid>
            </Grid>
          }
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
        dispatch(settingsActions.timeZone(time))
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

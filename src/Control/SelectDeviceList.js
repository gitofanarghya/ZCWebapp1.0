import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import StopIcon from '@material-ui/icons/Stop'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import { Grid, Button, Paper, Typography } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import classNames from 'classnames';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {FormGroup, MenuItem, TextField} from '@material-ui/core';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    maxWidth: '100%',
    display: 'flex',
  },
  red: {
    height: '55px',
    backgroundColor: 'red'
  },
  button: {
    margin: theme.spacing.unit * 2,
  },
  green: {
    height: '55px',
    backgroundColor: 'lightgreen'
  },
  orange: {
    height: '55px',
    backgroundColor: 'darkorange'
  },
  yellow: {
    height: '55px',
    backgroundColor: 'beige'
  },
  blue: {
    height: '55px',
    backgroundColor: 'lightskyblue'
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
  }, 
  menuss: {
    backgroundColor: 'darkorange',
    width: '100px',
    borderRadius: '3px',
    color: 'black',
  },
  menus: {
  
    width: '150px',
  } ,
  braod: {
    width: '100px',
  },
  grey: {
    backgroundColor: 'silver',
    opacity: 0.5
  }
});

class CheckboxListSecondary extends React.Component {
  state = {
    auto: [],
    stopped: [],
    disable: false,
    tracker: '',
  };

  handleChange2 = (e,command, deviceID, macID) => {
    e.target.style.backgroundColor = 'silver';
    this.props.sendCommand(deviceID, command, macID)
    const newAuto = this.state.auto
    const newStopped = this.state.stopped
    if(command === 'STOP') {
      newStopped.push(deviceID)
      this.setState({
        stopped: newStopped
      })  
    } else if(command === 'AUTO') {
      newAuto.push(deviceID)
      this.setState({
        auto: newAuto
      })
    }
    
  };

  stows = ["NIGHT", "EMERGENCY", "WIND", "SNOW", "CLEAN"]

  handleChange0 = (e) => {
    this.setState({tracker: e.target.value})
  }

  handleChange = (command, deviceID) => {

    this.props.sendCommand(deviceID, command, '00000')
    const newAuto = this.state.auto
    const newStopped = this.state.stopped
    if(command === 'STOP') {
      newStopped.push(deviceID)
      this.setState({
        stopped: newStopped
      })  
    } else if(command === 'AUTO') {
      newAuto.push(deviceID)
      this.setState({
        auto: newAuto
      })
    }
    
  };


  handleToggleAll = () => () => {
    this.state.all ? 
    this.setState({
      all: false,
      checked: []
    })
    :
    this.setState({
      all: true,
      checked: this.props.trackers
    })
  }


  handleChange1 = event => {
    this.setState({ disable: event.target.checked });
  };

  handleChange3 = (e, deviceID, macID) => {
    this.setState({stow: e.target.value})
    this.props.sendCommand(deviceID, e.target.value, macID);
  }

  handleChange4 = (e) => {
    this.setState({stows: e.target.value});
    this.props.sendCommand("00000", e.target.value, "00000");
  }

  render() {
    const { classes, trackers } = this.props;
    return (
      <Grid container direction='column' spacing={24}>
        <Grid item>
          <Paper className={classes.paper}>
            <Typography variant="h5" component="h3">
                Zone Control:
            </Typography>

            <FormGroup>
              <FormControlLabel
                control={
                  <Switch checked={this.state.disable} onChange={this.handleChange1} aria-label="LoginSwitch" />
                }
                label={this.state.disable ? 'Enabled' : 'Disabled'}
              />
            </FormGroup>

            <Grid container justify="space-evenly">   
              <Button variant="contained" disabled={!this.state.disable} className={classNames(classes.green, classes.button)} onClick={() => this.handleChange('WE', '00000')}>
                RUN WEST
                <ArrowLeftIcon className={classes.rightIcon} />
              </Button>

              <Button variant="contained" disabled={!this.state.disable} className={classNames(classes.blue, classes.button)} onClick={() => this.handleChange('ES', '00000')}>
                RUN EAST
                <ArrowRightIcon className={classes.rightIcon} />
              </Button>

              <Button variant="contained" disabled={!this.state.disable} className={classNames(classes.red, classes.button)} onClick={() => this.handleChange('SMTALStop', '00000')}>
                STOP
                <StopIcon className={classes.rightIcon} />
              </Button>

              <TextField
                id="enabled-simple2"
                select
                label="STOW"
                name="stows"
                value={this.state.stows}
                className={classNames(classes.orange, classes.button, classes.braod, (!this.state.disable? classes.grey: null))}
                disabled={!this.state.disable}
                onChange={(e) => this.handleChange4(e)}
                InputLabelProps={{ fontWeight: 500}}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  }, 
                }}
                margin="none"
                variant="outlined"
              >

                {
                  this.stows.map(stow =>
                      <MenuItem value={stow}>{stow}</MenuItem>
                    )
                }

              </TextField>


              <Button variant="contained" disabled={!this.state.disable} className={classNames(classes.yellow, classes.button)} onClick={() => this.handleChange('SMTALReset', '00000')}>
                RESET
                <AutorenewIcon className={classes.rightIcon} />
              </Button>
            </Grid>
          </Paper>
        </Grid>

        <Grid item>
          <Paper className={classes.paper}>
            <Typography variant="h5" component="h3">
                  Tracker Control:
            </Typography>

            <br />

            <Table className={classes.table}>
              <TableBody>
                {/*
                    trackers.map(tracker => {
                        return ( */
                <div>
                  <Grid container justify="space-evenly">
                    {/* <p>{tracker.trackerID}</p>  */}
                    <TextField
                      id="enabled-simple"
                      select
                      label="Tracker"
                      name="tracker"
                      className={classes.menus}
                      value={this.state.tracker}  
                      onChange={this.handleChange0}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu,
                        }, 
                      }}
                      margin="none"
                      variant="outlined"
                    >

                      {
                        trackers.map(t =>
                            <MenuItem value={t.trackerID}>{t.trackerID}</MenuItem>
                          )
                      }

                    </TextField>

                    <Button variant="contained" className={classes.green} onClick={(e) => this.handleChange2(e,'WE', trackers.filter(t => t.trackerID === this.state.tracker)[0].deviceID, trackers.filter(t => t.trackerID === this.state.tracker)[0].macID)}>
                      RUN WEST
                      <ArrowLeftIcon className={classes.rightIcon} />
                    </Button>

                    <Button variant="contained"  className={classes.blue} onClick={(e) => this.handleChange2(e,'ES', trackers.filter(t => t.trackerID === this.state.tracker)[0].deviceID, trackers.filter(t => t.trackerID === this.state.tracker)[0].macID)}>
                      RUN EAST
                      <ArrowRightIcon className={classes.rightIcon} />
                    </Button>

                    <Button variant="contained"  className={classes.red} onClick={(e) => this.handleChange2(e,'SMTALStop', trackers.filter(t => t.trackerID === this.state.tracker)[0].deviceID, trackers.filter(t => t.trackerID === this.state.tracker)[0].macID)}>
                      STOP
                      <StopIcon className={classes.rightIcon} />
                    </Button>

                    <TextField
                      id="enabled-simple1"
                      select
                      label="STOW"
                      name="stow"
                      value={this.state.stow}
                      className={classes.menuss}
                      onChange={(e) => this.handleChange3(e, trackers.filter(t => t.trackerID === this.state.tracker)[0].deviceID, trackers.filter(t => t.trackerID === this.state.tracker)[0].macID)}
                      InputLabelProps={{ fontWeight: 500}}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu,
                        }, 
                      }}
                      margin="none"
                      variant="outlined"
                    >
                      {
                        this.stows.map(stow =>
                            <MenuItem value={stow}>{stow}</MenuItem>
                          )
                      }

                    </TextField>

                    <Button variant="contained" className={classes.yellow} onClick={(e) => this.handleChange2(e,'SMTALReset', trackers.filter(t => t.trackerID === this.state.tracker)[0].deviceID, trackers.filter(t => t.trackerID === this.state.tracker)[0].macID)}>
                        RESET
                        <AutorenewIcon className={classes.rightIcon} />
                    </Button>
                  </Grid>
                  <br/>
                  <br/>
                </div>
                /*  )
             }
             ) */}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
      /*
      <div className={classes.root}>
        <Table className={classes.table}>
            <TableBody>
            <TableRow>
                      <TableCell padding="default"></TableCell>
                      <TableCell padding="default">
                        <Button variant="contained" className={classes.green} onClick={() => this.handleChange('CLEAN')}>
                          CLEAN
                          <div className={classNames(classes.rightIcon, 'cleanIcon')}></div>
                        </Button>
                      </TableCell>
                      <TableCell padding="default">
                        <Button variant="contained" className={classes.orange} onClick={() => this.handleChange('STOW')}>
                          STOW
                          <StraightenIcon className={classes.rightIcon} />
                        </Button>
                      </TableCell>
                      <TableCell padding="default">
                        <Button variant="contained" className={classes.red} onClick={() => this.handleChange('STOP')}>
                          STOP
                          <StopIcon className={classes.rightIcon} />
                        </Button>
                      </TableCell>
                      <TableCell padding="default">
                        <Button variant="contained" className={classes.blue} onClick={() => this.handleChange('AUTO')}>
                          AUTO
                          <BrightnessAutoIcon className={classes.rightIcon} />
                        </Button>
                      </TableCell>
                      <TableCell padding="default">
                        <Button variant="contained" className={classes.yellow} onClick={() => this.handleChange('UT')}>
                          UPDATE TIME
                          <AccessTimeIcon className={classes.rightIcon} />
                        </Button>
                      </TableCell>
                    </TableRow>
            {
              trackers.map(tracker => {
                  return (
                    <TableRow key={tracker.trackerID}>
                      <TableCell padding="default">{tracker.trackerID}</TableCell>
                      <TableCell padding="default">
                        <Button variant="contained" className={classes.green} onClick={() => this.handleChange('CLEAN', tracker.trackerID)}>
                          CLEAN
                          <div className={classNames(classes.rightIcon, 'cleanIcon')}></div>
                        </Button>
                      </TableCell>
                      <TableCell padding="default">
                        <Button variant="contained" className={classes.orange} onClick={() => this.handleChange('STOW', tracker.trackerID)}>
                          STOW
                          <StraightenIcon className={classes.rightIcon} />
                        </Button>
                      </TableCell>
                      <TableCell padding="default">
                        <Button variant="contained" disabled={this.state.stopped ? this.state.stopped.indexOf(tracker.trackerID) > -1 ? true : false : false } className={classes.red} onClick={() => this.handleChange('STOP', tracker.trackerID)}>
                          STOP
                          <StopIcon className={classes.rightIcon} />
                        </Button>
                      </TableCell>
                      <TableCell padding="default">
                        <Button variant="contained" disabled={this.state.auto ? this.state.auto.indexOf(tracker.trackerID) > -1 ? true : false : false } className={classes.blue} onClick={() => this.handleChange('AUTO', tracker.trackerID)}>
                          AUTO
                          <BrightnessAutoIcon className={classes.rightIcon} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
              })
            }
            </TableBody>
        </Table> 
      </div>
    */)
  }
}

CheckboxListSecondary.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckboxListSecondary);
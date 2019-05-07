import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import {MenuItem }from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import AutorenewIcon from '@material-ui/icons/Autorenew'
import StopIcon from '@material-ui/icons/Stop'
import {Button} from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {FormGroup, TextField} from '@material-ui/core';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        width: '100%',
        height: 'calc(100% - 64px)',
    }, 
    root1: {
        height: '100%',
    },
    padRight: {
        paddingRight: '10px',
        height: '100%',
    },

    trackerDetails: {
        width: '100%', 
        [theme.breakpoints.up(600)]: {
            marginTop: '10px',
            marginBottom: '10px',
            marginRight: '10px',
          },
    [theme.breakpoints.down(600)]: {
            marginLeft: '10px',
            marginBottom: '10px',
            marginRight: '10px',
          },

    paddingLeft: '24px',
    paddingRight: '24px',
    paddingTop: '16px',
    paddingBottom: '16px',
    },
    image: {
        backgroundImage: 'url(/img/openApp.png)',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat'
    },

    tracker1: {
        [theme.breakpoints.down(600)]: {
            height: '500px'
          },
    },
    detail:{
        [theme.breakpoints.down(600)]: {
            height: '500px'
          },
    },
    innerDiv: {
        height: '40%'
    },
    para: {
        margin: 0,
    },
    angleText: {
        width: '100%',
        textAlign: 'center',
        marginBottom: '10px'
      },
      zonePaper: {
        margin:'10px',
        paddingLeft: '24px',
        paddingRight: '24px',
        paddingTop: '16px',
        paddingBottom: '16px',
      },
      zonePaper1: {
        width: '100%', 
        [theme.breakpoints.up(600)]: {
            marginTop: '10px',
            marginBottom: '10px',
            marginRight: '10px',
          },
    [theme.breakpoints.down(600)]: {
            marginLeft: '10px',
            marginBottom: '10px',
            marginRight: '10px',
          },

    paddingLeft: '24px',
    paddingRight: '24px',
    paddingTop: '16px',
    paddingBottom: '16px',
      },
      button: {
        marginTop: '10px',
        marginBottom: '10px',
        marginLeft: 'auto',
        marginRight: 'auto',
        height: '55px',
        width: '150px'
      },
      button1: {
        marginTop: '10px',
        marginBottom: '10px',
        marginLeft: 'auto',
        marginRight: 'auto',
        height: '55px',
        width: '120px'
      },
      rightIcon: {
        marginLeft: theme.spacing.unit,
      },
      paper: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
      }, 
      menuss: {
        borderRadius: '3px',
        color: 'black',
        height: '55px',
    
        width: '100px',
        marginTop: '10px',
        marginBottom: '10px',
        marginLeft: 'auto',
        marginRight: 'auto',
      },
      menus: {
        position: 'absolute',
        right: 0,
        top: 0,
        width: '125px'
      } ,
      braod: {
        width: '100px',
      },
      grey: {
        backgroundColor: '#E1E1E1',
      },
      label: {
        color: 'black'
      },
      dropButton: {
        marginTop: '10px',
        marginBottom: '10px',
        marginLeft: 'auto',
        marginRight: 'auto',
        height: '55px',
        width: '15px !important',
        minWidth: '0 !important'
      },
      detail: {
        height: '450px',
      },
      switchRoot:{
          position: 'absolute',
          top: 0,
          right: 0,
      }
});

class CheckboxListSecondary extends Component {
    state = {
        auto: [],
        stopped: [],
        disable: false,
        tracker: '',
        stow: '',
        stow1: '',
        anchorEl: null,
        anchorEl1: null,
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
    
      handleClose = (sto) => {
        this.setState({ anchorEl: null });
        console.log(sto);
        this.setState({stow: sto});
      };
    
      handleClose3 = () => {
        this.setState({ anchorEl: null });
      };
    
      handleClose4 = () => {
        this.setState({ anchorEl1: null });
      };
    
      handleClose1 = (sto1) => {
        this.setState({ anchorEl1: null });
        console.log(sto1);
        this.setState({stow1: sto1});
      };
    
    
      handleChange3 = (e, deviceID, macID) => {
        this.props.sendCommand(deviceID, this.state.stow, macID);
      }
    
      handleChange4 = (e) => {
        this.props.sendCommand("00000", this.state.stow1, "00000");
      }
    
      handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
      };
    
      handleClick1 = event => {
        this.setState({ anchorEl1: event.currentTarget });
      };
    

    render(){
        const { classes, trackers } = this.props;
        const { anchorEl, anchorEl1 } = this.state;
        const open = Boolean(anchorEl);
        const open1 = Boolean(anchorEl1);
        return (
            <div className={classes.root} >
                <Grid container  className={classNames("flex", classes.root1)} alignItems="stretch" direction="row" >
                    <Grid item xs={12} sm={6} className={classNames("flex", classes.detail)}>
                        <Paper className={classes.zonePaper}>
                        <div style={{position: 'relative'}}>
                        <Typography className={classes.heading} variant="headline" component="h3">
                                                                                 <p className={classes.para}>Zone Control</p>
                                                    </Typography>

                  <Switch checked={this.state.disable} className={classes.switchRoot} onChange={this.handleChange1} color="primary" aria-label="LoginSwitch" />
                        </div>
                            <Grid  container  style={{ marginTop: "15%"}}>      
                                <Grid item  xs={6} className={classes.grid}>
                                <Button variant="contained" color="primary" disabled={!this.state.disable} className={classes.button} onClick={() => this.handleChange('WE', '00000')}>
                                  RUN WEST
                                  <ArrowLeftIcon className={classes.rightIcon} />
                                </Button>
                                </Grid>

                                <Grid item  xs={6} className={classes.grid}>
                                <Button variant="contained" color="primary" disabled={!this.state.disable} className={classes.button} onClick={() => this.handleChange('ES', '00000')}>
                RUN EAST
                <ArrowRightIcon className={classes.rightIcon} />
              </Button>
              </Grid>

              <Grid item  xs={6} className={classes.grid}>
              <Button variant="contained" color="primary" disabled={!this.state.disable} className={classes.button} onClick={() => this.handleChange('SMTALStop', '00000')}>
                STOP
                <StopIcon className={classes.rightIcon} />
              </Button>
              </Grid>

                                <Grid item  xs={6} className={classes.grid}>
                                <div style={{marginLeft: 'auto', marginRight: 'auto'}}>
              <Button variant="contained" color="primary" disabled={this.state.disable ===false || this.state.stow1 === ''? true:false} className={classes.button1}  onClick={(e) => this.handleChange4(e)} >
                    {this.state.stow1 === ''? 'STOW': this.state.stow1}
              </Button>
              <Button variant="contained" color="primary" disabled={!this.state.disable} className={classes.dropButton} onClick={this.handleClick1}>
                      <IconButton
                        aria-label="More"
                        aria-owns={open ? 'long-menu' : undefined}
                        aria-haspopup="true"
                      >
                        <ExpandMoreIcon />

                      </IconButton>
              </Button>
                      <Menu
                        id="long-menu"
                        anchorEl={anchorEl1}
                        open={open1}
                        onClose={this.handleClose4}
                        PaperProps={{
                          style: {
                            width: 200,
                          },
                        }}
                      >
                        {
                          this.stows.map(stow =>
                              <MenuItem value={stow} onClick={() => this.handleClose1(stow)}>{stow}</MenuItem>
                              
                            )
                        }
                      </Menu>
                    
                    </div>
                                </Grid>
                                <Grid item  xs={6} className={classes.grid}>
                                <Button variant="contained" color="primary" disabled={!this.state.disable} className={classes.button} onClick={() => this.handleChange('SMTALReset', '00000')}>
                RESET
                <AutorenewIcon className={classes.rightIcon} />
              </Button>
              </Grid>
              </Grid>
      
                        </Paper>
                    </Grid>

                    <br /> 
                    
                    <Grid item xs={12} sm={6} className={classNames("flex", classes.detail)}>
                        <Paper className={classes.zonePaper1}>
                        <div style={{position:'relative'}}>
                        <Typography className={classes.heading} variant="headline" component="h3">
                                                                                 <p className={classes.para}>Tracker Control</p>
                                                    </Typography>
                                                    <TextField
                      id="enabled-simple"
                      select
                      label="Tracker"
                      name="tracker"
                      className={classes.menus}
                      value={this.state.tracker}  
                      onChange={this.handleChange0}
                      InputLabelProps={{
                        classes: {
                          root: classes.label,
                        },
                      }}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu,
                        }, 
                      }}
                      margin="none"
                      variant="outlined"
                      color="primary" 
                    >

                      {
                        trackers.map(t =>
                            <MenuItem value={t.trackerID}>{t.trackerID}</MenuItem>
                          )
                      }

                    </TextField></div>
                            <Grid  container justify="flex-start" direction="row" style={{ marginTop: "15%"}}>      
                                <Grid item  xs={6} className={classes.grid}>
                                <Button variant="contained" color="primary" disabled={this.state.tracker === '' ? true: false} className={classes.button} onClick={(e) => this.handleChange2(e,'WE', trackers.filter(t => t.trackerID === this.state.tracker)[0].deviceID, trackers.filter(t => t.trackerID === this.state.tracker)[0].macID)}>
                      RUN WEST
                      <ArrowLeftIcon className={classes.rightIcon} />
                    </Button>
                                </Grid>

                                <Grid item  xs={6} className={classes.grid}>
                                <Button variant="contained" color="primary" disabled={this.state.tracker === '' ? true: false} className={classes.button} onClick={(e) => this.handleChange2(e,'ES', trackers.filter(t => t.trackerID === this.state.tracker)[0].deviceID, trackers.filter(t => t.trackerID === this.state.tracker)[0].macID)}>
                      RUN EAST
                      <ArrowRightIcon className={classes.rightIcon} />
                    </Button>
                                </Grid>

                                <Grid item  xs={6} className={classes.grid}>
                                <Button variant="contained" color="primary" disabled={this.state.tracker === '' ? true: false} className={classes.button} onClick={(e) => this.handleChange2(e,'SMTALStop', trackers.filter(t => t.trackerID === this.state.tracker)[0].deviceID, trackers.filter(t => t.trackerID === this.state.tracker)[0].macID)}>
                      STOP
                      <StopIcon className={classes.rightIcon} />
                    </Button>
              </Grid>


                                <Grid item  xs={6} className={classes.grid}>
                                <div style={{marginLeft: 'auto', marginRight: 'auto'}}>
                    <Button variant="contained" color="primary" disabled={this.state.tracker === '' || this.state.stow === '' ? true: false} className={classes.button1}  onClick={(e) => this.handleChange3(e, trackers.filter(t => t.trackerID === this.state.tracker)[0].deviceID, trackers.filter(t => t.trackerID === this.state.tracker)[0].macID)} >
                    {this.state.stow === ''? 'STOW': this.state.stow}
                    </Button>
                    <Button variant="contained" color="primary" disabled={this.state.tracker === '' ? true: false} className={classes.dropButton} onClick={this.handleClick}>
                      <IconButton
                        aria-label="More"
                        aria-owns={open ? 'long-menu' : undefined}
                        aria-haspopup="true"
                        
                      >
                        <ExpandMoreIcon />

                      </IconButton>
                      </Button>
                      <Menu
                        id="long-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={this.handleClose3}
                        PaperProps={{
                          style: {
                            width: 200,
                          },
                        }}
                      >
                        {
                          this.stows.map(stow =>
                              <MenuItem value={stow} onClick={() => this.handleClose(stow)}>{stow}</MenuItem>
                              
                            )
                        }
                      </Menu>
                  
                    </div>
                                </Grid>
                                <Grid item  xs={6} className={classes.grid}>
                                <Button variant="contained" color="primary" disabled={this.state.tracker === '' ? true: false} className={classes.button} onClick={(e) => this.handleChange2(e,'SMTALReset', trackers.filter(t => t.trackerID === this.state.tracker)[0].deviceID, trackers.filter(t => t.trackerID === this.state.tracker)[0].macID)}>
                        RESET
                        <AutorenewIcon className={classes.rightIcon} />
                    </Button>
              </Grid>
              </Grid>
      
                        </Paper>
                    </Grid>
                </Grid>
                {this.state.singlePixel === true && <div className={classes.image}></div>}
            </div>
        );
    }
}

CheckboxListSecondary.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckboxListSecondary);

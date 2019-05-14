import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { commissioningActions } from '../_actions'
import { Typography } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import {CenterFocusWeak} from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';

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
    padding: '10px'
    /* display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between', */
},
  paper1: {
      padding: '5%',
      verticalAlign: 'middle',
      textAlign: 'center',
  },

  input: {
      marginTop: '25%',
      fontSize: 20,
      display: 'none'
  },
  label: {
      backgroundColor: 'black',
      display:' inline-block'
  },
  formControl: {
      [theme.breakpoints.down('lg')]: {
        width: '80%',
      },
      width: '60%',
      margin: theme.spacing.unit,
  },
  inputButton:{
      marginTop: '20%',
      marginLeft: '20%',
      maxWidth: '40%'
  },
  textField: {
    width: '80%'
  },
  textField2: {
    width: 'calc(100% - 34px)'
  },
  textField1: {
    width: '30%',
  },
  select1:{
    width: '40%'
  },
  underline : {
    borderBottom: '1px dotted grey',
    width: '100%',
    display: 'block',
    margin: 0,
    position: 'absolute',
    bottom: 0,
    left: 0,
    color: 'grey',
    textAlign: 'left'
    },
    grid: {
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
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  fileInput: {
    margin: '5%'
  },
  dropButton: {
    minWidth: '32px !important',
    width: '32px',
    marginLeft: '2px',
    marginTop: '16px',
    marginBottom: '8px',
    color: 'white',
    height: '55px',
  },
  sensorsDiv: {
    width: '80%',
  }
});

class Commissioning extends Component {

    state = {
        ssid: '',
        password: '',
        submitted: false,
        selectedFile: null,
        selectedKey: null,
        age:'',
        open: false,
        windSensor: '',
        floodSensor: '',
        rainSensor: '',
        snowSensor: '',
        labelWidth: 0,
        windAddress: '',
        anchorEl: null,
        anchorEl1: null,
        anchorEl3: null,
        anchorEl2: null,
    };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleClick3 = (sensor) => {
    if(sensor === 'wind')
    {
      this.props.caliberate(this.state.windSensor);
    }
    else if(sensor === 'rain')
    {
      this.props.caliberate(this.state.rainSensor);
    }
    else if(sensor === 'flood')
    {
      this.props.caliberate(this.state.floodSensor);
    }
    else if(sensor === 'snow')
    {
      this.props.caliberate(this.state.snowSensor);
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { ssid, password } = this.state;
    if (ssid && password) {
        this.props.setWifiInfo(ssid, password);
    }
  }

  handleselectedFile = e => {
    e.preventDefault();
    this.setState({
      selectedFile: e.target.files[0]
    })
  }

  handleselectedKey = e => {
    e.preventDefault();
    this.setState({
      selectedKey: e.target.files[0]
    })
  }

  handleUpload = e => {
    e.preventDefault();
    this.props.upload(this.state.selectedFile)
  }

  handleUploadKey = e => {
    e.preventDefault();
    this.props.uploadKey(this.state.selectedKey)
  }

  handleChange1 = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  selectS = (e) => {
    e.preventDefault();
    this.props.selectSensor(this.state.windSensor, this.state.rainSensor, this.state.floodSensor, this.state.snowSensor, this.state.windAddress);
  }
  componentDidMount() {
    this.props.getSensors();
    this.props.getWindAddress()
  }

  componentWillReceiveProps(nextProps){
    if(this.props !== nextProps)
    {
      this.setState({windSensor: nextProps.windSensor1, rainSensor: nextProps.rainSensor1, floodSensor: nextProps.floodSensor1, snowSensor: nextProps.snowSensor1, windAddress: nextProps.windSensorAddress})

    }
  }

    render(){
        const { classes } = this.props;
        const { anchorEl, anchorEl1, anchorEl2, anchorEl3 } = this.state;
        const open = Boolean(anchorEl);
        const open1 = Boolean(anchorEl1);
        const open2 = Boolean(anchorEl2);
        const open3 = Boolean(anchorEl3);

        return (
          <div className={classes.root} >
            <Grid  direcion="column" container justify="flex-start" style={{height: '100%'}}>            
              <Grid item  md={3}  xs={12} sm={6} className={classes.grid}>
                <Paper className={classes.paper}>
                      <Typography variant="h6" className={classes.header}>
                          WiFi
                      </Typography>
                      <form className={classes.form} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                          <TextField
                              name="ssid"
                              id="outlined-name"
                              label="SSID"
                              placeholder="Enter the ssid"
                              className={classes.textField}
                              onChange={this.handleChange}
                              margin="normal"
                              variant="outlined"
                              InputLabelProps={{ shrink: true }}
                          />
                          <TextField
                              name="password"
                              id="outlined-name"
                              label="Password"
                              placeholder="Enter the password"
                              type="password"
                              className={classes.textField}
                              margin="normal"
                              variant="outlined"
                              onChange={this.handleChange}
                              InputLabelProps={{ shrink: true }}
                          />
                      
                          <Button type='submit' variant="contained" color="primary" className={classes.button}>
                                      CONNECT
                          </Button>
                      </form>
                </Paper>
              </Grid>

              <Grid  item  md={3}  xs={12} sm={6} className={classes.grid}>
                <Paper className={classes.paper}>
                      <Typography variant="h6" className={classes.header}>
                            Zone Tracker Info
                      </Typography>                                
                      <form className={classes.form} noValidate autoComplete="off" onSubmit={this.handleUpload}>
                          <input
                              accept="*.json"
                              className={classes.input}
                              id="text-button-file"
                              multiple
                              type="file"
                              onChange={this.handleselectedFile}
                          />

                          <label htmlFor="text-button-file">
                            <Grid container>
                              <Grid item xs={8} style={{position: 'relative'}} className="fileInput">
                                {this.state.selectedFile === null && <p className={classes.underline}>Choose File</p>}
                                {this.state.selectedFile && <p className={classes.underline}>{this.state.selectedFile['name']}</p>}
      
                              </Grid>

                              <Grid item xs={4}>
                                <Button variant="contained" component="span" color="primary" className={classes.inputButton}>
                                  BROWSE
                                </Button>
                              </Grid>
                            </Grid>
                            <p style={{color: 'grey',fontSize: '13px',textAlign: 'left',marginTop: 5}}>
                                Upload the JSON document that contains the static initialization data.
                            </p>
                          </label>
                      <Button type='submit' variant="contained" margin="normal" color="primary" className={classes.button}>
                          Upload
                      </Button>
                      </form>

                </Paper>
              </Grid>

              <Grid  item  md={3}  xs={12} sm={6} className={classes.grid}>
                <Paper className={classes.paper}>
                      <Typography variant="h6" className={classes.header}>
                        Sensors
                      </Typography>
                                                
                      <form className={classes.form} noValidate autoComplete="off" onSubmit={this.selectS}>

                      <div className={classes.sensorsDiv}>
                        <TextField
                            select
                            label="Wind Sensor"
                            name="windSensor"
                            id="outlined-age-simple"
                            value={this.state.windSensor}
                            onChange={this.handleChange1}
                            className={classes.textField2}
                            SelectProps={{
                              MenuProps: {
                                //className: classes.field,
                              },
                            }}
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                        >
                              <MenuItem value="WD385">WD385</MenuItem>
                              <MenuItem value="CXS01">CXS01</MenuItem>
                              <MenuItem value="NONE">NONE</MenuItem>
                
                        </TextField>

                        <Button variant="contained" color="primary" disabled={this.state.windSensor === '' || this.state.windSensor === 'NONE' ? true : false} className={classes.dropButton} onClick={() => this.handleClick3("wind")}>
                          <IconButton
                            aria-label="More"
                            aria-owns={open ? 'long-menu' : undefined}
                            aria-haspopup="true"
                          >
                            <CenterFocusWeak />

                          </IconButton>
                        </Button>
                      </div>

                     
                           <TextField
                                name="windAddress"
                                id="outlined-name"
                                label="Address"
                                placeholder="Address"
                                className={classes.textField}
                                value={this.state.windAddress}
                                style={{marginBottom: '5px'}}
                                onChange={this.handleChange}
                                margin="normal"
                                variant="outlined"
                                disabled={this.state.windSensor === 'CXS01'? false:true}
                            />

                          <Divider />

                          <div className={classes.sensorsDiv}>
                            <TextField
                        select
                        label="Flood Sensor"
                        name="floodSensor"
                        id="outlined-age-simple1"
                        value={this.state.floodSensor}
                        onChange={this.handleChange1}
                        className={classes.textField2}
                        SelectProps={{
                          MenuProps: {
                            //className: classes.field,
                          },
                        }}
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                    >
            
            <MenuItem value="MB7334">MB7334</MenuItem>
                              <MenuItem value="NONE">NONE</MenuItem>
            
                    </TextField>

                    
                    <Button variant="contained" color="primary" disabled={this.state.floodSensor === '' || this.state.floodSensor === 'NONE' ? true : false} className={classes.dropButton} onClick={() => this.handleClick3("flood")}>
                          <IconButton
                            aria-label="More"
                            aria-owns={open ? 'long-menu' : undefined}
                            aria-haspopup="true"
                          >
                            <CenterFocusWeak />

                          </IconButton>
                        </Button>
                      </div>

                      <div className={classes.sensorsDiv}>

                            <TextField
                        select
                        label="Rain Sensor"
                        name="rainSensor"
                        id="outlined-age-simple2"
                        value={this.state.rainSensor}
                        onChange={this.handleChange1}
                        className={classes.textField2}
                        SelectProps={{
                          MenuProps: {
                            //className: classes.field,
                          },
                        }}
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                    >
            
            <MenuItem value="ARGENT">ARGENT</MenuItem>
                              <MenuItem value="NONE">NONE</MenuItem>
            
                    </TextField>

                    
                    <Button variant="contained" color="primary" disabled={this.state.rainSensor === '' || this.state.rainSensor === 'NONE' ? true : false} className={classes.dropButton} onClick={() => this.handleClick3("rain")}>
                          <IconButton
                            aria-label="More"
                            aria-owns={open ? 'long-menu' : undefined}
                            aria-haspopup="true"
                          >
                            <CenterFocusWeak />

                          </IconButton>
                        </Button>
                      </div>

                      <div className={classes.sensorsDiv}>

                            <TextField
                        select
                        label="Snow Sensor"
                        name="snowSensor"
                        id="outlined-age-simple3"
                        value={this.state.snowSensor}
                        onChange={this.handleChange1}
                        className={classes.textField2}
                        SelectProps={{
                          MenuProps: {
                            //className: classes.field,
                          },
                        }}
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                    >
                              <MenuItem value="MB7354">MB7354</MenuItem>
                              <MenuItem value="NONE">NONE</MenuItem>
            
                    </TextField>

                    
                    <Button variant="contained" color="primary" disabled={this.state.snowSensor === '' || this.state.snowSensor === 'NONE' ? true : false} className={classes.dropButton} onClick={() => this.handleClick3("snow")}>
                          <IconButton
                            aria-label="More"
                            aria-owns={open ? 'long-menu' : undefined}
                            aria-haspopup="true"
                          >
                            <CenterFocusWeak />

                          </IconButton>
                        </Button>
                      </div>


                  <Button type='submit' variant="contained" color="primary" className={classes.button}>
                              Submit
                  </Button>
                  </form>
                </Paper>
              </Grid>

              <Grid  item  md={3}  xs={12} sm={6} className={classes.grid}>
                <Paper className={classes.paper}>
                    <Typography variant="h6"className={classes.header}>
                         Big Query
                    </Typography>    
                    <form className={classes.form} noValidate autoComplete="off" onSubmit={this.handleUploadKey}>
                        <input
                          className={classes.input}
                          id="text-button-file1"
                          multiple
                          type="file"
                          onChange={this.handleselectedKey}
                        />
                          <label htmlFor="text-button-file" style={{width: '100%'}}>
                            <Grid container style={{width: '80%'}}>
                              <Grid item xs={8} style={{position: 'relative'}} className="fileInput">
                                {this.state.selectedKey === null && <p className={classes.underline}>Choose File</p>}
                                {this.state.selectedKey && <p className={classes.underline}>{this.state.selectedKey['name']}</p>}
                              </Grid>
                              <Grid item xs={4}>
                                <Button variant="contained" color="primary" className={classes.inputButton}>
                                  BROWSE
                                </Button>
                              </Grid>
                            </Grid>
                            <p style={{color: 'grey', fontSize: '13px', textAlign: 'left', marginTop: 5}}>
                                Upload key.
                            </p>
                          </label>
                    
                <Button type='submit' variant="contained" color="primary" className={classes.button}>
                            Upload
                </Button>
                </form>
              </Paper>
            </Grid>
        </Grid>
      </div>
        );
    }
}

Commissioning.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const { windSensor1, rainSensor1, floodSensor1, snowSensor1, windSensorAddress } = state.commissioning;
  return {
    windSensor1, 
    rainSensor1, 
    floodSensor1, 
    snowSensor1, 
    windSensorAddress
  };
}


const mapDispatchToProps = (dispatch) => ({
    setWifiInfo: (ssid, pass) => {
        dispatch(commissioningActions.setWifiInfo(ssid, pass)) 
    },
    upload: file => {
        dispatch(commissioningActions.upload(file))
    },
    uploadKey: key => {
      dispatch(commissioningActions.uploadKey(key))
  },
    selectSensor : (windSensor, rainSensor, floodSensor, snowSensor, windAddress) => {
      dispatch(commissioningActions.selectSensor(windSensor, rainSensor, floodSensor, snowSensor, windAddress))
    },
    getSensors : () => {
      dispatch(commissioningActions.getSensors())
    },
    getWindAddress : () => {
      dispatch(commissioningActions.getWindAddress())
    },
    caliberate: (sensor) => {
      dispatch(commissioningActions.caliberate(sensor))
    }
  })

const connectedCommissioning = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Commissioning));
export { connectedCommissioning as Commissioning };

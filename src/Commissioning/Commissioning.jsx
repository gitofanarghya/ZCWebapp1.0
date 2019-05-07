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
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import ReactDOM from 'react-dom';
import Divider from '@material-ui/core/Divider';

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
      height: '500px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
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
      maxWidth: '40%'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    textAlign: 'center',
    margin:'auto',
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
    height: '516px',
    padding: '8px',
  },
  button:{
    color: 'white',
    marginBottom: '20px',
 
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
        windAddress: ''
    };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = () => {
    //e.preventDefault();
    const { ssid, password } = this.state;
    if (ssid && password) {
        this.props.setWifiInfo(ssid, password);
    }
  }

  handleselectedFile = event => {
    this.setState({
      selectedFile: event.target.files[0]
    })
  }

  handleselectedKey = event => {
    this.setState({
      selectedKey: event.target.files[0]
    })
  }

  handleUpload = event => {
    this.props.upload(this.state.selectedFile)
  }

  handleUploadKey = event => {
    this.props.uploadKey(this.state.selectedKey)
  }

  handleChange1 = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  selectS = () => {
    this.props.selectSensor(this.state.windSensor, this.state.rainSensor, this.state.floodSensor, this.state.snowSensor, this.state.windAddress);
  }
  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
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
        
        return (
          <div className={classes.root} >
            <Grid  container justify="flex-start" direction="row" style={{height: '100%'}}>            
              <Grid item  md={3}  xs={12} sm={6} className={classes.grid}>
                <Paper className={classes.paper}>
                  <div> 
                      <Typography variant="h5" component="h3" className={classes.header}>
                          WiFi Settings
                      </Typography>
                    
                      <br />

                      <form onSubmit={this.handleSubmit}>
                          <TextField
                              name="ssid"
                              id="outlined-name"
                              label="SSID"
                              placeholder="Enter the ssid"
                              className={classes.textField}
                              onChange={this.handleChange}
                              margin="normal"
                              variant="outlined"
                          />
                          <br />
                          <br />
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
                          />
                          <br />
                          <br />
                      </form>
                  </div>
                  <div>
                  <Button onClick={() => this.handleSubmit()}  variant="contained" component="span" color="primary" className={classes.button}>
                              CONNECT
                  </Button>
                  </div>
                </Paper>
              </Grid>

              <Grid  item  md={3}  xs={12} sm={6} className={classes.grid}>
                <Paper className={classes.paper}>
                         <div>  
                      <Typography variant="h5" component="h3" className={classes.header}>
                            Upload Zone Tracker Info
                      </Typography>
                      
                      <br />   
                                
                      <form style={{margin: 'auto', padding: '10px'}}>
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

                            <br />

                            <p style={{color: 'grey',fontSize: '13px',textAlign: 'left',marginTop: 0}}>
                                Upload the JSON document that contains the static initialization data.
                            </p>
                          </label>
                      </form></div> 
                      <div>
                      <Button onClick={this.handleUpload} variant="contained" component="span" color="primary" className={classes.button}>
                          Upload
                      </Button>
                      </div>
                </Paper>
              </Grid>

              <Grid  item  md={3}  xs={12} sm={6} className={classes.grid}>
                <Paper className={classes.paper}>
                  <div>
                      <Typography variant="h5" component="h3" className={classes.header}>
                        Sensor Settings
                      </Typography>
                                                
                      <form autoComplete="off">
                          <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel
                              ref={ref => {
                                this.InputLabelRef = ref;
                              }}
                              htmlFor="outlined-age-simple"
                            >
                              Select Wind Sensor
                            </InputLabel>

                            <Select
                              value={this.state.windSensor}
                              onChange={this.handleChange1}
                              
                              input={
                                <OutlinedInput
                                  labelWidth={this.state.labelWidth}
                                  name="windSensor"
                                  id="outlined-age-simple"
                                />
                              }
                            >
                              <MenuItem value="WD385">WD385</MenuItem>
                              <MenuItem value="CXS01">CXS01</MenuItem>
                              <MenuItem value="NONE">NONE</MenuItem>
                            </Select>
                          </FormControl>   
                          
                          <FormControl variant="outlined" className={classes.formControl}>
                            <TextField
                                name="windAddress"
                                id="outlined-name"
                                label="Address"
                                placeholder="Address"
                                value={this.state.windAddress}
                                style={{marginBottom: '5px'}}
                                onChange={this.handleChange}
                                margin="none"
                                variant="outlined"
                                disabled={this.state.windSensor === 'CXS01'? false:true}
                            />
                          </FormControl>

                          <Divider />

                          <FormControl variant="outlined" className={classes.formControl} style={{marginTop: '15px'}}>
                            <InputLabel
                              ref={ref => {
                                this.InputLabelRef = ref;
                              }}
                              htmlFor="outlined-age-simple1"
                            >
                              Select Flood Sensor
                            </InputLabel>

                            <Select
                              value={this.state.floodSensor}
                              onChange={this.handleChange1}
                              input={
                                <OutlinedInput
                                  labelWidth={this.state.labelWidth}
                                  name="floodSensor"
                                  id="outlined-age-simple1"
                                />
                              }
                              
                            >
                              <MenuItem value="MB7334">MB7334</MenuItem>
                              <MenuItem value="NONE">NONE</MenuItem>

                            </Select>
                          </FormControl>



                          <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel
                              ref={ref => {
                                this.InputLabelRef = ref;
                              }}
                              htmlFor="outlined-age-simple2"
                            >
                              Select Rain Sensor
                            </InputLabel>

                            <Select
                              value={this.state.rainSensor}
                              onChange={this.handleChange1}
                              input={
                                <OutlinedInput
                                  labelWidth={this.state.labelWidth}
                                  name="rainSensor"
                                  id="outlined-age-simple2"
                                />
                              }
                            >
                              <MenuItem value="ARGENT">ARGENT</MenuItem>
                              <MenuItem value="NONE">NONE</MenuItem>
                            </Select>
                          </FormControl>



                          <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel
                              ref={ref => {
                                this.InputLabelRef = ref;
                              }}
                              htmlFor="outlined-age-simple3"
                            >
                              Select Snow Sensor
                            </InputLabel>
                            <Select
                              value={this.state.snowSensor}
                              onChange={this.handleChange1}
                              input={
                                <OutlinedInput
                                  labelWidth={this.state.labelWidth}
                                  name="snowSensor"
                                  id="outlined-age-simple3"
                                />
                              }
                            >
                              <MenuItem value="WD385">MB7354</MenuItem>
                              <MenuItem value="NONE">NONE</MenuItem>
                            </Select>
                          </FormControl> 

                          <br />      
                          <br />
                      </form>
                  </div>
                  <div>
                  <Button onClick={this.selectS} variant="contained" component="span" color="primary" className={classes.button}>
                              Submit
                  </Button>
                  </div>
                </Paper>
              </Grid>

              <Grid  item  md={3}  xs={12} sm={6} className={classes.grid}>
                <Paper className={classes.paper}>
                  <div>
                    <Typography variant="h5" component="h3" className={classes.header}>
                         Big Query
                    </Typography>

                    <br />
    
                    <form style={{margin: 'auto', padding: '10px'}}>
                        <input
                          className={classes.input}
                          id="text-button-file1"
                          multiple
                          type="file"
                          onChange={this.handleselectedKey}
                        />

                        <label htmlFor="text-button-file1">
                            <Grid container>
                              <Grid item xs={8} style={{position: 'relative'}} className="fileInput">
                                {this.state.selectedKey === null && <p className={classes.underline}>Choose File</p>}
                                {this.state.selectedKey && <p className={classes.underline}>{this.state.selectedKey['name']}</p>}
                              </Grid>
                              <Grid item xs={4}>
                                <Button variant="contained" component="span" color="primary" className={classes.inputButton}>
                                  BROWSE
                                </Button>
                              </Grid>
                            </Grid>
                            <br />
                            <p style={{color: 'grey', fontSize: '13px', textAlign: 'left', marginTop: 0}}>
                                Upload key.
                            </p>
                        </label>
                    </form>
                </div>
                <div>
                <Button onClick={this.handleUploadKey} variant="contained" color="primary" component="span" className={classes.button}>
                            Upload
                </Button>
                </div>
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
  })

const connectedCommissioning = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Commissioning));
export { connectedCommissioning as Commissioning };

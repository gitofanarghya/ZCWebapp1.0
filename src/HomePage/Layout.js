import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import classNames from 'classnames'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SendIcon from '@material-ui/icons/Send';
import NetworkWifiIcon from '@material-ui/icons/NetworkWifi';
import SettingsIcon from '@material-ui/icons/Settings';
import ListIcon from '@material-ui/icons/List';
import InfoIcon from '@material-ui/icons/Info';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { dashBoardActions, homePageActions } from '../_actions'
import { connect } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import Clock from 'react-live-clock';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    zIndex: 1,

    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    backgroundColor: '	#54AAB3'
  },
  navIconHide: {
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
    color: 'white'
  },
  toolbar: {
    [theme.breakpoints.down('sm')]: {
      minHeight: '64px',
    },
    [theme.breakpoints.up('md')]: {
      minHeight: 64,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('lg')]: {
      position: 'relative',
    },
  },
    content: {
      flexGrow: 1,
      backgroundColor: 'lightgrey',
      height: '100%',

      width: '100%'
    },
  selected: {
    backgroundColor: "#54AAB3"
  },
  search: {
    margin: 'auto',
    backgroundColor: 'silver',
    borderRadius: '5px',
    color: 'black',
  },
  br: {
    padding: '5px',
  },
  footer: {
    [theme.breakpoints.up('md')]: {
      width:'100%',
      position: 'absolute',
      left: 0,
      bottom: 0,
      height:'15vh'
    },
    [theme.breakpoints.down('sm')]: {
      width:'100%',
      left: 0,
      position: 'fixed',
      bottom: 0,
      height: '15vh',
      resize: 'vertical',
      overflow: 'auto',
    },
  },
  paper: {
    width: 100,
    minHeight: '90%',
    maxHeight: '90%',
    padding: '2px',
    color: 'black',
  },
  paper1: {
    width: '50px',
    minHeight: '90%',
    maxHeight: '90%',
    color: 'black',
    backgroundColor: 'red',
  },
  typo: {
    overflow: 'initial',
    color: 'white'
  },

  val: {
    fontSize: '12px',
  },
  valll: {
    fontSize: '10px',
  },
  val1: {
    fontSize: '10px',
  },
  keyy: {
    fontSize: '13px',
  },
});


class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false,
    start: true,
    messages:[],
    xbeeMessages: [],
    color: "",
    windSpeed: 0.0,
    windSpeedT: 0.0,
    buttonObject: {
      "id": "zone1",
      "location": "19.8,20.8 Chennai",
      "swversion": "1.1.20190411",
      "hwversion": "2.0",
      "trackerID": "",
    },
    current: 'Commissioning',
    keyy: 0,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  handleCloseDrawer = (e,currentPage) => {
    this.props.setCurrentPage(currentPage);
    this.setState({mobileOpen: false});
    this.setState({current: currentPage});
  }

  hostname = window.location.hostname +':1111';

  buttonObject = {
    "id": "zone1",
    "location": "19.8,20.8 Chennai",
    "rainfall": 110.0,
    "windspeed": 23.0,
    "rainfallT": 2.0,
    "windspeedT": 12.0,
    "swversion": "1.1.CT2",
    "hwversion": "1.0.0", 
  }

  componentDidMount(){
    setInterval(
    this.setState({currentTime: new Date().toLocaleTimeString()})
    ,1000);
  }


  componentWillReceiveProps = (nextProps) => {
    if((this.props.windSpeed  !== nextProps.windSpeed) || (this.props.windSpeedT  !== nextProps.windSpeedT) )
    {
        this.setState({windSpeed: nextProps.windSpeed, windSpeedT: nextProps.windSpeedT});
    }
}

  render() {
    const { classes, theme, children } = this.props;
    const drawer = (
      <div>
        <div className={classNames(classes.toolbar, "ftclogo")} />
        <Divider />
        <ListItem button key={this.state.keyy} onClick={(e) => this.handleCloseDrawer(e,"Dashboard")} style={{backgroundColor: this.props.currentPage === "Dashboard"? "#54AAB3": null}}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary={<Typography style={{color: this.props.currentPage === "Dashboard"? "white": "black"}}>Dashboard</Typography>}/>
        </ListItem>

        <ListItem button onClick={(e) => this.handleCloseDrawer(e,"Control")} style={{backgroundColor: this.props.currentPage === "Control"? "#54AAB3": null}}>
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText primary={<Typography style={{color: this.props.currentPage === "Control"? "white": "black"}}>Tracker Control</Typography>}/>
        </ListItem>

        <ListItem button onClick={(e) => this.handleCloseDrawer(e,"Commissioning")} style={{backgroundColor: this.props.currentPage === "Commissioning"? "#54AAB3": null}}>
          <ListItemIcon>
            <NetworkWifiIcon />
          </ListItemIcon>
          <ListItemText primary={<Typography style={{color: this.props.currentPage === "Commissioning"? "white": "black"}}>Commissioning</Typography>} />
        </ListItem>

        <ListItem button onClick={(e) => this.handleCloseDrawer(e,"Settings")} style={{backgroundColor: this.props.currentPage === "Settings"? "#54AAB3": null}}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary={<Typography style={{color: this.props.currentPage === "Settings"? "white": "black"}}>Settings</Typography>} />
        </ListItem>

        <ListItem button onClick={(e) => this.handleCloseDrawer(e,"Logs")} style={{backgroundColor: this.props.currentPage === "Logs"? "#54AAB3": null}}>
          <ListItemIcon>
            <ListIcon />
          </ListItemIcon>
          <ListItemText primary={<Typography style={{color: this.props.currentPage === "Logs"? "white": "black"}}>Logs</Typography>}/>
        </ListItem>

        <ListItem button onClick={(e) => this.handleCloseDrawer(e,"About")} style={{backgroundColor: this.props.currentPage === "About"? "#54AAB3": null}}>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary={<Typography style={{color: this.props.currentPage === "About"? "white": "black"}}>About</Typography>}/>
        </ListItem>

        <Divider />
      </div>
    );

    return (
      <div className={classes.root}>
        <ToastContainer />

        <AppBar className={classes.appBar} >
          <Toolbar style={{overflow:"auto"}} className={classes.tool}>
            <IconButton
              color="white"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap className={classes.typo}>
              Zone Controller Interface
            </Typography>
            
            <Hidden xsDown>
              <Grid container className={classes.root1} spacing={8}>
                <Grid item xs={12} className={classes.pad}>
                    <Grid container className={classes.demo} justify="flex-end" spacing={Number(8)}>
                      <Grid item >
                        <Paper className={classes.paper} >
                          <center><div className={classes.keyy}><b>ID</b></div> <div className={classes.val}>{this.props.commissioningData && this.props.commissioningData[0].controllerInfo.zoneID}</div></center>
                        </Paper>
                      </Grid>

                    
                      <Grid item >
                        {this.state.windSpeed > this.state.windSpeedT &&
                          <Paper className={classNames(classes.paper, "blink")} >
                          <center><div className={classes.keyy}>
                            <b>WindSpeed</b></div> <div className={classes.val}>{this.state.windSpeed } mph, putting all panels to stow</div></center>
                          </Paper>
                        }
                        {this.state.windSpeed  <= this.state.windSpeedT &&
                          <Paper className={classes.paper} >
                          <center><div className={classes.keyy}>
                            <b>WindSpeed</b></div> <div className={classes.val}>{this.state.windSpeed } mph</div></center>
                          </Paper>
                        }
                      </Grid>

                      {/*                     
                        <Grid key={0} item >
                          <Paper className={classes.paper} >
                            <center><div className={classes.keyy}><b>Timezone</b></div> <div className={classes.val}>{this.props.timezone}</div></center>
                          </Paper>
                        </Grid> 
                      */}

                      <Grid key={0} item >
                       <Paper className={classes.paper} >
                       {this.props.timeZoneSet === true &&
                         <center><div className={classes.keyy}><b>Time</b></div> <div className={classes.val}> <Clock format={'HH:mm:ss'} ticking={true} timezone={this.props.timezone.utc[0]} /> &nbsp; {this.props.timezone.abbr}</div></center>
                       }
                         </Paper>
                     </Grid>

                    </Grid>
                </Grid>
              </Grid>
            </Hidden>
          </Toolbar>
        </AppBar>
        
        <Hidden xlUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}

          >
            {drawer}
          </Drawer>
        </Hidden>



        <Hidden mdDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        
        <main className={classes.content}>
          <div className={classes.toolbar} />
            {children}
        </main>

      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const { windSpeed, windSpeedT, commissioningData, loaded } = state.dashBoard;
  const { currentPage } = state.homePage;
  const { timezone,timeZoneSet } = state.settings;
  return {
    windSpeed,
    windSpeedT,
    timezone,
    commissioningData,
    loaded,
    currentPage,
    timeZoneSet
  };
}

const mapDispatchToProps = (dispatch) => ({
  setTrackerColor: (trackerID, color) => {
      dispatch(dashBoardActions.setTrackerColor(trackerID, color)) 
  },
  setCurrentPage: (currentPage) => {
    dispatch(homePageActions.setCurrentPage(currentPage))
  }
})

export default  connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(ResponsiveDrawer));

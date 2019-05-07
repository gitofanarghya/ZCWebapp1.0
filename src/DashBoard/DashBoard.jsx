import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import classNames from 'classnames';
import DeviceList from './DeviceList';
import {TrackerDetails} from './TrackerDetails';
import { dashBoardActions } from '../_actions';
import { Loading } from '../_components';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

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
});

class DashBoard extends Component {

    state = {
        trackerID: "",
        deviceID: "AB000121",
        permitJoinClicked: false,
        trackerIDforColor: "",
        trackercolor: "",
        singlePixel: false,
        time: "",
    }

    permitJoin = () => {
        this.setState({
            permitJoinClicked: true
        })
    }

    componentDidMount() {
        this.props.getCommissioningData()
    }

    inter = {} 

    everyEight = (trackerID) => {
        var func = this;
        clearInterval(this.inter);
        this.inter = setInterval(() => {
            func.props.getCurrentTrackerInfo(trackerID);
        }, 8000)
    }

    getTrackerDetails = (trackerID) => {
        this.setState()
        this.props.getCurrentTrackerInfo(trackerID)
        const deviceID = this.props.commissioningData.find(e => e.trackerID === trackerID).deviceID
        this.setState({
            trackerID,
            deviceID
        })
        this.everyEight(trackerID);
    }

    handleApp = () => {
        this.setState({singlePixel: true});
    } 

    componentWillReceiveProps = (nextProps) => {
        if(this.props.trackerColor !== nextProps.trackerColor)
        {
            this.setState({trackerIDforColor: nextProps.trackerColor.trackerID});
            this.setState({trackercolor: nextProps.trackerColor.color});
        }
    }

    render(){
        const { classes, loaded, commissioningData, selectedTrackerDetails, loadedTrackerInfo, selectedTrackerID } = this.props;
         return (
            <div className={classes.root} >
                <Grid container  className={classNames("flex", classes.root1)} alignItems="stretch" direction="row" >
                    <Grid item xs={12} sm={6} className={classNames("flex", classes.detail)}>
                        { loaded ? <DeviceList time={this.state.time} permitJoin={this.permitJoin} permitJoinClicked={this.state.permitJoinClicked} selectedTrackerID={selectedTrackerID} devices={commissioningData} getTrackerDetails={this.getTrackerDetails}/> : <Loading /> }
                    </Grid>

                    <br /> 
                    
                    <Grid item xs={12} sm={6} className={classNames("flex", classes.tracker1)}>
                    {loadedTrackerInfo &&
                        <Paper className={classes.trackerDetails}>
                                
                                                                                 <Typography className={classes.heading} variant="headline" component="h3">
                                                                                 <p className={classes.para}>Tracker Details</p>
                                                                          </Typography>
                                                   <div className={classNames(classes.innerDiv,
                                                    selectedTrackerDetails.currentAngle > 58 ? 'angle60' :
                                                    selectedTrackerDetails.currentAngle > 56 ? 'angle58' :
                                                    selectedTrackerDetails.currentAngle > 54 ? 'angle56' :
                                                    selectedTrackerDetails.currentAngle > 52 ? 'angle54' :
                                                    selectedTrackerDetails.currentAngle > 50 ? 'angle52' :
                                                    selectedTrackerDetails.currentAngle > 48 ? 'angle50' :
                                                    selectedTrackerDetails.currentAngle > 46 ? 'angle48' :
                                                    selectedTrackerDetails.currentAngle > 44 ? 'angle46' :
                                                    selectedTrackerDetails.currentAngle > 42 ? 'angle44' :
                                                    selectedTrackerDetails.currentAngle > 40 ? 'angle42' :
                                                    selectedTrackerDetails.currentAngle > 38 ? 'angle40' :
                                                    selectedTrackerDetails.currentAngle > 36 ? 'angle38' :
                                                    selectedTrackerDetails.currentAngle > 34 ? 'angle36' :
                                                    selectedTrackerDetails.currentAngle > 32 ? 'angle34' :
                                                    selectedTrackerDetails.currentAngle > 30 ? 'angle32' :
                                                    selectedTrackerDetails.currentAngle > 28 ? 'angle30' :
                                                    selectedTrackerDetails.currentAngle > 26 ? 'angle28' :
                                                    selectedTrackerDetails.currentAngle > 24 ? 'angle26' :
                                                    selectedTrackerDetails.currentAngle > 22 ? 'angle24' :
                                                    selectedTrackerDetails.currentAngle > 20 ? 'angle22' :
                                                    selectedTrackerDetails.currentAngle > 18 ? 'angle20' :
                                                    selectedTrackerDetails.currentAngle > 16 ? 'angle18' :
                                                    selectedTrackerDetails.currentAngle > 14 ? 'angle16' :
                                                    selectedTrackerDetails.currentAngle > 12 ? 'angle14' :
                                                    selectedTrackerDetails.currentAngle > 10 ? 'angle12' :
                                                    selectedTrackerDetails.currentAngle > 8 ? 'angle10' :
                                                    selectedTrackerDetails.currentAngle > 6 ? 'angle8' :
                                                    selectedTrackerDetails.currentAngle > 4 ? 'angle6' :
                                                    selectedTrackerDetails.currentAngle > 2 ? 'angle4' :
                                                    selectedTrackerDetails.currentAngle > 0 ? 'angle2' :
                                                    selectedTrackerDetails.currentAngle > -2 ? 'angle0' :
                                                    selectedTrackerDetails.currentAngle > -4 ? 'angle_2' :
                                                    selectedTrackerDetails.currentAngle > -6 ? 'angle_4' :
                                                    selectedTrackerDetails.currentAngle > -8 ? 'angle_6' :
                                                    selectedTrackerDetails.currentAngle > -10 ? 'angle_8' :
                                                    selectedTrackerDetails.currentAngle > -12 ? 'angle_10' :
                                                    selectedTrackerDetails.currentAngle > -14 ? 'angle_12' :
                                                    selectedTrackerDetails.currentAngle > -16 ? 'angle_14' :
                                                    selectedTrackerDetails.currentAngle > -18 ? 'angle_16' :
                                                    selectedTrackerDetails.currentAngle > -20 ? 'angle_18' :
                                                    selectedTrackerDetails.currentAngle > -22 ? 'angle_20' :
                                                    selectedTrackerDetails.currentAngle > -24 ? 'angle_22' :
                                                    selectedTrackerDetails.currentAngle > -26 ? 'angle_24' :
                                                    selectedTrackerDetails.currentAngle > -28 ? 'angle_26' :
                                                    selectedTrackerDetails.currentAngle > -30 ? 'angle_28' :
                                                    selectedTrackerDetails.currentAngle > -32 ? 'angle_30' :
                                                    selectedTrackerDetails.currentAngle > -34 ? 'angle_32' :
                                                    selectedTrackerDetails.currentAngle > -36 ? 'angle_34' :
                                                    selectedTrackerDetails.currentAngle > -38 ? 'angle_36' :
                                                    selectedTrackerDetails.currentAngle > -40 ? 'angle_38' :
                                                    selectedTrackerDetails.currentAngle > -42 ? 'angle_40' :
                                                    selectedTrackerDetails.currentAngle > -44 ? 'angle_42' :
                                                    selectedTrackerDetails.currentAngle > -46 ? 'angle_44' :
                                                    selectedTrackerDetails.currentAngle > -48 ? 'angle_46' :
                                                    selectedTrackerDetails.currentAngle > -50 ? 'angle_48' :
                                                    selectedTrackerDetails.currentAngle > -52 ? 'angle_50' :
                                                    selectedTrackerDetails.currentAngle > -54 ? 'angle_52' :
                                                    selectedTrackerDetails.currentAngle > -56 ? 'angle_54' :
                                                    selectedTrackerDetails.currentAngle > -58 ? 'angle_56' :
                                                    selectedTrackerDetails.currentAngle > -60 ? 'angle_58' :
                                                    'angle_60')}>
                                                   </div>
                                                   <div className={classes.angleText}>
                                                     <p style={{margin: 0}}>
                                                         Angle = {selectedTrackerDetails.currentAngle}
                                                     </p>
                                                   </div>
 

                                        <TrackerDetails 
                                                                deviceID={this.state.deviceID}
                                                                trackerID={selectedTrackerID} 
                                                                trackerDetails={selectedTrackerDetails}/>
                                    

                        </Paper>
                                                   }
                    </Grid>
                </Grid>
                {this.state.singlePixel === true && <div className={classes.image}></div>}
            </div>
        );
    }
}

DashBoard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    const { loaded, commissioningData, selectedTrackerDetails, loadedTrackerInfo, selectedTrackerID, trackerColor  } = state.dashBoard
    return {
        commissioningData,
        loaded,
        loadedTrackerInfo,
        selectedTrackerDetails,
        selectedTrackerID,
        trackerColor,
    };
}

const mapDispatchToProps = (dispatch) => ({
    getCurrentTrackerInfo: (trackerID) => {
        dispatch(dashBoardActions.getCurrentTrackerInfo(trackerID)) 
    },
    getCommissioningData: () => {
        dispatch(dashBoardActions.getCommissioningData()) 
    }
})

const connectedDashBoard = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(DashBoard));
export { connectedDashBoard as DashBoard };

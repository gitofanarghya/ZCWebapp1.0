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
import TrackerAngle from './TrackerAngle';

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
    padBottom: {
        maxHeight:'45%',
    },
    details: {
        [theme.breakpoints.down('md')]: {
            height: '500px',
        },
    },
    image: {
        backgroundImage: 'url(/img/openApp.png)',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat'
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
                    
                    <Grid item xs={12} sm={6}  className={classNames("flex")}>
                        <Grid container  className="flex" direction="column">

                            <Grid item sm onClick={this.handleApp} className={classNames("flex","flex1", classes.padBottom, classes.details)}>
                            {loadedTrackerInfo &&
                                    <TrackerAngle angle={selectedTrackerDetails.currentAngle}/>
                            }
                            </Grid>

                            <Grid item sm className={classNames("flex", classes.padTop, classes.details)}>
                                {loadedTrackerInfo &&
                                    <TrackerDetails 
                                                            deviceID={this.state.deviceID}
                                                            trackerID={selectedTrackerID} 
                                                            trackerDetails={selectedTrackerDetails}/> 
                                }
                            </Grid>

                        </Grid>
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

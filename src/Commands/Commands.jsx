import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import SelectDeviceList from './SelectDeviceList';
import {commandsActions} from '../_actions';

const styles = theme => ({
  root: {
    maxWidth: '100%',
    display: 'flex',
    flexWrap: 'wrap',
  },  
});

class Commands extends Component {

    render(){
        const { classes, commissioningData, sendCommand, loaded } = this.props;
        
        return (
          <div className={classes.root} >
                  {loaded && <SelectDeviceList trackers={commissioningData} sendCommand={sendCommand}/>}
          </div>
        );
    }
}

Commands.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const { loaded, commissioningData } = state.commissioning;
  return {
      commissioningData,
      loaded
  };
}

const mapDispatchToProps = (dispatch) => ({
  sendCommand: (deviceID, command, macID) => {
      dispatch(commandsActions.sendCommand(deviceID, command, macID)) 
  }
})

const connectedCommands = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Commands));
export { connectedCommands as Commands };
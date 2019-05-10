import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {connect} from 'react-redux';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import { callbackify } from 'util';

const styles = theme => ({
  root: {
    overflowX: 'auto',
  },
  heading: {
    marginTop: '10px',
    paddingLeft: '24px',
    display: 'flex',
    padding: 'inherit',
    marginBottom: '10px'
  },
  outerRow: {
    borderRight: '1px solid #e0e0e0',
  },
/*   table: {
    width: '80%',
    margin: 'auto',
    textAlign: 'left',
    borderRadius: '2%',
    maxHeight: 'calc(100% - 37px)',
    overflow: 'auto'
  }, */
  cell: {
    textAlign: 'left',
    [theme.breakpoints.down('md')]: {
      fontSize: '20px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '15px',
    },
    [theme.breakpoints.down('750')]: {
      fontSize: '10px',
    },
    fontSize: '1vw',
    padding: '5px !important',
    margin: '0 !important'

  },
  angleText: {
    width: '100%',
    textAlign: 'center'
  },
/*   tableRow: {
    [theme.breakpoints.up('600')]: {
      height: '5vh',
    },
    [theme.breakpoints.down('600')]: {
      height: 3,
    },
  }, */
  table: {
    overflow: 'auto',
    //height: '80%',
    //marginTop: 'auto',
  },
  tableRow: {
    [theme.breakpoints.down('600')]: {
      height: '20px'
    },
    height: '10px'
  },
});

class TrackerDetails extends React.Component {

  state = {
    timezone: 'Asia/Kolkata'
  }

  componentWillReceiveProps(nextProps){
    this.setState({timezone: nextProps.timezone.utc[0]});
  }


  render(){
  const { classes, trackerDetails } = this.props;
  const data = trackerDetails;
  
  return (
    <div className={classes.root}>
{/*         <Table className={classes.table}>
            <TableBody>
                      <TableRow className={classes.tableRow}>
                      <TableCell className={classes.cell} padding="dense" style={{ height: 'auto !important' }}><b>
                      Tracker ID </b></TableCell><TableCell className={classes.cell} style={{ height: 'auto !important' }}>{data.trackerID?data.trackerID: '--'} 
                      </TableCell>
                      </TableRow>

                      <TableRow className={classes.tableRow}>
                      <TableCell className={classes.cell} padding="dense" style={{ height: 'auto !important' }}><b>
                      Device ID </b></TableCell><TableCell className={classes.cell} style={{ height: 'auto !important' }}>{data.deviceID?data.trackerID: '--'} 
                      </TableCell>
                      </TableRow>

                      <TableRow className={classes.tableRow}>
                      <TableCell className={classes.cell} padding="dense" style={{ height: 'auto !important' }}><b>
                      Mac ID </b></TableCell><TableCell className={classes.cell} style={{ height: 'auto !important' }}>{data.macID?data.trackerID: '--'} 
                      </TableCell>
                      </TableRow>

                      <TableRow className={classes.tableRow}>
                      <TableCell className={classes.cell} padding="dense" style={{ height: 'auto !important' }}><b>
                      Current Mode </b></TableCell><TableCell className={classes.cell} style={{ height: 'auto !important' }}>{data.currentMode?data.trackerID: '--'}
                      </TableCell>
                      </TableRow>

                      <TableRow className={classes.tableRow}>
                      <TableCell className={classes.cell} padding="dense" style={{ height: 'auto !important' }}><b>
                      Current Angle </b></TableCell><TableCell className={classes.cell} style={{ height: 'auto !important' }}>{data.currentAngle? parseFloat(data.currentAngle).toFixed(2): '--'}  deg
                      </TableCell>
                      </TableRow>

                      <TableRow className={classes.tableRow}>
                      <TableCell className={classes.cell} padding="dense" style={{ height: 'auto !important' }}><b>
                      Date and Time </b></TableCell><TableCell className={classes.cell} style={{ height: 'auto !important' }}>{new Date(Number(data.timeStamp) * 1000).toLocaleDateString('en-US', {timeZone: this.state.timezone})} -- {new Date(Number(data.timeStamp) * 1000).toLocaleTimeString('en-US', {timeZone:  this.state.timezone, hour12: false})}
                      </TableCell>
                      </TableRow>
            </TableBody>
        </Table>   */}

            <Table className={classes.table}>
                <TableBody>
                      <TableRow
                        className={classNames(classes.row, classes.tableRow)}
                        style={{cursor: 'pointer', padding: '5px'}}
                      >
                          <TableCell component="th" scope="row" padding="none" style={{ padding: '5px', height: 'auto !important'}}>
                              <Typography variant="body1">
                              Tracker ID
                              </Typography>
                          </TableCell>
                          <TableCell style={{ padding: '5px', height: 'auto !important', fontSize: '14px'}}>{data.trackerID?data.trackerID: '--'}</TableCell>
                      </TableRow>

                      <TableRow
                        className={classNames(classes.row, classes.tableRow)}
                        style={{cursor: 'pointer', padding: '5px'}}
                      >
                          <TableCell component="th" scope="row" padding="none" style={{ padding: '5px', height: 'auto !important'}}>
                              <Typography variant="body1">
                              Device ID
                              </Typography>
                          </TableCell>
                          <TableCell style={{ padding: '5px', height: 'auto !important', fontSize: '14px'}}>{this.props.deviceID?this.props.deviceID: '--'} </TableCell>
                      </TableRow>

                      <TableRow
                        className={classNames(classes.row, classes.tableRow)}
                        style={{cursor: 'pointer', padding: '5px'}}
                      >
                          <TableCell component="th" scope="row" padding="none" style={{ padding: '5px', height: 'auto !important'}}>
                              <Typography variant="body1">
                              Mac ID 
                              </Typography>
                          </TableCell>
                          <TableCell style={{ padding: '5px', height: 'auto !important', fontSize: '14px'}}>{data.macID?data.macID: '--'} </TableCell>
                      </TableRow>

                      <TableRow
                        className={classNames(classes.row, classes.tableRow)}
                        style={{cursor: 'pointer', padding: '5px'}}
                      >
                          <TableCell component="th" scope="row" padding="none" style={{ padding: '5px', height: 'auto !important'}}>
                              <Typography variant="body1">
                              Current Mode
                              </Typography>
                          </TableCell>
                          <TableCell style={{ padding: '5px', height: 'auto !important', fontSize: '14px'}}>{data.currentMode?data.currentMode: '--'}</TableCell>
                      </TableRow>

                      <TableRow
                        className={classNames(classes.row, classes.tableRow)}
                        style={{cursor: 'pointer', padding: '5px'}}
                      >
                          <TableCell component="th" scope="row" padding="none" style={{ padding: '5px', height: 'auto !important'}}>
                              <Typography variant="body1">
                                  Current Angle
                              </Typography>
                          </TableCell>
                          <TableCell style={{ padding: '5px', height: 'auto !important', fontSize: '14px'}}>{data.currentAngle? parseFloat(data.currentAngle).toFixed(2): '--'}  deg</TableCell>
                      </TableRow>

                      <TableRow
                        className={classNames(classes.row, classes.tableRow)}
                        style={{cursor: 'pointer', padding: '5px'}}
                      >
                          <TableCell component="th" scope="row" padding="none" style={{ padding: '5px', height: 'auto !important'}}>
                              <Typography variant="body1">
                                  Date and Time
                              </Typography>
                          </TableCell>
                          <TableCell style={{ padding: '5px', height: 'auto !important', fontSize: '14px'}}>{new Date(Number(data.timeStamp) * 1000).toLocaleDateString('en-US', {timeZone: this.state.timezone})} -- {new Date(Number(data.timeStamp) * 1000).toLocaleTimeString('en-US', {timeZone:  this.state.timezone, hour12: false})}</TableCell>
                      </TableRow>
                </TableBody>
            </Table>
    </div>
  );
}
}

TrackerDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const { timezone } = state.settings;
  return {
    timezone
  };
}

const connectedTrackerDetails = connect(mapStateToProps)(withStyles(styles, { withTheme: true })(TrackerDetails))
export { connectedTrackerDetails as TrackerDetails};

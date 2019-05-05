import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux';

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
    ...theme.mixins.gutters(),
  },
  heading: {
    marginTop: '5px',
    paddingLeft: '24px',
    display: 'flex',
    padding: 'inherit',
  },
  outerRow: {
    borderRight: '1px solid #e0e0e0',
  },
  para: {
    marginTop: '0px',
    marginBottom: '0px',
  },
  table: {
    width: '80%',
    margin: 'auto',
    textAlign: 'left',
    borderRadius: '2%',
    maxHeight: 'calc(100% - 37px)',
    overflow: 'auto'
  },
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
  tableRow: {
    [theme.breakpoints.up('600')]: {
      height: '5vh',
    },
    [theme.breakpoints.down('600')]: {
      height: 3,
    },
  }
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
        <Typography className={classes.heading} variant="headline" component="h3">
          <p className={classes.para}>Tracker Details</p>
        </Typography>
        <Table className={classes.table}>
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

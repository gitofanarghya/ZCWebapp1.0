import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux';

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
    ...theme.mixins.gutters(),
    marginRight: '10px',
    marginBottom: '10px',
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
  },
  innerRow: {
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
    <Paper className={classes.root}>
        <Typography className={classes.heading} variant="headline" component="h3">
          <p className={classes.para}>Tracker Details</p>
        </Typography>
        <Table className={classes.table}>
            <TableBody>
                      <TableRow>
                      <TableCell className={classes.innerRow} padding="dense"><b>
                      Tracker ID </b></TableCell><TableCell className={classes.cell}>{data.trackerID} 
                      </TableCell>
                      </TableRow>

                      <TableRow>
                      <TableCell className={classes.innerRow} padding="dense"><b>
                      Device ID </b></TableCell><TableCell className={classes.cell}>{data.deviceID} 
                      </TableCell>
                      </TableRow>

                      <TableRow>
                      <TableCell className={classes.innerRow} padding="dense"><b>
                      Mac ID </b></TableCell><TableCell className={classes.cell}>{data.macID} 
                      </TableCell>
                      </TableRow>

                      <TableRow>
                      <TableCell className={classes.innerRow} padding="dense"><b>
                      Current Mode </b></TableCell><TableCell className={classes.cell}>{data.currentMode}
                      </TableCell>
                      </TableRow>

                      <TableRow>
                      <TableCell className={classes.innerRow} padding="dense"><b>
                      Current Angle </b></TableCell><TableCell className={classes.cell}>{parseFloat(data.currentAngle).toFixed(2)}  deg
                      </TableCell>
                      </TableRow>

                      <TableRow>
                      <TableCell className={classes.innerRow} padding="dense"><b>
                      Date </b></TableCell><TableCell className={classes.cell}>{new Date(Number(data.timeStamp) * 1000).toLocaleDateString('en-US', {timeZone: this.state.timezone})}
                      </TableCell>
                      </TableRow>

                      <TableRow>
                      <TableCell className={classes.innerRow} padding="dense"><b>
                      Time </b></TableCell><TableCell className={classes.cell}>{new Date(Number(data.timeStamp) * 1000).toLocaleTimeString('en-US', {timeZone:  this.state.timezone, hour12: false})}
                      </TableCell>
                      </TableRow>
            </TableBody>
        </Table>  
    </Paper>
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
